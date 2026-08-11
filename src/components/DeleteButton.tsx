"use client";

import { useTransition } from "react";
import Swal from "sweetalert2";
import { MdOutlineDelete } from "react-icons/md";

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  itemType?: string;
  className?: string;
}

export default function DeleteButton({ onDelete, itemType = "item", className = "flex items-center gap-1.5 px-4 py-2 bg-white text-red-500 border border-gray-100 hover:border-red-200 hover:bg-red-50 rounded-xl shadow-sm transition font-medium text-sm flex-shrink-0 whitespace-nowrap" }: DeleteButtonProps) {
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
        <>
          <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent text-red-500 rounded-full" />
          <span>Deleting...</span>
        </>
      ) : (
        <>
          <MdOutlineDelete size={18} className="flex-shrink-0" />
          <span>Delete</span>
        </>
      )}
    </button>
  );
}
