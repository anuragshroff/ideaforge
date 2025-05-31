
import { useState } from 'react';
import { Plus, BookOpen, MessageCircle, Calendar, Target, Bot, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ChatBot from './ChatBot';
import CreateJournalEntryForm from './CreateJournalEntryForm';

const FocusJournal = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);

  const handleCreateEntry = (newEntry) => {
    const entryWithId = {
      ...newEntry,
      id: Date.now().toString()
    };
    setJournalEntries(prev => [...prev, entryWithId]);
    setShowCreateForm(false);
  };

  const getThisWeekEntries = () => {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    return journalEntries.filter(entry => new Date(entry.date) >= weekStart).length;
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'excited': return 'bg-green-100 text-green-800';
      case 'happy': return 'bg-blue-100 text-blue-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      case 'frustrated': return 'bg-orange-100 text-orange-800';
      case 'tired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Focus Journal</h2>
          <p className="text-gray-600">Daily execution tracking</p>
        </div>
        <Button
          onClick={() => setShowChatBot(true)}
          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
        >
          <Bot className="h-4 w-4 mr-2" />
          Productivity Coach
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-orange-600 font-medium">Total Entries</p>
                <p className="text-2xl font-bold text-orange-800">{journalEntries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-green-600 font-medium">This Week</p>
                <p className="text-2xl font-bold text-green-800">{getThisWeekEntries()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Journal Entries List */}
      <div className="space-y-4">
        {journalEntries.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No journal entries yet</h3>
              <p className="text-gray-500 mb-4">Start tracking your daily progress</p>
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Your Journal Entries</h3>
              <Button 
                onClick={() => setShowCreateForm(true)}
                size="sm"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Entry
              </Button>
            </div>
            
            {journalEntries.map(entry => (
              <Card key={entry.id} className="border border-gray-200 hover:border-orange-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{entry.title}</h4>
                      <p className="text-gray-600 text-sm">{entry.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getMoodColor(entry.mood)}>
                        {entry.mood}
                      </Badge>
                      <Badge variant="outline">
                        Energy: {entry.energyLevel}/10
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    {entry.goals?.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-700">Goals:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {entry.goals.slice(0, 2).map((goal, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {goal}
                            </Badge>
                          ))}
                          {entry.goals.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{entry.goals.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {entry.accomplishments?.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-700">Accomplishments:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {entry.accomplishments.slice(0, 2).map((accomplishment, index) => (
                            <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                              {accomplishment}
                            </Badge>
                          ))}
                          {entry.accomplishments.length > 2 && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              +{entry.accomplishments.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {entry.aiSuggestions?.length > 0 && (
                      <div>
                        <span className="font-medium text-purple-700 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          AI Insights:
                        </span>
                        <p className="text-purple-600 text-xs mt-1 italic">
                          {entry.aiSuggestions[0]}
                        </p>
                      </div>
                    )}
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
          context="focus-journal"
        />
      )}

      {/* Create Journal Entry Form */}
      {showCreateForm && (
        <CreateJournalEntryForm
          onSubmit={handleCreateEntry}
          onClose={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
};

export default FocusJournal;
