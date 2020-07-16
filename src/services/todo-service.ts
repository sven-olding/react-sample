import axios from 'axios';

export class ToDoService {
  private ax = axios.create({
    baseURL: 'https://localhost:5001/api/ToDoItems',
    headers: {
      'Content-type': 'application/json',
    },
  });

  async fetchToDoItems(): Promise<ToDo[]> {
    const resp = await this.ax.get('/');

    return resp.data;
  }

  async updateToDoItem(todo: ToDo): Promise<void> {
    await this.ax.put('/' + todo.id, JSON.stringify(todo));
  }

  async createToDoItem(todo: ToDo): Promise<ToDo> {
    const resp = await this.ax.post('/', JSON.stringify(todo));
    return resp.data;
  }
}
