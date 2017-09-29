import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import AdminPanel from './components/AdminPanel';
const NODE_URL = 'http://127.0.0.1:3001'

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

  componentDidMount() {
    fetch(NODE_URL + '/init', {method: "GET"})
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        this.setState({formsList: data});
      }
    }).catch(err => console.log(err))
  }

  submitForm = (form) => {
    form.accepted = false;
    this.setState({formsList: this.state.formsList.concat(form)});
  }

  handleLogin = (loginCredentials) => {
    if (this.state.isLogin) {
      this.setState({isLogin: false});
    } else {
      fetch(NODE_URL+'/login', {
        method: 'post',
        body: JSON.stringify({
          login: loginCredentials.login,
          password: loginCredentials.password,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(loginSuccess => {
        this.setState({isLogin: loginSuccess});
      }).catch(err => console.log(err))
    }
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
