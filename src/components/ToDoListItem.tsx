import React from 'react';

interface ToDoListItemProps {
  todo: ToDo;
}

export const ToDoListItem: React.FC<ToDoListItemProps> = (
  props: ToDoListItemProps,
) => {
  const {todo} = props;

  return (
    <li>
      <label
        style={{textDecoration: todo.complete ? 'line-through' : undefined}}
      ></label>
      <input type="checkbox" checked={todo.complete} /> {todo.text}
    </li>
  );
};
