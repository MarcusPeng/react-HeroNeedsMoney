import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui/svg-icons/action/home';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import LinearProgress from 'material-ui/LinearProgress';

import './Battle.css';
import Start from '../start/Start';
import DataAccess from '../../dataAccess/DataAccess';
import boss1 from '../../images/boss1.png';

import {config} from '../../config.js';
const skill1 = require('../../images/' + config.skills.skill1.image);
const skill2 = require('../../images/' + config.skills.skill2.image);
const skill3 = require('../../images/' + config.skills.skill3.image);

class Battle extends Component {
	constructor(props) {
		super(props);
		this.dataAccess = new DataAccess();
		this.backToStart = this.backToStart.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.textChange = this.textChange.bind(this);
		this.dateChange = this.dateChange.bind(this);
		this.saveInput = this.saveInput.bind(this);
		this.useSkill = this.useSkill.bind(this);

		this.state = { 
			isGoStart: false,
			isOpenDialog: false,
			inputMoney: '',
			inputDate: '',
			bossHp: this.dataAccess.getBossHp(),
			actionPoint: this.dataAccess.getActionPoint(),
			targetMoney: this.dataAccess.getTargetMoney()
		};
	}

	backToStart() {
		this.setState({ isGoStart: true });
	}
	openDialog() {
		this.setState({ isOpenDialog: true });
	}
	closeDialog() {
		this.setState({ 
			isOpenDialog: false,
			inputMoney: '',
			inputDate: ''
		});
	}
	textChange(e) {
		this.setState({ inputMoney: e.target.value});
	}
	dateChange(e, date) {
		this.setState({ inputDate: date});
	}
	saveInput() {
		let inputItem = { "date": this.state.inputDate, "money": this.state.inputMoney };
		let msg = '';

		if (inputItem.date === '') {
			msg = 'please input date';
		}
		else if (inputItem.money === '') {
			msg = 'please input money';
		}

		if (msg === '') {

			//if inputMoney < 0 then add boss hp
			if (this.state.inputMoney < 0) {
				let tempPh = Number(this.state.bossHp) - Number(this.state.inputMoney);
				this.setState({bossHp: tempPh});
				this.dataAccess.setBossHp(tempPh);

				if (tempPh > Number(this.state.targetMoney)) {
					//let tempMoney = Number(this.state.targetMoney) - Number(this.state.inputMoney);
					this.setState({targetMoney: tempPh});
					this.dataAccess.setTargetMoney(tempPh);
				}
			}
			else {
				let ap = Number(inputItem.money) + Number(this.state.actionPoint);
				this.setState({actionPoint: ap});
				this.dataAccess.setActionPoint(ap);
			}
			
			this.dataAccess.addInput(inputItem);
			this.closeDialog();
		}
		else {
			alert(msg);
		}
	}

	useSkill(e) {
		let targetId = e.target.id;
		let skill;

		switch (targetId) {
			case "imgSkill1":
				skill = config.skills.skill1;
				break;
			case "imgSkill2":
				skill = config.skills.skill2;
				break;
			case "imgSkill3":
				skill = config.skills.skill3;
				break;
			default:
				break;
		}

		let actionPoint = this.state.actionPoint - skill.actionPoint;
		let bossHp = this.state.bossHp - skill.actionPoint;
		this.setState({actionPoint: actionPoint, bossHp: bossHp});
		this.dataAccess.setActionPoint(actionPoint);
		this.dataAccess.setBossHp(bossHp);
	}

	render() {
		let result;

		if (this.state.isGoStart) {
			result = <Start />;
		}
		else {
			let isSkill1Disabled = this.state.actionPoint < config.skills.skill1.actionPoint;
			let isSkill2Disabled = this.state.actionPoint < config.skills.skill2.actionPoint;
			let isSkill3Disabled = this.state.actionPoint < config.skills.skill3.actionPoint;
			const dialogActions = [
				<FlatButton label="cancel" secondary={true} keyboardFocused={false} onClick={this.closeDialog} />,
				<FlatButton label="ok" primary={true} keyboardFocused={false} onClick={this.saveInput} />
			];

			console.log(`Boss HP : ${this.state.bossHp} / ${this.state.targetMoney}`);

			result = 
				<div>
					<LinearProgress mode="determinate" max={Number(this.state.targetMoney)} value={Number(this.state.bossHp)} color="red" />
					<img src={boss1} alt="boss" />
					<br />
					<label>{`AP : ${this.state.actionPoint}`}</label>
					<div>
						<Toolbar style={config.styles.battle.Toolbar}>
							<ToolbarGroup>
								<IconButton 
									tooltip="home" 
									onClick={this.backToStart}
									style={config.styles.battle.iconButton}
									iconStyle={config.styles.battle.icon}>
									<HomeIcon />
								</IconButton>
								<IconButton 
									tooltip="add" 
									onClick={this.openDialog}
									style={config.styles.battle.iconButton}
									iconStyle={config.styles.battle.icon}>
									<AddCircleIcon />
								</IconButton>
								<ToolbarSeparator style={config.styles.battle.ToolbarSeparator} />
								<IconButton 
									tooltip="skill1" 
									onClick={this.useSkill}
									style={config.styles.battle.iconButton}
									iconStyle={config.styles.battle.icon}
									disabled={isSkill1Disabled}>
									<img src={skill1} alt="skill1" id="imgSkill1" className={isSkill1Disabled ? "Battle-iconDisabled" : ""}/>
								</IconButton>
								<IconButton 
									tooltip="skill2" 
									onClick={this.useSkill}
									style={config.styles.battle.iconButton}
									iconStyle={config.styles.battle.icon}
									disabled={isSkill2Disabled}>
									<img src={skill2} alt="skill2" id="imgSkill2" className={isSkill2Disabled ? "Battle-iconDisabled" : ""}/>
								</IconButton>
								<IconButton 
									tooltip="skill3" 
									onClick={this.useSkill}
									style={config.styles.battle.iconButton}
									iconStyle={config.styles.battle.icon}
									disabled={isSkill3Disabled}>
									<img src={skill3} alt="skill3" id="imgSkill3" className={isSkill3Disabled ? "Battle-iconDisabled" : ""}/>
								</IconButton>
							</ToolbarGroup>
						</Toolbar>
					</div>

					<Dialog 
						contentStyle={config.styles.battle.Dialog} 
						actions={dialogActions} 
						modal={true} 
						open={this.state.isOpenDialog} 
						onRequestClose={this.closeDialog}>
						
						<DatePicker 
							autoOk={true} 
							floatingLabelText="Date" 
							onChange={this.dateChange} />
						<TextField 
							hintText="10,000" 
							floatingLabelText="Money" 
							value={this.state.inputMoney} 
							onChange={this.textChange} 
							type="number" />
					</Dialog>
				</div>;
		}

		return(result);
	}
}

export default Battle;