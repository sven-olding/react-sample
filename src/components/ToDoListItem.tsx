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
          display: !complete ? 'none' : undefined,
        }}
      >
        {text}
      </label>
      <input
        type="text"
        value={text}
        name="text"
        onChange={(e) => props.onChange(e, id)}
        style={{
          display: complete ? 'none' : undefined,
        }}
      />
    </li>
  );
};
