import React from 'react';
import Dashboard from './components/Dashboard';
import './styles/main.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Dashboard />
    </div>
  );
};

export default App;