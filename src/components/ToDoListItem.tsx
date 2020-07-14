import React from 'react';

interface ToDoListItemProps {
  todo: ToDo;
}

interface ToDoListItemState {
  id: string;
  text: string;
  complete: boolean;
}

export class ToDoListItem extends React.Component<
  ToDoListItemProps,
  ToDoListItemState
> {
  constructor(props: ToDoListItemProps) {
    super(props);

    this.state = props.todo;
  }

  render(): JSX.Element {
    const {complete, text} = this.state;

    return (
      <li>
        <label
          style={{
            textDecoration: complete ? 'line-through' : undefined,
          }}
        ></label>
        <input type="checkbox" readOnly checked={complete} /> {text}
      </li>
    );
  }
}
