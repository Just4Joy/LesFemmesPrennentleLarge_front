import './App.scss';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Sessions from './components/Sessions/Sessions';
import Session from './components/Session/Session';
import Modal from './components/Modals/Modal';
import Connect from './components/Modals/Connect';
import CreateAccount from './components/Modals/CreateAccount';

function App() {
  const [activeModal, setActiveModal] = useState<string>('');

  return (
    <div className="App">
      <Router>
        <div className="App__page">
          <Header setActiveModal={setActiveModal} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/session" element={<Session />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Home />} />
          </Routes>
          <Footer />
        </div>
        {activeModal === 'connect' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <Connect setActiveModal={setActiveModal} />
          </Modal>
        )}
        {activeModal === 'creationcompte' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <CreateAccount />
          </Modal>
        )}
      </Router>
    </div>
  );
}

export default App;
