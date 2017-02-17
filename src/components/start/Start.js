import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import './Start.css';
import logo from '../../images/logo.svg';
import DataAccess from '../../common/DataAccess';
import Setting from '../setting/Setting';
import Battle from '../battle/Battle';
import Log from '../log/Log';

class Start extends Component{
  constructor(props) {
    super(props);

    const dataAccess = new DataAccess();
    let isSetTargetMoney = dataAccess.isSetTargetMoney();

    this.state = { 
      action: '', 
      isContinueDisabled: (!isSetTargetMoney || (Number(dataAccess.getBossHp()) <= 0)),
      isLogDisabled: !isSetTargetMoney
    };

    // This binding is necessary to make `this` work in the callback
    this.btnClick = this.btnClick.bind(this);
  }

  btnClick(e){
    let action = e.target.innerText.toLowerCase();
    this.setState({ action: action });
  }

  render(){
    let result;

    switch(this.state.action) {
      case 'new game':
        result = <Setting />;
        break;

      case 'continue':
        result = <Battle />;
        break;

      case 'log':
        result = <Log />;
        break;

      default:
        result = 
          <div>
            <img src={logo} className="Start-logo" alt="logo" />
            <br />
            <h2>Hero Needs Money</h2>
            <RaisedButton label="new game" onClick={this.btnClick} className="Start-btn" />
            <br /><br />
            <RaisedButton label="continue" onClick={this.btnClick} className="Start-btn" disabled={this.state.isContinueDisabled} />
            <br /><br />
            <RaisedButton label="log" onClick={this.btnClick} className="Start-btn" disabled={this.state.isLogDisabled} />
          </div>;
        break;
    }

    return(result);
  }
}

export default Start;