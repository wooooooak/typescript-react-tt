import * as React from 'react';

import CounterContainer from './containers/CounterContainer';
import Profile from './components/Profile';
import TodoListContainer from './containers/TodoListContainer';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Profile name="whyj" job="developer" />
        <CounterContainer />
        <TodoListContainer />
      </div>
    );
  }
}

export default App;
