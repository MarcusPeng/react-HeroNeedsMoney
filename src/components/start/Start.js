import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import './Start.css';
import logo from '../../images/logo.svg';
import DataAccess from '../../common/DataAccess';
import Setting from '../setting/Setting';
import Battle from '../battle/Battle';
import Log from '../log/Log';
import {stringsStart} from '../../language/strings.js';

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
    let element = e.target;
    while (element.nodeName.toLowerCase() !== "button") {
      element = element.parentElement;
    }
    let action = element.id;
    this.setState({ action: action });
  }

  render(){
    let result;

    switch(this.state.action) {
      case 'newGame':
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
            <h2>{stringsStart.title}</h2>
            <RaisedButton label={stringsStart.newGame} onClick={this.btnClick} className="Start-btn" id="newGame" />
            <br /><br />
            <RaisedButton label={stringsStart.continue} onClick={this.btnClick} className="Start-btn" id="continue" disabled={this.state.isContinueDisabled} />
            <br /><br />
            <RaisedButton label={stringsStart.log} onClick={this.btnClick} className="Start-btn" id="log" disabled={this.state.isLogDisabled} />
          </div>;
        break;
    }

    return(result);
  }
}

export default Start;