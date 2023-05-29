import React, { useState, DragEvent, ReactNode } from 'react';

export type DraggableElementProps = {
  id: string,
  onDragOver: (event: DragEvent<HTMLElement>) => void,
  onDragStart: (event: DragEvent<HTMLElement>) => void,
  onDrop: (event: DragEvent<HTMLElement>) => void,
  draggable: boolean,
  key: string
}

type DraggableElement = {
  id: string,
  element: (props: DraggableElementProps) => ReactNode,
  order: number
}

type DraggableElements = Array<DraggableElement>

type DragDropProps = {
  elements: DraggableElements,
  className: string
};

const DragDrop = (props: DragDropProps) => {
  const [dragId, setDragId] = useState<string>();
  const [elements, setElements] = useState<DraggableElements>(props.elements);

  const onDragStart = (event: DragEvent<HTMLElement>) => {
    setDragId(event.currentTarget.id);
  };

  const onDrop = (event: DragEvent<HTMLElement>) => {
    const dragElement = elements.find(element => element.id === dragId);
    const dropElement = elements.find(element => element.id === event.currentTarget.id);

    const dragElementOrder = dragElement?.order;
    const dropElementOrder = dropElement?.order;

    const newElementsState = elements.map(element => {
      if (element.id === dragId && dropElementOrder) {
        element.order = dropElementOrder;
      }
      if (element.id === event.currentTarget.id && dragElementOrder) {
        element.order = dragElementOrder;
      }
      return element;
    });

    setElements(newElementsState.sort((a, b) => a.order - b.order));
  };

  return (
    <div className={props.className}>
      {elements.map(({ element, id }) => (
        element({
          id,
          onDragOver: (event: DragEvent<HTMLElement>) => event.preventDefault(),
          onDragStart,
          onDrop,
          draggable: true,
          key: id
        })
      ))}
    </div>
  );

}

export default DragDrop;