import React from 'react';

interface ToDoListItemProps {
  todo: ToDo;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

export const ToDoListItem: React.FC<ToDoListItemProps> = (
  props: ToDoListItemProps,
) => {
  const {isComplete, text, id} = props.todo;
  return (
    <li>
      <input
        type="checkbox"
        checked={isComplete}
        name="complete"
        onChange={(e) => props.onChange(e, id)}
      />
      <label
        style={{
          textDecoration: isComplete ? 'line-through' : undefined,
          display: !isComplete ? 'none' : undefined,
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
          display: isComplete ? 'none' : undefined,
        }}
      />
    </li>
  );
};
