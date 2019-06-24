import React, { PropTypes } from 'react';
import PokemonForm from './PokemonForm';
import { PokemonsList } from './PokemonsList';
import update from 'immutability-helper';
import Pokemon from './Pokemon';
import $ from 'jquery';


export default class Pokemons extends React.Component {
  static propTypes = {
    pokemons: PropTypes.array.isRequired
  }

  static defaultProps = {
    pokemons: []
  }

  constructor (props, railsContext) {
    super(props)
    this.state = {
      pokemons: this.props.pokemons,
      ps: this.props.pokemons,
      currentPage: 1,
      psPerPage: 3
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  delete(id){
      var newPokemons = this.state.pokemons.filter((p) => p.id !== id)
      this.setState({
        pokemons: newPokemons
      })
    }

    deletePokemon(id){
      fetch(`http://localhost:3001/pokemons/${this.props.match.params.id}`,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => { 
        this.delete(this.props.match.params.id)
      });
    
  }

  componentDidMount () {
    if(this.props.match) {
      $.ajax({
        type: "GET",
        url: 'http://localhost:3001/pokemons',
        dataType: "JSON"
      }).done((data) => {
        console.log(data.data)
        var realData = data.data;
        this.setState({pokemons: realData});
      }).fail((response) => {
        if(response.status === 401) {
          console.log('unauth');
        }
      });
    }
  }


  addNewPokemon = (pokemon) => {
    this.setState(update(this.state.pokemons,
      {$push: [pokemon]} ));
  }

  render () {
    //console.log(this);
    //console.log(this.state.pokemons)
    //this.state.pokemons.map((e,index)=>{console.log(e.attributes)});
   // console.log(this.state.pokemons[0]);
    const {ps, currentPage, psPerPage } = this.state
    const list=[];
    /*
    const indexOfLastPokemon = currentPage * psPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - psPerPage;
    const currentPokemons = this.state.pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const renderPokemons = currentPokemons.map((p, index) => {
      return <li key={index}>{p}</li>;
    });
    const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.pokemons.length / psPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        });

        return (
          <div>
            <ul>
              {renderPokemons}
            </ul>
            <ul id="page-numbers">
              {renderPageNumbers}
            </ul>
          </div>
        );
      }  
    return (
      <div>
        <PokemonForm handleNewPokemon={this.addNewPokemon} />
        {
          this.state.pokemons.map((e,index)=>
            <div>
              <strong>Name:</strong> {e.attributes.name}<br/>
              <strong>Region: </strong> {e.attributes.region}<br/>
              <button onClick={this.deletePokemon(e.id)}> Delete
              </button>
              -------------------------------------------------
            </div>        
          )
        }
      </div>
    )
    */
    return (
      <div>
        <PokemonForm handleNewPokemon={this.addNewPokemon} />
        {
          this.state.pokemons.map((e,index)=>
            <div>
              <strong>Name:</strong> {e.attributes.name}<br/>
              <strong>Region: </strong> {e.attributes.region}<br/>
              <button onClick={this.deletePokemon(e.id)}> Delete
              </button>
              -------------------------------------------------
            </div>        
          )
        }
      </div>
    )
  }
}