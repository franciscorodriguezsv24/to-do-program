import { useState } from "react";
import { type TodoElementsMock } from "../mock/todoElements";

export function useDraggableList(initialItems: TodoElementsMock[]) {
    const [items, setItems] = useState(initialItems);
    const [draggedItemIndex, setDraggedItemIndex] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent<HTMLElement>, index: string) => {
        e.dataTransfer.setData("text/plain", index);
        setDraggedItemIndex(index);
    };

    const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLElement>, dropIndex: number) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));

    if (draggedIndex !== dropIndex) {
        const newItems = [...items];
        const [draggedItem] = newItems.splice(draggedIndex, 1);
        newItems.splice(dropIndex, 0, draggedItem);
        setItems(newItems);
    }
        setDraggedItemIndex(null);
    };

    return {
        items,
        draggedItemIndex,
        handleDragStart,
        handleDragOver,
        handleDrop,
        setItems,
    };
}
