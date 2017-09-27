import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {login: '', password: ''};
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    console.log('submit');
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
            <input className = 'header-input' type="text" name = "password" value={this.state.pass} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <span className = 'logged-user'>{this.props.isAdmin ? 'ADMIN' : 'NOT LOGGED'}</span>
      </div>
    );
  }
}

export default Header;
