"use client";

import { useTransition } from "react";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  itemType?: string;
  className?: string;
}

export default function DeleteButton({ onDelete, itemType = "item", className = "text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition" }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this ${itemType}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F2852C',
      cancelButtonColor: '#6D5795',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          await onDelete();
          Swal.fire(
            'Deleted!',
            `Your ${itemType} has been deleted.`,
            'success'
          );
        });
      }
    });
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
        <span className="animate-spin inline-block w-5 h-5 border-2 border-current border-t-transparent text-red-500 rounded-full" />
      ) : (
        <MdDelete size={20} />
      )}
    </button>
  );
}
