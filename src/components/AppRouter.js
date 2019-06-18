import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Pokemons from './Pokemons';
import Pokemon from './Pokemon';
import PokemonForm from './PokemonForm';

export default (props) => {
	return (
		<Router>
			<div>
				<Route exact path="/" component={Pokemons} />
				<Route exact path="/pokemons/:id" component={Pokemon} />
				<Route path="/pokemons/:id/edit" component={PokemonForm} />
			</div>
		</Router>
	)
}