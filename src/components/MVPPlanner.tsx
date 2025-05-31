
import { useState } from 'react';
import { Plus, Rocket, MessageCircle, Send, Bot, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ChatBot from './ChatBot';
import CreateMVPForm from './CreateMVPForm';

const MVPPlanner = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [mvpPlans, setMvpPlans] = useState([]);

  const handleCreateMVP = (newMVP) => {
    const mvpWithId = {
      ...newMVP,
      id: Date.now().toString()
    };
    setMvpPlans(prev => [...prev, mvpWithId]);
    setShowCreateForm(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'building': return 'bg-blue-100 text-blue-800';
      case 'testing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">MVP Planner</h2>
          <p className="text-gray-600">Plan your minimum viable product</p>
        </div>
        <Button
          onClick={() => setShowChatBot(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Bot className="h-4 w-4 mr-2" />
          AI Assistant
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Rocket className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-purple-600 font-medium">Total MVPs</p>
                <p className="text-2xl font-bold text-purple-800">{mvpPlans.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-green-600 font-medium">In Progress</p>
                <p className="text-2xl font-bold text-green-800">
                  {mvpPlans.filter(mvp => mvp.status === 'building' || mvp.status === 'testing').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MVP Plans List */}
      <div className="space-y-4">
        {mvpPlans.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-8 text-center">
              <Rocket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No MVP plans yet</h3>
              <p className="text-gray-500 mb-4">Start planning your minimum viable product</p>
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create MVP Plan
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Your MVP Plans</h3>
              <Button 
                onClick={() => setShowCreateForm(true)}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Plan
              </Button>
            </div>
            
            {mvpPlans.map(mvp => (
              <Card key={mvp.id} className="border border-gray-200 hover:border-purple-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{mvp.name}</h4>
                      <p className="text-gray-600 text-sm">{mvp.description}</p>
                    </div>
                    <Badge className={getStatusColor(mvp.status)}>
                      {mvp.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Target:</span>
                      <p className="text-gray-600">{mvp.targetAudience}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Timeline:</span>
                      <p className="text-gray-600">{mvp.timeline}</p>
                    </div>
                  </div>
                  
                  {mvp.coreFeatures?.length > 0 && (
                    <div className="mt-3">
                      <span className="font-medium text-gray-700 text-sm">Core Features:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {mvp.coreFeatures.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {mvp.coreFeatures.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{mvp.coreFeatures.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
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
          context="mvp-planning"
        />
      )}

      {/* Create MVP Form */}
      {showCreateForm && (
        <CreateMVPForm
          onSubmit={handleCreateMVP}
          onClose={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
};

export default MVPPlanner;
