
import { useState } from 'react';
import { X, Save, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ChatBot from './ChatBot';

interface CreateMVPFormProps {
  onSubmit: (mvp: any) => void;
  onClose: () => void;
}

const CreateMVPForm = ({ onSubmit, onClose }: CreateMVPFormProps) => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetAudience: '',
    coreFeatures: [] as string[],
    timeline: '',
    budget: '',
    successMetrics: [] as string[]
  });
  const [currentFeature, setCurrentFeature] = useState('');
  const [currentMetric, setCurrentMetric] = useState('');

  const handleAddFeature = () => {
    if (currentFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        coreFeatures: [...prev.coreFeatures, currentFeature.trim()]
      }));
      setCurrentFeature('');
    }
  };

  const handleAddMetric = () => {
    if (currentMetric.trim()) {
      setFormData(prev => ({
        ...prev,
        successMetrics: [...prev.successMetrics, currentMetric.trim()]
      }));
      setCurrentMetric('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      coreFeatures: prev.coreFeatures.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveMetric = (index: number) => {
    setFormData(prev => ({
      ...prev,
      successMetrics: prev.successMetrics.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.description) {
      onSubmit({
        ...formData,
        status: 'planning',
        createdAt: new Date().toISOString()
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Create MVP Plan</CardTitle>
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
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your MVP name"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="What problem does your MVP solve?"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Target Audience</label>
            <Input
              value={formData.targetAudience}
              onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
              placeholder="Who is your target audience?"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Core Features</label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={currentFeature}
                onChange={(e) => setCurrentFeature(e.target.value)}
                placeholder="Add a core feature"
                onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
              />
              <Button onClick={handleAddFeature} size="sm">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.coreFeatures.map((feature, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveFeature(index)}>
                  {feature} ×
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Timeline</label>
              <Input
                value={formData.timeline}
                onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                placeholder="e.g., 3 months"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Budget</label>
              <Input
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                placeholder="e.g., $10,000"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Success Metrics</label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={currentMetric}
                onChange={(e) => setCurrentMetric(e.target.value)}
                placeholder="Add a success metric"
                onKeyPress={(e) => e.key === 'Enter' && handleAddMetric()}
              />
              <Button onClick={handleAddMetric} size="sm">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.successMetrics.map((metric, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveMetric(index)}>
                  {metric} ×
                </Badge>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!formData.name || !formData.description}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Create MVP Plan
          </Button>
        </CardContent>
      </Card>

      {showChatBot && (
        <ChatBot 
          onClose={() => setShowChatBot(false)}
          context="mvp-planning"
        />
      )}
    </div>
  );
};

export default CreateMVPForm;
