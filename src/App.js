import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleMap from "./SimpleMap";
import PlantForm from "./PlantForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Plants!</h1>
            <h2>Planning your garden</h2>
        </header>
          <PlantForm/>
          <SimpleMap/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
