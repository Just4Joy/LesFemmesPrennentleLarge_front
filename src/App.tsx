import './App.scss';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home/Home';
import Connect from './components/Modals/Connect';
import CreateAccount from './components/Modals/CreateAccount';
import CreateProfil1 from './components/Modals/CreateProfil1';
import CreateProfil2 from './components/Modals/CreateProfil2';
import Modal from './components/Modals/Modal';
import ModalProfile from './components/Modals/ModalProfile';
import Profile from './components/Profile/Profile';
import Session from './components/Session/Session';
import Sessions from './components/Sessions/Sessions';

function App() {
  const [activeModal, setActiveModal] = useState<string>('');

  return (
    <div className="App">
      <Router>
        <div className="App__page">
          <Header setActiveModal={setActiveModal} />
          <Routes>
            <Route path="/" element={<Home setActiveModal={setActiveModal} />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route
              path="/session"
              element={<Session setActiveModal={setActiveModal} />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Home setActiveModal={setActiveModal} />} />
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
            <CreateAccount setActiveModal={setActiveModal} />
          </Modal>
        )}
        {activeModal === 'completeprofil1' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <CreateProfil1 setActiveModal={setActiveModal} />
          </Modal>
        )}
        {activeModal === 'completeprofil2' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <CreateProfil2 setActiveModal={setActiveModal} />
          </Modal>
        )}
        {activeModal === 'modalwahine' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <ModalProfile />
          </Modal>
        )}
      </Router>
    </div>
  );
}

export default App;
