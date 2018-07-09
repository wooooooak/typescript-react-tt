import * as React from 'react';

import CounterContainer from './containers/CounterContainer';
import Profile from './components/Profile';
import TodoList from './components/TodoList';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Profile name="whyj" job="developer" />
        <CounterContainer />
        <TodoList />
      </div>
    );
  }
}

export default App;
