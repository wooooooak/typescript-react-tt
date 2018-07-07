import * as React from 'react';

import Counter from './components/Counter';
import Profile from './components/Profile';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Profile name="whyj" job="developer" />
        <Counter />
      </div>
    );
  }
}

export default App;
