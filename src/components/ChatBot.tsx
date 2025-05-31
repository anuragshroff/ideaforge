
import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatBotProps } from '@/types/chat';
import { useApiKey } from '@/hooks/useApiKey';
import { useChatMessages } from '@/hooks/useChatMessages';
import { buildConversationContext, createMessage } from '@/utils/chatHelpers';
import { callGeminiApi } from '@/services/geminiApi';

const ChatBot = ({ onClose, context }: ChatBotProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { apiKey, setApiKey, showApiKeyInput, saveApiKey } = useApiKey();
  const { messages, addMessage, updateMessages, clearHistory } = useChatMessages(context);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    if (!apiKey.trim()) {
      alert('Please enter your Google Gemini API key first.');
      return;
    }

    const userMessage = addMessage(inputMessage, false);
    const updatedMessages = [...messages, userMessage];
    setInputMessage('');
    setIsLoading(true);

    try {
      const conversationContext = buildConversationContext(messages, inputMessage, context);
      const botResponse = await callGeminiApi(conversationContext, apiKey);
      
      const botMessage = createMessage(botResponse, true, context);
      const finalMessages = [...updatedMessages, botMessage];
      updateMessages(finalMessages);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage = createMessage(
        'Sorry, I encountered an error. Please check your API key and try again.',
        true,
        context
      );
      const finalMessages = [...updatedMessages, errorMessage];
      updateMessages(finalMessages);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleApiKeySubmit = () => {
    saveApiKey(apiKey);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg h-[600px] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              {!showApiKeyInput && (
                <Button variant="ghost" size="sm" onClick={clearHistory} title="Clear chat history">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {showApiKeyInput ? (
          <CardContent className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Enter Google Gemini API Key</h3>
              <p className="text-sm text-gray-600 mb-4">
                You need a Google Gemini API key to use the AI assistant.
              </p>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Get your API key here
              </a>
            </div>
            <div className="w-full space-y-2">
              <Input
                type="password"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
              />
              <Button onClick={handleApiKeySubmit} className="w-full">
                Save API Key
              </Button>
            </div>
          </CardContent>
        ) : (
          <>
            <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.isBot && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      {!message.isBot && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            <div className="flex-shrink-0 p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default ChatBot;
