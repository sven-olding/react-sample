import React from 'react';
import {ToDo} from '../types';

interface ToDoListItemProps {
  todo: ToDo;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  onDelete: (event: React.MouseEvent, id: number) => void;
}

export const ToDoListItem: React.FC<ToDoListItemProps> = (
  props: ToDoListItemProps,
) => {
  const {isComplete, text, id} = props.todo;
  return (
    <li>
      <div className="list-item">
        <input
          type="checkbox"
          checked={isComplete}
          name="complete"
          onChange={(e) => props.onChange(e, id)}
        />
        <div className="list-item-text">
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
        </div>
        <i className="material-icons" onClick={(e) => props.onDelete(e, id)}>
          delete
        </i>
      </div>
    </li>
  );
};
