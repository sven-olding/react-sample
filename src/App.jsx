import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>Hallo {name}</h1>
      </>
    );
  }
}

App.propTypes = {
  name: PropTypes.string.isRequired,
};

export default hot(App);
