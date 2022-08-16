import React from 'react';
import Layout from './features/Layout';
import Board from './features/Board';
import './App.css';

function App() {
  return (
    <div className="App">
      <Layout>
        <Board />
      </Layout>
    </div>
  );
}

export default App;
