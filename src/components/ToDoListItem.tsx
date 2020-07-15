import React from 'react';

interface ToDoListItemProps {
  todo: ToDo;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

export const ToDoListItem: React.FC<ToDoListItemProps> = (
  props: ToDoListItemProps,
) => {
  const {complete, text, id} = props.todo;
  return (
    <li>
      <input
        type="checkbox"
        checked={complete}
        name="complete"
        onChange={(e) => props.onChange(e, id)}
      />
      <label
        style={{
          textDecoration: complete ? 'line-through' : undefined,
        }}
      >
        {text}
      </label>
    </li>
  );
};
