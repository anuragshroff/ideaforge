
import { useState } from 'react';
import { X, Save, Bot, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ChatBot from './ChatBot';

interface CreateJournalEntryFormProps {
  onSubmit: (entry: any) => void;
  onClose: () => void;
}

const CreateJournalEntryForm = ({ onSubmit, onClose }: CreateJournalEntryFormProps) => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    goals: [] as string[],
    accomplishments: [] as string[],
    blockers: [] as string[],
    reflections: '',
    energyLevel: 5,
    mood: 'neutral'
  });
  const [currentInputs, setCurrentInputs] = useState({
    goal: '',
    accomplishment: '',
    blocker: ''
  });

  const handleAddItem = (category: string) => {
    const value = currentInputs[category as keyof typeof currentInputs];
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [category === 'goal' ? 'goals' : category === 'accomplishment' ? 'accomplishments' : 'blockers']: 
          [...prev[category === 'goal' ? 'goals' : category === 'accomplishment' ? 'accomplishments' : 'blockers'], value.trim()]
      }));
      setCurrentInputs(prev => ({ ...prev, [category]: '' }));
    }
  };

  const handleRemoveItem = (category: 'goals' | 'accomplishments' | 'blockers', index: number) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i: number) => i !== index)
    }));
  };

  const generateAISuggestions = async () => {
    // Mock AI suggestions based on current entry
    const suggestions = [
      "Consider breaking down large tasks into smaller actionable steps",
      "Schedule focused work blocks for deep work sessions",
      "Review and prioritize your goals based on impact and urgency",
      "Take breaks to maintain high energy levels throughout the day"
    ];
    setAiSuggestions(suggestions);
  };

  const handleSubmit = () => {
    if (formData.title) {
      onSubmit({
        ...formData,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        aiSuggestions
      });
    }
  };

  const moods = ['excited', 'happy', 'neutral', 'frustrated', 'tired'];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daily Focus Entry</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={generateAISuggestions}
              >
                <Zap className="h-4 w-4 mr-1" />
                AI Scan
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChatBot(true)}
              >
                <Bot className="h-4 w-4 mr-1" />
                Coach
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Entry Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Monday Sprint Planning"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Today's Goals</label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={currentInputs.goal}
                onChange={(e) => setCurrentInputs(prev => ({ ...prev, goal: e.target.value }))}
                placeholder="Add a goal for today"
                onKeyPress={(e) => e.key === 'Enter' && handleAddItem('goal')}
              />
              <Button onClick={() => handleAddItem('goal')} size="sm">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.goals.map((goal, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveItem('goals', index)}>
                  {goal} ×
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Accomplishments</label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={currentInputs.accomplishment}
                onChange={(e) => setCurrentInputs(prev => ({ ...prev, accomplishment: e.target.value }))}
                placeholder="What did you accomplish?"
                onKeyPress={(e) => e.key === 'Enter' && handleAddItem('accomplishment')}
              />
              <Button onClick={() => handleAddItem('accomplishment')} size="sm">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.accomplishments.map((accomplishment, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveItem('accomplishments', index)}>
                  {accomplishment} ×
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Blockers/Challenges</label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={currentInputs.blocker}
                onChange={(e) => setCurrentInputs(prev => ({ ...prev, blocker: e.target.value }))}
                placeholder="What's blocking your progress?"
                onKeyPress={(e) => e.key === 'Enter' && handleAddItem('blocker')}
              />
              <Button onClick={() => handleAddItem('blocker')} size="sm">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.blockers.map((blocker, index) => (
                <Badge key={index} variant="destructive" className="cursor-pointer" onClick={() => handleRemoveItem('blockers', index)}>
                  {blocker} ×
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Energy Level (1-10)</label>
              <Input
                type="number"
                min="1"
                max="10"
                value={formData.energyLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, energyLevel: parseInt(e.target.value) || 5 }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Mood</label>
              <select
                value={formData.mood}
                onChange={(e) => setFormData(prev => ({ ...prev, mood: e.target.value }))}
                className="w-full p-2 border rounded-md"
              >
                {moods.map(mood => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Reflections</label>
            <textarea
              value={formData.reflections}
              onChange={(e) => setFormData(prev => ({ ...prev, reflections: e.target.value }))}
              placeholder="What did you learn? How did today go?"
              className="w-full p-2 border rounded-md h-20 resize-none"
            />
          </div>

          {aiSuggestions.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-2 block text-purple-600">AI Suggestions</label>
              <div className="space-y-2">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-2 bg-purple-50 border border-purple-200 rounded-md text-sm">
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button 
            onClick={handleSubmit}
            disabled={!formData.title}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Entry
          </Button>
        </CardContent>
      </Card>

      {showChatBot && (
        <ChatBot 
          onClose={() => setShowChatBot(false)}
          context="focus-journal"
        />
      )}
    </div>
  );
};

export default CreateJournalEntryForm;
