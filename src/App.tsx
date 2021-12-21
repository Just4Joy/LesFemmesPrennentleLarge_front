import './App.scss';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Sessions from './components/Sessions/Sessions';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalClass, setModalClass] = useState<string>('__hiddenModal');
  const [overlayClass, setOverlayClass] = useState<string | ''>('');

  useEffect(() => {
    if (isOpen) {
      setModalClass('__showModal');
      setOverlayClass('__showOverlay');
    } else {
      setModalClass('__hiddenModal');
      setOverlayClass('');
    }
  }, [isOpen]);

  return (
    <div className="App">
      <Router>
        <div className="App__page">
          <Header setIsOpen={setIsOpen} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Home />} />
          </Routes>
          <Footer />
        </div>

        {/* Modal */}
        <div className={`App${overlayClass}`}></div>
        <div className={`App${modalClass}`}>
          <h2>Hello</h2>
        </div>
      </Router>
    </div>
  );
}

export default App;
