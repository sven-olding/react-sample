import React from 'react';

import {hot} from 'react-hot-loader/root';
import {Greeting} from './components/Greeting';

export interface AppProps {
  name: string;
}

export class App extends React.Component<AppProps> {
  render(): JSX.Element {
    const {name} = this.props;

    return <Greeting name={name} />;
  }
}

export default hot(App);
