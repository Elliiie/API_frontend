import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pokemons: []
    }
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3001/pokemons'
    }).done(data => {
      this.setState({pokemons: data});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Pokedex </h2>
        </div>
        <div className="App-intro">
          {this.state.pokemons.map(pokemon => {
            return(<p key={pokemon.id}>{pokemon.title}</p>);
          })
          }
        </div>
      </div>
    );  
  }
}

export default App;