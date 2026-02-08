import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Card } from '../types/kanban';

interface KanbanCardProps {
  card: Card;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDragStart: (e: React.DragEvent, card: Card) => void;
}

export function KanbanCard({ card, onDelete, onEdit, onDragStart }: KanbanCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(card.title);

  const handleEdit = () => {
    if (editValue.trim()) {
      onEdit(card.id, editValue.trim());
    } else {
      setEditValue(card.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditValue(card.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      draggable={!isEditing}
      onDragStart={(e) => onDragStart(e, card)}
      className="group relative bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
    >
      <div className="flex items-start gap-2">
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className="flex-1 text-sm text-gray-800 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <p
            onClick={() => setIsEditing(true)}
            className="flex-1 text-sm text-gray-800 cursor-text"
          >
            {card.title}
          </p>
        )}
        <button
          onClick={() => onDelete(card.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 p-1"
          aria-label="Delete card"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
