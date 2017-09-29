import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import AdminPanel from './components/AdminPanel';
import { updateFormStatus } from './utils';
const NODE_URL = 'http://127.0.0.1:3001'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formsList: [],
      isLogin: false,
      loginError: null,
    };

    this.changeFormStatus = this.changeFormStatus.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.removeData = this.removeData.bind(this);
  }

  removeData = () => {
    this.setState({formsList: []})
  }

  fetchData = () => {
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
        loginSuccess
          ? this.setState({isLogin: loginSuccess, loginError: null})
          : this.setState({loginError: 'Incorrect Credentials'});
      }).catch(err => console.log(err))
    }
  }

  changeFormStatus = (formStatus, id) => {
    fetch(NODE_URL+'/resolveForm', {
      method: 'post',
      body: JSON.stringify({
        formStatus: formStatus,
        id: id,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(newForm => {
      const forms = this.state.formsList;
      this.setState({formsList: updateFormStatus(forms, newForm._id, newForm)});
    }).catch(err => console.log(err))
  }

  render() {
    const {isLogin, formsList, loginError} = this.state;
    return (
      <div className="App">
        <Header
          errors = {loginError}
          isLogin = {isLogin}
          loginAction = {this.handleLogin} />
        {!isLogin
          ? <Form submitFormAction = {this.submitForm}/>
          : <AdminPanel
            fetchData = {this.fetchData}
            formsList = {formsList}
            removeData = {this.removeData}
            changeFormStatus = {this.changeFormStatus}/>
          }
      </div>
    );
  }
}

export default App;
