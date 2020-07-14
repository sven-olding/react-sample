import React from 'react';

import {hot} from 'react-hot-loader/root';
import {Greeting} from './components/Greeting';
import {ToDoList} from './components/ToDoList';
import {v4 as uuid} from 'uuid';

export interface AppProps {
  name: string;
}

export class App extends React.Component<AppProps> {
  todos: ToDo[] = [
    {
      id: uuid(),
      text: 'Einkaufen',
      complete: false,
    },
    {
      id: uuid(),
      text: 'Putzen',
      complete: false,
    },
  ];

  render(): JSX.Element {
    const {name} = this.props;

    return (
      <div>
        <Greeting name={name} />
        Deine Aufgaben:
        <ToDoList todos={this.todos}></ToDoList>
      </div>
    );
  }
}

export default hot(App);
