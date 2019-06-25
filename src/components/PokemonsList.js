import React, { PropTypes } from 'react';
import Pokemon from './Pokemon';
import $ from 'jquery';

export default class PokemonsList extends React.Component {

  state = {
    pokemons: null,
    total: null,
    per_page: null,
    current_page: 1
  }


  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }


  makeHttpRequestWithPage = async pageNumber => {
    const response = await fetch(`http://localhost:3001/pokemons?page=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    this.setState({
      pokemons: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page
    });
  }


  render() {

    let pokemons, renderPageNumbers;

    if (this.state.pokemons !== null) {
      pokemons = this.state.pokemons.map(p => (
        <tr key={p.id}>
          <td>{p.id}</td>
          <td>{p.attributes.name}</td>
          <td>{p.attributes.region}</td>
        </tr>
      ));
    }

    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
        pageNumbers.push(i);
      }


      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.current_page === number;

        return (
          <span key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>
        );
      });
    }

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Pokemon Name</th>
              <th>Pokemon Region</th>
            </tr>
          </thead>
          <tbody>
            {pokemons}
          </tbody>
        </table>


        <div>
          <span onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
          {renderPageNumbers}
          <span onClick={() => this.makeHttpRequestWithPage(1)}>&raquo;</span>
        </div>

      </div>
    );
  }

}