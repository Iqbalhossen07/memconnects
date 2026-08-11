"use client";

import { useTransition } from "react";

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  itemType?: string;
  className?: string;
}

export default function DeleteButton({ onDelete, itemType = "item", className = "text-red-500 hover:text-red-700 p-2" }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete this ${itemType}?`)) {
      startTransition(async () => {
        await onDelete();
      });
    }
  };

  return (
    <button 
      type="button" 
      onClick={handleDelete}
      disabled={isPending}
      className={className}
      title="Delete"
    >
      {isPending ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <i className="fas fa-trash"></i>
      )}
    </button>
  );
}
