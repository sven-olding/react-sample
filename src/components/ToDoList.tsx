import React, {useState, useEffect} from 'react';
import {ToDoListItem} from '../components/ToDoListItem';
import {ToDoService} from '../services/todo-service';
import {ToDo} from '../types';

const ToDoList: React.FC = () => {
  const [error, setError] = useState<Error>();
  const [items, setItems] = useState<ToDo[]>([]);
  const [newToDoText, setNewToDoText] = useState<string>('');

  const toDoService = new ToDoService(process.env.API_URL || '');

  const fetchItems = async () => {
    try {
      const items = await toDoService.fetchToDoItems();
      items.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        } else {
          return 0;
        }
      });
      setItems(items);
    } catch (e) {
      setError(e);
    }
  };

  const addItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newItem: ToDo = {
      id: -1,
      text: newToDoText,
      isComplete: false,
    };
    toDoService.createToDoItem(newItem).then((newToDo) => {
      setItems(items.concat(newToDo));
      setNewToDoText('');
    });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onChangeNewToDoText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewToDoText(event.target.value);
  };

  const handleDelete = (event: React.MouseEvent, id: number) => {
    for (const t of items) {
      if (t.id === id) {
        toDoService.deleteToDoItem(t).then(() => fetchItems());
        break;
      }
    }
  };

  const handleToDoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    console.log('handleToDoChange');
    console.log(id);
    const {name, value, checked} = event.target;
    const updTodos = [...items];
    updTodos.map((t) => {
      if (t.id === id) {
        if (name === 'complete') {
          t.isComplete = checked;
        } else if (name === 'text') {
          t.text = value;
        }
        toDoService.updateToDoItem(t);
      }
    });

    setItems(updTodos);
  };

  if (error) throw error;

  return (
    <div>
      <div id="todolist">
        <ul>
          {items.map((todo: ToDo) => (
            <ToDoListItem
              key={todo.id}
              todo={todo}
              onChange={handleToDoChange}
              onDelete={handleDelete}
            />
          ))}
        </ul>
        <form onSubmit={addItem}>
          <input
            type="text"
            value={newToDoText}
            placeholder="Deine neue Aufgabe..."
            onChange={onChangeNewToDoText}
          />
          <button type="submit" disabled={newToDoText.length == 0}>
            Neue Aufgabe
          </button>
        </form>
      </div>
    </div>
  );
};

export default ToDoList;
