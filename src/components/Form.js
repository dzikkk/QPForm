import React, { Component } from 'react';
import './Form.css';

const CLAIM_TYPE = ['Lost Baggage', 'Theft', 'Missed Flight', 'Illness', 'Accident'];

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      policyid: '',
      claimType: '',
      claimAmount: '',
      dateOccurred: ''
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitFormAction(this.state);
  }

  generateOptions = (prev, curr) => {
    return prev.concat((<option value = {curr}>{curr}</option>))
  }

  render() {
    return (
      <div className = 'form-wrapper'>
        <form onSubmit={this.handleSubmit}>
          <label className = 'form-label'>
            <span>Name:</span>
            <input className = 'form-input' type="text" name = "name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label className = 'form-label'>
            <span>E-mail:</span>
            <input className = 'form-input' type="email" name = "email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label className = 'form-label'>
            <span>Policy ID:</span>
            <input className = 'form-input' type="text" name = "policyid" value={this.state.policyid} onChange={this.handleChange} />
          </label>
          <label className = 'form-label'>
            <span>Claim Type:</span>
            <select className = 'form-input' type="text" name = "claimType" value={this.state.claimType} onChange={this.handleChange}>
              {CLAIM_TYPE.reduce(this.generateOptions, [])}
            </select>
          </label>
          <label className = 'form-label'>
            <span>Claim Ammount:</span>
            <input className = 'form-input' type="number" name = "claimAmount" value={this.state.claimAmount} onChange={this.handleChange} />
          </label>
          <label className = 'form-label'>
            <span>Date Occurred:</span>
            <input className = 'form-input' type="date" name = "dateOccurred" value={this.state.dateOccurred} onChange={this.handleChange} />
          </label>
          <input className = 'form-submit' type="submit" value="Upload Form" />
        </form>
      </div>
    );
  }
}

export default Form;
