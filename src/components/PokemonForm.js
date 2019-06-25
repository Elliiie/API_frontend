import React, { PropTypes } from 'react';
import update from 'immutability-helper';
import $ from 'jquery';

export default class PokemonForm extends React.Component {

  static propTypes = {
    handleNewPokemon: PropTypes.func
  }

  constructor (props, railsContext) {
    super(props)
    this.state = {
      name: {value: '', valid: false},
      level: {value: null, valid: false},
      primary_type: {value: '', valid: false},
      secondary_type: {value: '', valid: false},
      trainer_name: {value: '', valid: false},
      hight: {value: null, valid: false},
      weight: {value: null, valid:false},
      gender: {value:'', valid:false},
      region: {value:'', valid: false},
      formValid: false,
      editing: false
    }
  }

  componentDidMount () {
    if(this.props.match) {
      $.ajax({
        type: "GET",
        url: `http://localhost:3001/pokemons/${this.props.match.params.id}`,
        dataType: "JSON"
      }).done((data) => {
        this.setState({
          name: {value: data.name, valid: true},
          level: {value: data.level, valid: true},
          primary_type: {value: data.primary_type, valid: true},
          secondary_type: {value: data.secondary_type, valid: true},
          trainer_name: {value: data.trainer_name, valid: true},
          hight: {value: data.hight, valid: true},
          weight: {value: data.weight, valid:true},
          gender: {value: data.gender, valid:true},
          region: {value: data.region, valid: true},
          editing: this.props.match.path === '/pokemons/:id/edit'
        });
      });
    }
  }

  validateField (fieldName, fieldValue, validations) {
    let fieldValid;

    let fieldErrors = validations.reduce((errors, v) => {
      let e = v(fieldValue);
      if(e !== '') {
        errors.push(e);
      }
      return(errors);
    }, []);

    fieldValid = fieldErrors.length === 0;

    const newFieldState = update(this.state[fieldName],
      {valid: {$set: fieldValid}});

    const newFormErrors = update(this.state.formErrors,
      {$merge: {[fieldName]: fieldErrors}});

    this.setState({[fieldName]: newFieldState,
      formErrors: newFormErrors}, this.validateForm);
  }

  validateForm () {
    this.setState({formValid: this.state.name.valid &&
                              this.state.level.valid &&
                              this.primary_type.valid &&
                              this.secondary_type.valid &&
                              this.trainer_name.valid &&
                              this.hight.valid &&
                              this.weight.valid &&
                              this.gender.valid &&
                              this.region.valid});
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.state.editing ?
      this.updatePokemon() :
      this.addPokemon();
  }

  updatePokemon () {
    const pokemon = {name: this.state.name.value,
                         level: this.state.level.value,
                         primary_type: this.state.primary_type.value,
                         secondary_type: this.state.secondary_type.value,
                         trainer_name: this.state.trainer_name.value,
                         hight: this.state.hight.value,
                         weight: this.state.weight.value,
                         gender: this.state.gender.value,
                         region: this.state.region.value
                       };
    $.ajax({
      type: "PATCH",
      url: `http://localhost:3001/pokemons/${this.props.match.params.id}`,
      data: {pokemon: pokemon}
    })
    .done((data) => {
      console.log('pokemon updated!');
      this.resetFormErrors();
    })
    .fail((response) => {
      this.setState({formErrors: response.responseJSON,
                      formValid: false});
    });
  }

  addPokemon =()=> {
    const props = this.props;
    console.log(this.state)

    fetch('http://localhost:3001/pokemons',{
      method:'POST',
      cors:'no-cors',
      headers: {
        'Content-type' : 'application/json'
      },
      body:JSON.stringify(this.state)
    });
  }

  handleChange = (e)=>{
    this.setState({[e.target.name]:e.target.value});
        console.log(this.state)

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
  /*
  deletePokemon = () => {
    if(window.confirm("Are you sure you want to delete this pokemon?")) {
      fetch(`http://localhost:3001/pokemons/${this.props.match.params.id}`,{
        method:'DELETE'
      });
      /*$.ajax({
        type: "DELETE",
        url: `http://localhost:3001/pokemons/${this.props.match.params.id}`
      })
      .done((data) => {
        this.props.history.push('/');
        this.resetFormErrors();
      })
      .fail((response) => {
        console.log('pokemon deleting failed!');
      });
    }
  }*/

  resetFormErrors () {
    this.setState({formErrors: {}})
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <h2>
          {this.state.editing ?
            'Update pokemon' :
            'Make a new pokemon' }
         </h2>
        <form onSubmit={this.handleFormSubmit}>
          <input name='name' placeholder='Pokemon name'
            defaultValue={this.state.name.value}
            onChange={this.handleChange} /><br></br><br></br>
          <input name='level' placeholder='Pokemon level'
            defaultValue={this.state.level.value}
            onChange={this.handleChange} /><br></br><br></br>
          <input name='primary_type' placeholder='Pokemon primary type'
            defaultValue={this.state.primary_type.value}
            onChange={this.handleChange} /><br></br><br></br>
          <input name='secondary_type' placeholder='Pokemon secondary type'
            defaultValue={this.state.secondary_type.value}
            onChange={this.handleChange} /><br></br><br></br>
          <input name='trainer_name' placeholder='Pokemon trainer name'
            defaultValue={this.state.trainer_name.value}
            onChange={this.handleChange} /><br></br><br></br>
          <input name='hight' placeholder='Pokemon hight'
            defaultValue={this.state.hight.value}
            onChange={this.handleChange} /><br></br><br></br>
          <input name='weight' placeholder='Pokemon weight'
            defaultValue={this.state.weight.value}
            onChange={this.handleChange} /><br></br><br></br>
          <input name='gender' placeholder='Pokemon gender'
            defaultValue={this.state.gender.value}
            onChange={this.handleChange} /><br></br><br></br>
           <input name='region' placeholder='Pokemon region'
            defaultValue={this.state.region.value}
            onChange={this.handleChange} /><br></br><br></br>
          <input type='submit'
            defaultValue={this.state.editing ?
                    'Update Pokemon' :
                    'Make Pokemon'}
            className='submit-button'/>
        </form>
        {this.state.editing && (
          <p>
            <button onClick={this.deletePokemon}>
              Delete pokemon
            </button>
          </p>
        )
        }
      </div>
    )
  }
}
