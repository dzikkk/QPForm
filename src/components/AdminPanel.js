import React, { Component } from 'react';
import './AdminPanel.css';

class AdminPanel extends Component {
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

  renderForm = (prev, next, idx) => {
    const { name, email, policyid, claimType, claimAmount, dateOccurred } = next;
    const key = idx + 'form_element';
    return prev.concat(
      (<div className = 'form-list-element' key = {key}>
        <div className = 'form-list-data'>
          <span>`Mr./Mrs. {name}, e-mail: {email}, PolicyID: {policyid}, date: {dateOccurred}`</span>
          <span>`Claims {claimAmount}$ due to {claimType}`</span>
        </div>
        <div className = 'form-list-buttons'>
          <div className = 'accept-button button'> ACCEPT </div>
          <div className = 'decline-button button'> DECLINE </div>
        </div>
      </div>)
    );
  }

  renderFormsList = (items) => {
    if (Array.isArray(items)) {
      return items.reduce(this.renderForm, []);
    } else {
      return [];
    }
  }

  render() {
    const { formsList } = this.props;
    return (
      <div className = 'forms-list'>
        {this.renderFormsList(formsList)}
      </div>
    );
  }
}

export default AdminPanel;
