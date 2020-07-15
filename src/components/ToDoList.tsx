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
    this.handleToDoChange = this.handleToDoChange.bind(this);
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

  handleToDoChange(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ): void {
    const {name, value, checked} = event.target;
    const updTodos = [...this.state.items];
    updTodos.map((t) => {
      if (t.id === id) {
        if (name === 'complete') {
          t.complete = checked;
        } else if (name === 'text') {
          t.text = value;
        }
      }
    });

    this.setState(() => ({
      items: updTodos,
    }));
  }

  render(): JSX.Element {
    const {items, newToDoText} = this.state;

    return (
      <div>
        <ul>
          {items.map((todo: ToDo) => (
            <ToDoListItem
              key={todo.id}
              todo={todo}
              onChange={this.handleToDoChange}
            />
          ))}
        </ul>
        <form onSubmit={this.addItem}>
          <input
            type="text"
            value={newToDoText}
            placeholder="Deine neue Aufgabe..."
            onChange={this.setNewToDoText}
          />
          <button type="submit" disabled={this.state.newToDoText.length == 0}>
            Neue Aufgabe
          </button>
        </form>
      </div>
    );
  }
}
