import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './Setting.css';
import Battle from '../battle/Battle';
import Start from '../start/Start';
import DataAccess from '../../dataAccess/DataAccess';

const defaultTarget = 10000;

class Setting extends Component{
	constructor(props) {
		super(props);
		this.state = { 
			targetMoney: '',
			action:''
		};

		this.start = this.start.bind(this);
		this.cancel = this.cancel.bind(this);
		this.textChange = this.textChange.bind(this);
	}

	start() {
		let targetMoney = this.state.targetMoney;

		if (Number(targetMoney) >= defaultTarget){
			const dataAccess = new DataAccess();
			dataAccess.initialData();
			dataAccess.setTargetMoney(targetMoney);
			this.setState({ action: "start" });
		}
		else {
			alert(`Target need to bo greater than ${defaultTarget}.`);
			this.setState({ targetMoney: ''});
		}
	}

	cancel() {
		this.setState({ action: "cancel" });
	}

	textChange(e) {
		this.setState({ targetMoney: e.target.value});
	}

	render() {
		let result;
		
		if (this.state.action === 'start'){
			result = <Battle />;
		}
		else if (this.state.action === 'cancel') {
			result = <Start />;
		}
		else {
			result = 
				<div>
					<TextField 
						hintText="10,000" 
						floatingLabelText="Target Money" 
						value={this.state.targetMoney} 
						onChange={this.textChange}
						type="number" 
						min={defaultTarget} />
					<br />
					<RaisedButton label="cancel" onClick={this.cancel} secondary={true} className="Setting-button" />
					<RaisedButton label="start" onClick={this.start} primary={true} className="Setting-button" />
				</div>;
		}

		return(result);
	}
}

export default Setting;