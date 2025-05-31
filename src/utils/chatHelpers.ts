
import { Message } from '@/types/chat';

export const getContextualGreeting = (context: string): string => {
  switch (context) {
    case 'mvp-planning':
      return "Hi! I'm your MVP Planning Assistant. I can help you define core features, validate your MVP concept, and create a roadmap for your minimum viable product. I remember our previous conversations, so feel free to continue where we left off. What would you like to work on?";
    case 'tech-stack':
      return "Hello! I'm your Tech Stack Advisor. I can help you choose the right technologies for your project, compare frameworks, and make informed technical decisions. I have memory of our past discussions to provide better continuity. What's your project about?";
    case 'focus-journal':
      return "Hey there! I'm your Productivity Coach. I can help you set goals, track progress, overcome blockers, and stay motivated on your startup journey. I remember our previous sessions to provide personalized advice. How can I support you today?";
    default:
      return "Hi! I'm your AI assistant with memory of our conversations. How can I help you with your startup today?";
  }
};

export const buildConversationContext = (messages: Message[], newMessage: string, context: string): string => {
  // Get last 5 messages for context (to avoid token limits)
  const recentMessages = messages.slice(-5);
  const conversationHistory = recentMessages.map(msg => 
    `${msg.isBot ? 'Assistant' : 'User'}: ${msg.content}`
  ).join('\n');

  return `Context: You are helping with ${context}. 

Previous conversation history:
${conversationHistory}

Current user question: ${newMessage}

Please respond based on the conversation history and provide helpful, contextual advice. Reference previous discussions when relevant.`;
};

export const createMessage = (content: string, isBot: boolean, context: string): Message => {
  return {
    id: Date.now().toString() + (isBot ? '_bot' : '_user'),
    content,
    isBot,
    timestamp: new Date(),
    context
  };
};
