
import { X, Lightbulb, Rocket, Settings, Shield, Download, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Navigation = ({ isOpen, onClose, activeView, onViewChange }) => {
  const menuItems = [
    { id: 'vault', label: 'Idea Vault', icon: Lightbulb, description: 'Store and organize ideas' },
    { id: 'mvp', label: 'MVP Planner', icon: Rocket, description: 'Plan your minimum viable product' },
    { id: 'tech', label: 'Tech Stack', icon: Settings, description: 'Track technology choices' },
    { id: 'journal', label: 'Focus Journal', icon: BookOpen, description: 'Daily execution tracking' },
  ];

  const handleItemClick = (viewId) => {
    onViewChange(viewId);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('forge_authenticated');
    window.location.reload();
  };

  const handleExport = () => {
    const ideas = localStorage.getItem('forge_ideas');
    if (ideas) {
      const dataStr = JSON.stringify(JSON.parse(ideas), null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `forge-ideas-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Drawer */}
      <div className="absolute top-0 left-0 h-full w-80 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold">Forge Mobile</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Card 
              key={item.id}
              className={`cursor-pointer transition-colors ${
                activeView === item.id 
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleItemClick(item.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <item.icon className={`h-5 w-5 ${
                    activeView === item.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                  <div>
                    <h3 className={`font-medium ${
                      activeView === item.id ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {item.label}
                    </h3>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Ideas
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <Shield className="h-4 w-4 mr-2" />
              Lock App
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
