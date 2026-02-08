import { useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { Card } from '../types/kanban';

interface KanbanCardProps {
  card: Card;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, card: Card) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, card: Card) => void;
}

export function KanbanCard({ card, onDelete, onEdit, onDragStart, onDragOver, onDrop }: KanbanCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(card.title);

  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(card.id, editValue.trim());
    } else {
      setEditValue(card.title);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(card.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    else if (e.key === 'Escape') handleCancel();
  };

  return (
    <div
      draggable={!isEditing} // Only draggable if not editing
      onDragStart={(e) => !isEditing && onDragStart(e, card)}
      onDragOver={(e) => !isEditing && onDragOver(e)}
      onDrop={(e) => !isEditing && onDrop(e, card)}
      className={`group relative bg-gray-50 rounded-lg border border-gray-300 p-3 shadow-sm hover:shadow-md transition-shadow w-full
                  ${!isEditing ? 'cursor-move' : 'cursor-text'}`} // cursor changes
    >
      <div className="flex flex-col gap-2 w-full">
        {isEditing ? (
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 text-gray-900 text-sm border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex gap-1">
              <button
                onClick={handleSave}
                className="text-green-500 hover:text-green-700 p-1"
                aria-label="Save"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={handleCancel}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Cancel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <p className="flex-1 text-gray-900 text-sm text-center sm:text-left truncate">
              {card.title}
            </p>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-700 p-1"
                aria-label="Edit card"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(card.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 p-1"
                aria-label="Delete card"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
