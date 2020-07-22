import React from 'react';

import {hot} from 'react-hot-loader/root';
import {Greeting} from './components/Greeting';
import {ToDoList} from './components/ToDoList';
import {ErrorBoundary} from './components/ErrorBoundary';

export interface AppProps {
  name: string;
}

export class App extends React.Component<AppProps> {
  render(): JSX.Element {
    const {name} = this.props;

    return (
      <div id="container">
        <header>
          <Greeting name={name} />
        </header>
        <main>
          <ErrorBoundary>
            <ToDoList />
          </ErrorBoundary>
        </main>
        <footer />
      </div>
    );
  }
}

export default hot(App);
