import React, { PropTypes } from 'react';
import Pokemon from './Pokemon';
import $ from 'jquery';


export const PokemonsList = ({pokemons}) => 
	//
	<div>
    {pokemons.map(function(pokemon) {
      return (
        <Pokemon pokemon={pokemon} key={pokemon.id} />
      )
    })}
	</div>

PokemonsList.propTypes = {
  pokemons: PropTypes.array.isRequired
}

PokemonsList.defaultProps = {
  pokemons: []
}