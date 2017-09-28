import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {login: '', password: ''};
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.loginAction(this.state);
  }

  render() {
    return (
      <div className = 'header-wrapper'>
        <form onSubmit={this.handleSubmit}>
          <label className = 'header-label'>
            LOGIN:
            <input className = 'header-input' type="text" name = "login" value={this.state.login} onChange={this.handleChange} />
          </label>
          <label className = 'header-label'>
            PASSWORD:
            <input className = 'header-input' type="password" name = "password" value={this.state.pass} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <span className = 'logged-user'>{this.props.isLogin ? 'ADMIN' : 'NOT LOGGED'}</span>
      </div>
    );
  }
}

export default Header;
