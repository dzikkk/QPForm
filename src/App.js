import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import AdminPanel from './components/AdminPanel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formsList: [],
      isLogin: false,
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  submitForm = (form) => {
    form.accepted = false;
    this.setState({formsList: this.state.formsList.concat(form)});
  }

  handleLogin = (loginCredentials) => {
    this.setState({isLogin: !this.state.isLogin});
  }

  editForms = (element, action) => {
    console.log(element);
  }

  render() {
    const {isLogin, formsList} = this.state;
    return (
      <div className="App">
        <Header isLogin = {isLogin} loginAction = {this.handleLogin}/>
        {!isLogin
          ? <Form submitFormAction = {this.submitForm}/>
          : <AdminPanel formsList = {formsList} modifyAction = {this.editForms}/>}
      </div>
    );
  }
}

export default App;
