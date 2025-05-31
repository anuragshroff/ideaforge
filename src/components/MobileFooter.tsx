
import { Lightbulb, Rocket, Settings, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileFooterProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const MobileFooter = ({ activeView, onViewChange }: MobileFooterProps) => {
  const footerItems = [
    { id: 'vault', label: 'Ideas', icon: Lightbulb },
    { id: 'mvp', label: 'MVP', icon: Rocket },
    { id: 'tech', label: 'Tech', icon: Settings },
    { id: 'journal', label: 'Journal', icon: BookOpen },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around items-center">
        {footerItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            onClick={() => onViewChange(item.id)}
            className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
              activeView === item.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </footer>
  );
};

export default MobileFooter;
