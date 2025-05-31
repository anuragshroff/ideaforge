import { Message } from '@/types/chat';

export const loadChatHistory = (context: string): Message[] => {
  const savedHistory = localStorage.getItem('forge_chat_history');
  if (savedHistory) {
    const history = JSON.parse(savedHistory);
    const contextMessages = history.filter((msg: Message) => 
      msg.context === context || !msg.context
    );
    return contextMessages;
  }
  return [];
};

export const saveChatHistory = (messages: Message[], context: string) => {
  const savedHistory = localStorage.getItem('forge_chat_history');
  let allHistory = savedHistory ? JSON.parse(savedHistory) : [];
  
  // Remove old messages for this context
  allHistory = allHistory.filter((msg: Message) => msg.context !== context);
  
  // Add new messages for this context
  const newHistory = [...allHistory, ...messages];
  
  // Keep only last 100 messages to prevent localStorage from getting too large
  if (newHistory.length > 100) {
    newHistory.splice(0, newHistory.length - 100);
  }
  
  localStorage.setItem('forge_chat_history', JSON.stringify(newHistory));
};

export const clearChatHistory = (context: string) => {
  const savedHistory = localStorage.getItem('forge_chat_history');
  if (savedHistory) {
    let allHistory = JSON.parse(savedHistory);
    allHistory = allHistory.filter((msg: Message) => msg.context !== context);
    localStorage.setItem('forge_chat_history', JSON.stringify(allHistory));
  }
};
