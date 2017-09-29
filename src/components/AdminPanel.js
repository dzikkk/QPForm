import classNames from 'classnames';
import React, { Component } from 'react';
import './AdminPanel.css';

class AdminPanel extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  componentWillUnmount() {
    this.props.removeData();
  }

  resolveFormAction = (formStatus, id) => {
    this.props.changeFormStatus(formStatus, id);
  }

  renderForm = (prev, next, idx) => {
    const { name, email, policyid, claimType, claimAmount, dateOccurred, formStatus, changeFormStatus,  _id } = next;
    const key = _id;
    const buttonPanelClasses = classNames({
      'hide-button': formStatus !== '',
    }, 'form-list-buttons');

    const formListClasses = classNames({
      'accepted-form': formStatus === 'accept',
      'declined-form': formStatus === 'declined',
    }, 'form-list-element');
    return prev.concat(
      (<div className = {formListClasses} key = {key}>
        <div className = 'form-list-data'>
          <span>Mr./Mrs. {name}, e-mail: {email}, PolicyID: {policyid}, date: {dateOccurred}</span>
          <span>Claims {claimAmount}$ due to {claimType}</span>
        </div>
        <div className = {buttonPanelClasses}>
          <div
            className = 'button accept-button'
            onClick = {() => this.resolveFormAction('accept', _id)}>
            ACCEPT
          </div>
          <div
            className = 'button decline-button'
            onClick = {() => this.resolveFormAction('declined', _id)}>
            DECLINE
          </div>
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

AdminPanel.defaultProps = {
  fetchData: () => {},
  removeData: () => {}
};

export default AdminPanel;
