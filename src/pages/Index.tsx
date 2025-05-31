import { useState, useEffect } from 'react';
import { Plus, Shield, Lightbulb, Rocket, Settings, Menu, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AuthScreen from '@/components/AuthScreen';
import IdeaCard from '@/components/IdeaCard';
import CreateIdeaForm from '@/components/CreateIdeaForm';
import Navigation from '@/components/Navigation';
import MVPPlanner from '@/components/MVPPlanner';
import TechStack from '@/components/TechStack';
import FocusJournal from '@/components/FocusJournal';
import MobileFooter from '@/components/MobileFooter';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [activeView, setActiveView] = useState('vault');

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('forge_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadIdeas();
    }
  }, []);

  const loadIdeas = () => {
    const savedIdeas = localStorage.getItem('forge_ideas');
    if (savedIdeas) {
      setIdeas(JSON.parse(savedIdeas));
    }
  };

  const saveIdeas = (updatedIdeas) => {
    setIdeas(updatedIdeas);
    localStorage.setItem('forge_ideas', JSON.stringify(updatedIdeas));
  };

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    localStorage.setItem('forge_authenticated', 'true');
    loadIdeas();
  };

  const handleCreateIdea = (newIdea) => {
    const ideaWithId = {
      ...newIdea,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedIdeas = [...ideas, ideaWithId];
    saveIdeas(updatedIdeas);
    setShowCreateForm(false);
  };

  const handleUpdateIdea = (updatedIdea) => {
    const updatedIdeas = ideas.map(idea => 
      idea.id === updatedIdea.id 
        ? { ...updatedIdea, updatedAt: new Date().toISOString() }
        : idea
    );
    saveIdeas(updatedIdeas);
  };

  const handleDeleteIdea = (ideaId) => {
    const updatedIdeas = ideas.filter(idea => idea.id !== ideaId);
    saveIdeas(updatedIdeas);
  };

  if (!isAuthenticated) {
    return <AuthScreen onAuthenticate={handleAuthentication} />;
  }

  const getStatusCount = (status) => {
    return ideas.filter(idea => idea.status === status).length;
  };

  const renderVaultView = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Ideas</p>
                <p className="text-2xl font-bold text-blue-800">{ideas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Rocket className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-green-600 font-medium">Building</p>
                <p className="text-2xl font-bold text-green-800">{getStatusCount('building')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Filter Badges */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['brainstorming', 'validating', 'building', 'shipped'].map(status => (
          <Badge 
            key={status} 
            variant="secondary" 
            className="whitespace-nowrap capitalize"
          >
            {status} ({getStatusCount(status)})
          </Badge>
        ))}
      </div>

      {/* Ideas List */}
      <div className="space-y-4">
        {ideas.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-8 text-center">
              <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No ideas yet</h3>
              <p className="text-gray-500 mb-4">Start building your startup idea vault</p>
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Idea
              </Button>
            </CardContent>
          </Card>
        ) : (
          ideas.map(idea => (
            <IdeaCard 
              key={idea.id} 
              idea={idea} 
              onUpdate={handleUpdateIdea}
              onDelete={handleDeleteIdea}
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNavigation(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Forge Mobile
              </h1>
            </div>
          </div>
          
          {activeView === 'vault' && (
            <Button 
              onClick={() => setShowCreateForm(true)}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </header>

      {/* Navigation Drawer */}
      <Navigation 
        isOpen={showNavigation}
        onClose={() => setShowNavigation(false)}
        activeView={activeView}
        onViewChange={setActiveView}
      />

      {/* Main Content */}
      <main className="p-4 pb-24">
        {activeView === 'vault' && renderVaultView()}
        {activeView === 'mvp' && <MVPPlanner />}
        {activeView === 'tech' && <TechStack />}
        {activeView === 'journal' && <FocusJournal />}
      </main>

      {/* Mobile Footer Navigation */}
      <MobileFooter 
        activeView={activeView}
        onViewChange={setActiveView}
      />

      {/* Create Idea Modal */}
      {showCreateForm && (
        <CreateIdeaForm 
          onSubmit={handleCreateIdea}
          onClose={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
};

export default Index;
