import axios, {AxiosInstance} from 'axios';

export class ToDoService {
  private ax: AxiosInstance;
  constructor(baseUrl: string) {
    this.ax = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

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

  async deleteToDoItem(todo: ToDo): Promise<void> {
    return await this.ax.delete('/' + todo.id);
  }
}
