import React from 'react';

import {hot} from 'react-hot-loader/root';

export interface AppProps {
  name: string;
}

export class App extends React.Component<AppProps> {
  render(): JSX.Element {
    const {name} = this.props;
    return <h1>Hallo, {name}</h1>;
  }
}

export default hot(App);
