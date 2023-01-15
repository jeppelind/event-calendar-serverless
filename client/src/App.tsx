import React from 'react';
import './App.scss';
import Events from './features/event/Events';
import Header from './features/header/Header';

const App = () => (
  <div className='App'>
    <Header />
    <Events />
  </div>
);

export default App;
