import { useState } from 'react';
import { Card, Column, ColumnId } from '../types/kanban';
import { KanbanColumn } from './KanbanColumn';

const initialColumns: Column[] = [
  { id: 'todo', title: 'Todo', count: 3, color: '#3b82f6' },
  { id: 'inProgress', title: 'In Progress', count: 3, color: '#f59e0b' },
  { id: 'done', title: 'Done', count: 2, color: '#10b981' },
];

const initialCards: Card[] = [
  { id: '1', title: 'Create initial project plan', columnId: 'todo' },
  { id: '2', title: 'Design landing page', columnId: 'todo' },
  { id: '3', title: 'Review codebase structure', columnId: 'todo' },
  { id: '4', title: 'Implement authentication', columnId: 'inProgress' },
  { id: '5', title: 'Set up database schema', columnId: 'inProgress' },
  { id: '6', title: 'Fix navbar bugs', columnId: 'inProgress' },
  { id: '7', title: 'Organize project repository', columnId: 'done' },
  { id: '8', title: 'Write API documentation', columnId: 'done' },
];

export function KanbanBoard() {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [draggedCard, setDraggedCard] = useState<Card | null>(null);

  const handleAddCard = (columnId: string) => {
    const newCard: Card = {
      id: Date.now().toString(),
      title: 'New task',
      columnId,
    };
    setCards([...cards, newCard]);
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleEditCard = (id: string, newTitle: string) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, title: newTitle } : card))
    );
  };

  const handleDragStart = (e: React.DragEvent, card: Card) => {
    setDraggedCard(card);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedCard) return;

    setCards(
      cards.map((card) =>
        card.id === draggedCard.id ? { ...card, columnId: targetColumnId } : card
      )
    );
    setDraggedCard(null);
  };

  const getColumnCards = (columnId: ColumnId) => {
    return cards.filter((card) => card.columnId === columnId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Board</h1>
          <p className="text-gray-600">Drag and drop cards to organize your tasks</p>
        </header>

       <div className="flex gap-6 overflow-x-auto pb-4">

          {initialColumns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              cards={getColumnCards(column.id as ColumnId)}
              onAddCard={handleAddCard}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
