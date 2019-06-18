import React, { PropTypes } from 'react';
import PokemonForm from './PokemonForm';
import { PokemonsList } from './PokemonsList';
import update from 'immutability-helper';
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
      pokemons: this.props.pokemons
    }
  }

  componentDidMount () {
    if(this.props.match) {
      $.ajax({
        type: "GET",
        url: 'http://localhost:3001/pokemons',
        dataType: "JSON"
      }).done((data) => {
        this.setState({pokemons: data});
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
    return (
      <div>
        <PokemonForm handleNewPokemon={this.addNewPokemon} />
        <PokemonsList pokemons={this.state.pokemons} />
      </div>
    )
  }
}