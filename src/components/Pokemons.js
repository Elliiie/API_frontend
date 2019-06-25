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
      page_number: 1
    }
  }

  componentDidMount () {
    if(this.props.match) {
      $.ajax({
        type: "GET",
        url: 'http://localhost:3001/pokemons?page=1',
        crossDomain: true,
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


  nextPage() {
    if(this.props.match) {
      $.ajax({
        type: "GET",
        url: `http://localhost:3001/pokemons?page=${this.state.page_number}`,
        crossDomain: true,
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

  deletePokemon=(id)=>{
    $.ajax({
      type:"DELETE",
      url: `http://localhost:3001/pokemons/` + id,
      dataType:"json",
     crossDomain: true,
    }).done((data) => {
      console.log("vliza")
      let pokemons = this.state.pokemons.filter((p) => {
          return id !== p.id;
      });
      this.setState(state => {
          state.pokemons = pokemons;
          return state;
      });
    }).fail((response) => {
        if(response.status === 401) {
          console.log('unauth');
        }
      });
  } 
  /*
    fetch(`http://localhost:3001/pokemons/${id}` ,{
      method:'DELETE',
      crossDomain: true,
      mode: 'cors',
      dataType: 'jsonp'
    }).then((data) => {
      console.log("vliza")
            let pokemons = this.state.pokemons.filter((p) => {
                return id !== p.id;
            });

            this.setState(state => {
                state.pokemons = pokemons;
                return state;
            });
        })
        .catch((err) => {
            console.log("vlizaaaa")
            console.error('err', err);
        });
    }
    */

   changeNextPage=()=>{
    this.setState(state=>({page_number:state.page_number+1}),()=>{
      console.log(this.state.page_number)
      this.nextPage()
    });
    
   } 

   changePrevPage=()=>{
    this.setState(state=>({page_number:state.page_number-1}),()=>{
      console.log(this.state.page_number)
      this.nextPage()
    });
    
   } 

  addNewPokemon = (pokemon) => {
    this.setState(update(this.state.pokemons,
      {$push: [pokemon]} ));
  }

  render () {
    const list=[];
    return ( 
        <div>
        <PokemonForm handleNewPokemon={this.addNewPokemon} />
        {
          this.state.pokemons.map((e,index)=>
            <div>
            <br/>
              <strong>Name:</strong> {e.attributes.name}<br/>
              <strong>Region: </strong> {e.attributes.region}<br/>
              <button onClick={()=>{this.deletePokemon(e.id)}}> Delete
              </button><br/>
              -------------------------------------------------
            </div>        
          )
        }
        <button onClick={this.changeNextPage}> NEXT PAGE </button><br/>
        <br/>
        <button onClick={this.changePrevPage}> PREV PAGE </button><br/>
      </div>
    )
  }
}