import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home/Home';
import Connect from './components/Modals/Connect';
import CreateAccount from './components/Modals/CreateAccount';
import CreateProfile1 from './components/Modals/CreateProfile1';
import CreateProfile2 from './components/Modals/CreateProfile2';
import CreateSession1 from './components/Modals/CreateSession1';
import CreateSession2 from './components/Modals/CreateSession2';
import Modal from './components/Modals/Modal';
import ModalProfile from './components/Modals/ModalProfile';
import ModalWahine from './components/Modals/ModalWahine';
import Registered from './components/Modals/Registered';
import RegisteredWahine from './components/Modals/RegisteredWahine';
import Registration from './components/Modals/Registration';
import SessionPublished from './components/Modals/SessionPublished';
import SessionResume from './components/Modals/SessionResume';
import Unsubscribe from './components/Modals/Unsubscribe';
import MySessions from './components/MySessions';
import Profile from './components/Profile/Profile';
import Session from './components/Session/Session';
import Sessions from './components/Sessions/Sessions';

function App() {
  const [activeModal, setActiveModal] = useState<string>('');

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Router>
        <div className="App__page">
          <Header setActiveModal={setActiveModal} />

          <Routes>
            <Route path="/" element={<Home setActiveModal={setActiveModal} />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/:idRegion" element={<Sessions />} />

            <Route
              path="/session/:idSession"
              element={<Session setActiveModal={setActiveModal} />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Home setActiveModal={setActiveModal} />} />
            <Route
              path="/createSession"
              element={<Home setActiveModal={setActiveModal} />}
            />
            <Route path="/mySessions" element={<MySessions />} />
            <Route path="/:id" element={<Home setActiveModal={setActiveModal} />} />
            <Route
              path="/session/:id"
              element={<Session setActiveModal={setActiveModal} />}
            />
          </Routes>
          <Footer />
        </div>
        {/* Série de modals */}
        {activeModal === 'connect' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <Connect setActiveModal={setActiveModal} />
          </Modal>
        )}
        {activeModal === 'create_account' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <CreateAccount setActiveModal={setActiveModal} />
          </Modal>
        )}
        {activeModal === 'complete_profil1' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <CreateProfile1 setActiveModal={setActiveModal} />
          </Modal>
        )}
        {activeModal === 'complete_profil2' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <CreateProfile2 setActiveModal={setActiveModal} />
          </Modal>
        )}
        {activeModal === 'wahine2' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <Routes>
              <Route path="/session/:id" element={<ModalProfile />} />
            </Routes>
          </Modal>
        )}
        {activeModal === 'wahine' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <Routes>
              <Route path="/:id" element={<ModalProfile />} />
            </Routes>
          </Modal>
        )}
        {activeModal === 'registration' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <Registration setActiveModal={setActiveModal} />
          </Modal>
        )}
        {activeModal === 'registered' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <Registered />
          </Modal>
        )}
        {activeModal === 'unsubscribe' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <Unsubscribe />
          </Modal>
        )}
        {activeModal === 'create_session1' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <CreateSession1 setActiveModal={setActiveModal} />
          </Modal>
        )}
        {activeModal === 'create_session2' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <CreateSession2 setActiveModal={setActiveModal} />
          </Modal>
        )}
        {activeModal === 'recap' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <SessionResume setActiveModal={setActiveModal} />
          </Modal>
        )}
        {activeModal === 'session_published' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <SessionPublished setActiveModal={setActiveModal} />
          </Modal>
        )}
        {activeModal === 'modalWahine' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <ModalWahine setActiveModal={setActiveModal} />
          </Modal>
        )}
        {activeModal === 'wahineRegistrated' && (
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <RegisteredWahine setActiveModal={setActiveModal} />
          </Modal>
        )}
      </Router>
    </div>
  );
}

export default App;
