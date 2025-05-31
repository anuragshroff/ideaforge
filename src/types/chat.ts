
export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  context?: string;
}

export interface ChatBotProps {
  onClose: () => void;
  context: string;
}
