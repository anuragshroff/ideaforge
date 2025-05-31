
import { useState } from 'react';
import { X, Save, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ChatBot from './ChatBot';

interface CreateTechStackFormProps {
  onSubmit: (techStack: any) => void;
  onClose: () => void;
}

const CreateTechStackForm = ({ onSubmit, onClose }: CreateTechStackFormProps) => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    frontend: [] as string[],
    backend: [] as string[],
    database: [] as string[],
    cloud: [] as string[],
    tools: [] as string[]
  });
  const [currentInputs, setCurrentInputs] = useState({
    frontend: '',
    backend: '',
    database: '',
    cloud: '',
    tools: ''
  });

  const handleAddTech = (category: string) => {
    const value = currentInputs[category as keyof typeof currentInputs];
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [category]: [...prev[category as keyof typeof formData] as string[], value.trim()]
      }));
      setCurrentInputs(prev => ({ ...prev, [category]: '' }));
    }
  };

  const handleRemoveTech = (category: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [category]: (prev[category as keyof typeof formData] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (formData.projectName && formData.description) {
      onSubmit({
        ...formData,
        createdAt: new Date().toISOString()
      });
    }
  };

  const categories = [
    { key: 'frontend', label: 'Frontend', placeholder: 'e.g., React, Vue, Angular' },
    { key: 'backend', label: 'Backend', placeholder: 'e.g., Node.js, Python, Java' },
    { key: 'database', label: 'Database', placeholder: 'e.g., PostgreSQL, MongoDB' },
    { key: 'cloud', label: 'Cloud & Hosting', placeholder: 'e.g., AWS, Vercel, Netlify' },
    { key: 'tools', label: 'Development Tools', placeholder: 'e.g., Git, Docker, VS Code' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Create Tech Stack</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChatBot(true)}
              >
                <Bot className="h-4 w-4 mr-1" />
                AI Help
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Project Name</label>
            <Input
              value={formData.projectName}
              onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
              placeholder="Enter your project name"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of your project"
            />
          </div>

          {categories.map((category) => (
            <div key={category.key}>
              <label className="text-sm font-medium mb-2 block">{category.label}</label>
              <div className="flex space-x-2 mb-2">
                <Input
                  value={currentInputs[category.key as keyof typeof currentInputs]}
                  onChange={(e) => setCurrentInputs(prev => ({ ...prev, [category.key]: e.target.value }))}
                  placeholder={category.placeholder}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTech(category.key)}
                />
                <Button onClick={() => handleAddTech(category.key)} size="sm">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(formData[category.key as keyof typeof formData] as string[]).map((tech, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTech(category.key, index)}>
                    {tech} ×
                  </Badge>
                ))}
              </div>
            </div>
          ))}

          <Button 
            onClick={handleSubmit}
            disabled={!formData.projectName || !formData.description}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Tech Stack
          </Button>
        </CardContent>
      </Card>

      {showChatBot && (
        <ChatBot 
          onClose={() => setShowChatBot(false)}
          context="tech-stack"
        />
      )}
    </div>
  );
};

export default CreateTechStackForm;
