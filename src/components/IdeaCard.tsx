
import { useState } from 'react';
import { MoreVertical, Edit, Trash2, Calendar, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import EditIdeaForm from './EditIdeaForm';

const IdeaCard = ({ idea, onUpdate, onDelete }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'brainstorming': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'validating': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'building': return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'saas': return 'bg-indigo-100 text-indigo-800';
      case 'ai': return 'bg-pink-100 text-pink-800';
      case 'tools': return 'bg-orange-100 text-orange-800';
      case 'marketplace': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this idea?')) {
      onDelete(idea.id);
    }
  };

  const handleUpdate = (updatedIdea) => {
    onUpdate(updatedIdea);
    setShowEditForm(false);
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow duration-200 bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                {idea.title}
              </CardTitle>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={getStatusColor(idea.status)}>
                  {idea.status}
                </Badge>
                <Badge variant="outline" className={getCategoryColor(idea.category)}>
                  {idea.category}
                </Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {idea.description}
          </p>
          
          {idea.tags && idea.tags.length > 0 && (
            <div className="flex items-center space-x-1 mb-3">
              <Tag className="h-3 w-3 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {idea.tags.map((tag, index) => (
                  <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Created {formatDate(idea.createdAt)}</span>
            </div>
            {idea.updatedAt !== idea.createdAt && (
              <span>Updated {formatDate(idea.updatedAt)}</span>
            )}
          </div>
        </CardContent>
      </Card>

      {showEditForm && (
        <EditIdeaForm 
          idea={idea}
          onSubmit={handleUpdate}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  );
};

export default IdeaCard;
