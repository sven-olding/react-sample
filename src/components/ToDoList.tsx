import React from 'react';
import {ToDoListItem} from '../components/ToDoListItem';
import {v4 as uuid} from 'uuid';

interface ToDoListProps {
  todos: ToDo[];
}

interface ToDoListState {
  items: ToDo[];
  newToDoText: string;
}

export class ToDoList extends React.Component<ToDoListProps, ToDoListState> {
  constructor(props: ToDoListProps) {
    super(props);
    this.state = {items: props.todos, newToDoText: ''};
    this.addItem = this.addItem.bind(this);
    this.setNewToDoText = this.setNewToDoText.bind(this);
  }

  addItem(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const newItem: ToDo = {
      id: uuid(),
      text: this.state.newToDoText,
      complete: false,
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      newToDoText: '',
    }));
  }

  setNewToDoText(event: React.ChangeEvent<HTMLInputElement>): void {
    event.persist();
    this.setState(() => ({
      newToDoText: event.target.value,
    }));
  }

  render(): JSX.Element {
    const {items, newToDoText} = this.state;

    return (
      <div>
        <ul>
          {items.map((todo: ToDo) => (
            <ToDoListItem key={todo.text} todo={todo} />
          ))}
        </ul>
        <form onSubmit={this.addItem}>
          <input
            type="text"
            value={newToDoText}
            placeholder="Deine neue Aufgabe..."
            onChange={this.setNewToDoText}
          />
          <button type="submit">Neue Aufgabe</button>
        </form>
      </div>
    );
  }
}
