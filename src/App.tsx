import './App.scss';

import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Sessions from './components/Sessions.tsx/Sessions';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Profile />
      <Sessions />
      <Footer />
    </div>
  );
}

export default App;
