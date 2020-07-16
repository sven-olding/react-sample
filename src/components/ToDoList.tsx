import React from 'react';
import {ToDoListItem} from '../components/ToDoListItem';
import {ToDoService} from '../services/todo-service';

interface ToDoListState {
  items: ToDo[];
  newToDoText: string;
}

interface ToDoListProps {
  foo?: string;
}

export class ToDoList extends React.Component<ToDoListProps, ToDoListState> {
  private toDoService: ToDoService;

  constructor(props: ToDoListProps) {
    super(props);
    this.state = {items: [], newToDoText: ''};
    this.addItem = this.addItem.bind(this);
    this.setNewToDoText = this.setNewToDoText.bind(this);
    this.handleToDoChange = this.handleToDoChange.bind(this);

    this.toDoService = new ToDoService();
  }

  async componentDidMount(): Promise<void> {
    const items = await this.toDoService.fetchToDoItems();
    this.setState(() => ({items: items}));
  }

  addItem(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const newItem: ToDo = {
      text: this.state.newToDoText,
      isComplete: false,
    };
    this.toDoService.createToDoItem(newItem).then(() => {
      this.setState((prevState) => ({
        items: prevState.items.concat(newItem),
        newToDoText: '',
      }));
    });
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
          t.isComplete = checked;
        } else if (name === 'text') {
          t.text = value;
        }
        this.toDoService.updateToDoItem(t);
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
