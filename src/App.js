import React from 'react';
import logo from './logo.svg';
import './App.css';
import {withApollo} from 'react-apollo'
import gpl from 'graphql-tag'


const GET_USER = gpl`query{
  profesores{
    _id
    name
    curso
    alumnos{
     name
      _id
    }
  }
}
`
class App extends React.Component {
  componentDidMount = async() =>{
    const {client} = this.props;
    console.log("Aqui")
    const resp = await client.query({
      query: GET_USER
    })
    console.log(resp) 
  } 
   
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  } 
  
}

export default withApollo(App);
