
import { useState } from 'react';
import { Plus, Settings, MessageCircle, Code, Database, Cloud, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ChatBot from './ChatBot';
import CreateTechStackForm from './CreateTechStackForm';

const TechStack = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [techStacks, setTechStacks] = useState([]);

  const handleCreateTechStack = (newTechStack) => {
    const techStackWithId = {
      ...newTechStack,
      id: Date.now().toString()
    };
    setTechStacks(prev => [...prev, techStackWithId]);
    setShowCreateForm(false);
  };

  const getTotalCount = (category) => {
    return techStacks.reduce((total, stack) => {
      return total + (stack[category]?.length || 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tech Stack Tracker</h2>
          <p className="text-gray-600">Track your technology choices</p>
        </div>
        <Button
          onClick={() => setShowChatBot(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
        >
          <Bot className="h-4 w-4 mr-2" />
          Tech Advisor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Frontend</p>
                <p className="text-2xl font-bold text-blue-800">{getTotalCount('frontend')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-green-600 font-medium">Backend</p>
                <p className="text-2xl font-bold text-green-800">{getTotalCount('backend')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Cloud className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-purple-600 font-medium">Cloud</p>
                <p className="text-2xl font-bold text-purple-800">{getTotalCount('cloud')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tech Stacks List */}
      <div className="space-y-4">
        {techStacks.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-8 text-center">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No tech stacks yet</h3>
              <p className="text-gray-500 mb-4">Start tracking your technology choices</p>
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Tech Stack
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Your Tech Stacks</h3>
              <Button 
                onClick={() => setShowCreateForm(true)}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Stack
              </Button>
            </div>
            
            {techStacks.map(stack => (
              <Card key={stack.id} className="border border-gray-200 hover:border-blue-300 transition-colors">
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h4 className="font-semibold text-lg">{stack.projectName}</h4>
                    <p className="text-gray-600 text-sm">{stack.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {['frontend', 'backend', 'database', 'cloud', 'tools'].map(category => (
                      stack[category]?.length > 0 && (
                        <div key={category}>
                          <span className="font-medium text-gray-700 text-sm capitalize">{category}:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {stack[category].map((tech, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>

      {/* ChatBot Modal */}
      {showChatBot && (
        <ChatBot 
          onClose={() => setShowChatBot(false)}
          context="tech-stack"
        />
      )}

      {/* Create Tech Stack Form */}
      {showCreateForm && (
        <CreateTechStackForm
          onSubmit={handleCreateTechStack}
          onClose={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
};

export default TechStack;
