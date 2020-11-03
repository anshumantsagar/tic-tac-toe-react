import React, { Component } from 'react';
import './App.css';

//components
import Gameplay from './components/gameplay';

//redux
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

class App extends Component {

  render() {
    return (
      <Provider store={store}> 
        <PersistGate persistor={persistor}>
          <div className="App">
            <Gameplay/>
          </div>
        </PersistGate>
      </Provider>

    );
  }
}

export default App;
