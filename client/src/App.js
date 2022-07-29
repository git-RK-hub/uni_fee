import React from 'react';
import Form from './ui/form';
import { ApiContextProvider } from './context';

const App = () => {
  return (
    <ApiContextProvider >
      <div className="App">
        <Form />
      </div>
    </ApiContextProvider>
  );
}

export default App;
