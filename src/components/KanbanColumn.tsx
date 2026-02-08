import { Plus } from 'lucide-react';
import { Card, Column } from '../types/kanban';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  column: Column;
  cards: Card[];
  onAddCard: (columnId: string) => void;
  onDeleteCard: (id: string) => void;
  onEditCard: (id: string, newTitle: string) => void;
  onDragStart: (e: React.DragEvent, card: Card) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
}

export function KanbanColumn({
  column,
  cards,
  onAddCard,
  onDeleteCard,
  onEditCard,
  onDragStart,
  onDragOver,
  onDrop,
}: KanbanColumnProps) {
  return (
    <div
      className="flex flex-col bg-gray-50 rounded-lg min-w-[280px] flex-1"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div
        className="flex items-center justify-between px-4 py-3 rounded-t-lg"
        style={{ backgroundColor: column.color }}
      >
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-white text-sm">{column.title}</h2>
          <span className="bg-white bg-opacity-30 text-white text-xs font-medium px-2 py-0.5 rounded-full">
            {cards.length}
          </span>
        </div>
        <button
          onClick={() => onAddCard(column.id)}
          className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
          aria-label="Add card"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-3 space-y-3 min-h-[200px]">
        {cards.map((card) => (
          <KanbanCard
            key={card.id}
            card={card}
            onDelete={onDeleteCard}
            onEdit={onEditCard}
            onDragStart={onDragStart}
          />
        ))}
      </div>

      <button
        onClick={() => onAddCard(column.id)}
        className="mx-3 mb-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Card
      </button>
    </div>
  );
}
