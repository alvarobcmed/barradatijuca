```typescript
import React from 'react';
import { Story, StoryStatus } from '../../types/story';
import { Archive, Edit2, RefreshCw, GripVertical, Clock } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface StoriesGridProps {
  stories: Story[];
  activeTab: 'active' | 'scheduled' | 'archived';
  onReorder: (stories: Story[]) => void;
  onEdit: (story: Story) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
}

interface SortableStoryItemProps {
  story: Story;
  activeTab: 'active' | 'scheduled' | 'archived';
  onEdit: (story: Story) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
}

function SortableStoryItem({ story, activeTab, onEdit, onArchive, onRestore }: SortableStoryItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: story.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusBadge = () => {
    if (story.scheduling) {
      const now = Date.now();
      if (now < story.scheduling.startDate) {
        return (
          <span className="absolute top-2 right-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Agendado
          </span>
        );
      }
    }
    return null;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg shadow overflow-hidden"
    >
      <div className="relative">
        {story.type === 'video' ? (
          <video
            src={story.url}
            className="w-full h-48 object-cover"
            controls
          />
        ) : (
          <img
            src={story.url}
            alt="Story preview"
            className="w-full h-48 object-cover"
          />
        )}
        
        {/* Drag handle */}
        <button
          className="absolute top-2 left-2 p-1 bg-black/50 rounded text-white hover:bg-black/70 transition-colors cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {getStatusBadge()}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={story.userAvatar}
              alt={story.username}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-900">
              {story.username}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(story)}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            {activeTab === 'active' || activeTab === 'scheduled' ? (
              <button
                onClick={() => onArchive(story.id)}
                className="p-1 text-gray-500 hover:text-gray-700"
                title="Archive story"
              >
                <Archive className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onRestore(story.id)}
                className="p-1 text-green-500 hover:text-green-700"
                title="Restore story"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {new Date(story.timestamp).toLocaleDateString()}
        </div>
        {story.type === 'image' && (
          <div className="mt-2 text-sm text-gray-500">
            Duration: {story.duration ? story.duration / 1000 : 5}s
          </div>
        )}
        {story.scheduling && (
          <div className="mt-2 space-y-1">
            <div className="text-xs text-gray-500">
              Início: {formatDate(story.scheduling.startDate)}
            </div>
            <div className="text-xs text-gray-500">
              Término: {formatDate(story.scheduling.endDate)}
            </div>
          </div>
        )}
        {story.whatsapp && (
          <div className="mt-2 text-sm text-gray-500">
            WhatsApp: {story.whatsapp.number}
          </div>
        )}
      </div>
    </div>
  );
}

export function StoriesGrid({ stories, activeTab, onReorder, onEdit, onArchive, onRestore }: StoriesGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = stories.findIndex((story) => story.id === active.id);
      const newIndex = stories.findIndex((story) => story.id === over.id);
      
      const newStories = arrayMove(stories, oldIndex, newIndex);
      onReorder(newStories);
    }
  };

  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          {activeTab === 'active' 
            ? 'No active stories yet. Add your first story!'
            : activeTab === 'scheduled'
            ? 'No scheduled stories yet.'
            : 'No archived stories yet.'
          }
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SortableContext
          items={stories.map(story => story.id)}
          strategy={verticalListSortingStrategy}
        >
          {stories.map((story) => (
            <SortableStoryItem
              key={story.id}
              story={story}
              activeTab={activeTab}
              onEdit={onEdit}
              onArchive={onArchive}
              onRestore={onRestore}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
```