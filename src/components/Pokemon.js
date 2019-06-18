import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default class Pokemon extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pokemon: props.pokemon
    }
  }

  static propTypes = {
    pokemon: PropTypes.object.isRequired
  }

  static defaultProps = {
    pokemon: {}
  }

  componentDidMount () {
    if(this.props.match) {
      $.ajax({
        type: "GET",
        url: `http://localhost:3001/pokemons/${this.props.match.params.id}`,
        dataType: "JSON"
      }).done((data) => {
        this.setState({pokemon: data});
      });
    }
  }

  render () {
    return (
      <div className='pokemon'>
        <Link to={`/pokemons/${this.state.pokemon.id}`} >
          <h3>{this.state.pokemon.name}</h3>
        </Link>
        <p>{(this.state.pokemon.region)}</p>
        <Link to={`/pokemons/${this.state.pokemon.id}/edit`} >
          Edit
        </Link>
      </div>
     )
  }
}