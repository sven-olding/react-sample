import React from 'react';
import {ToDoListItem} from '../components/ToDoListItem';
import {ToDoService} from '../services/todo-service';

interface ToDoListState {
  items: ToDo[];
  newToDoText: string;
  error?: Error;
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
    this.handleDelete = this.handleDelete.bind(this);

    const baseUrl = process.env.API_URL || '';

    this.toDoService = new ToDoService(baseUrl);
  }

  async componentDidMount(): Promise<void> {
    this.fetchItems();
  }

  async fetchItems(): Promise<void> {
    try {
      const items = await this.toDoService.fetchToDoItems();
      items.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        } else {
          return 0;
        }
      });
      this.setState(() => ({items: items}));
    } catch (error) {
      this.setState({error});
    }
  }

  addItem(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const newItem: ToDo = {
      id: -1,
      text: this.state.newToDoText,
      isComplete: false,
    };
    this.toDoService.createToDoItem(newItem).then((newTodo) => {
      this.setState((prevState) => ({
        items: prevState.items.concat(newTodo),
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

  handleDelete(event: React.MouseEvent, id: number): void {
    const updTodos = [...this.state.items];
    for (const t of updTodos) {
      if (t.id === id) {
        this.toDoService.deleteToDoItem(t).then(() => this.fetchItems());
        break;
      }
    }
  }

  handleToDoChange(
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
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
    const {items, newToDoText, error} = this.state;
    if (error) throw error;

    return (
      <div>
        <div id="todolist">
          <ul>
            {items.map((todo: ToDo) => (
              <ToDoListItem
                key={todo.id}
                todo={todo}
                onChange={this.handleToDoChange}
                onDelete={this.handleDelete}
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
      </div>
    );
  }
}
