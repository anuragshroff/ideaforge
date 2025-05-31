
import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';
import { loadChatHistory, saveChatHistory, clearChatHistory } from '@/utils/chatHistory';
import { getContextualGreeting, createMessage } from '@/utils/chatHelpers';

export const useChatMessages = (context: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const history = loadChatHistory(context);
    if (history.length > 0) {
      setMessages(history);
    } else {
      const initialMessage = createMessage(getContextualGreeting(context), true, context);
      setMessages([initialMessage]);
    }
  }, [context]);

  const addMessage = (content: string, isBot: boolean) => {
    const newMessage = createMessage(content, isBot, context);
    setMessages(prev => {
      const updated = [...prev, newMessage];
      if (isBot) {
        saveChatHistory(updated, context);
      }
      return updated;
    });
    return newMessage;
  };

  const updateMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
    saveChatHistory(newMessages, context);
  };

  const clearHistory = () => {
    const initialMessage = createMessage(getContextualGreeting(context), true, context);
    setMessages([initialMessage]);
    clearChatHistory(context);
  };

  return {
    messages,
    addMessage,
    updateMessages,
    clearHistory
  };
};
