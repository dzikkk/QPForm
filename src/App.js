import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formsList: [],
      isLogin: false,
    };

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm = (form) => {
    this.setState({formsList: this.state.formsList.concat(form)});
  }

  render() {
    console.log(this.state.formsList);
    return (
      <div className="App">
        <Header isLogin = {false} loginAction = {this.handleLogin}/>
        <Form submitFormAction = {this.submitForm}/>
      </div>
    );
  }
}

export default App;
