import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import './Log.css';
import Start from '../start/Start';
import DataAccess from '../../common/DataAccess';
import {stringsLog} from '../../language/strings.js';

class Log extends Component {
  constructor() {
    super();
    this.state = {isGoStart: false};
    this.backToStart = this.backToStart.bind(this);
  }

  backToStart() {
    this.setState({isGoStart: true});
  }

  render() {
    let result;

    if (this.state.isGoStart) {
      result = <Start />;
    }
    else {
      const inputLog = new DataAccess().getInputLog(); 
      const config = JSON.parse(sessionStorage.getItem("config"));

      result = 
        <div className="Log-div">
            <Table height={`${config.h - 125}px`}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn className="Log-column-index">{stringsLog.thIndex}</TableHeaderColumn>
                  <TableHeaderColumn>{stringsLog.thDate}</TableHeaderColumn>
                  <TableHeaderColumn>{stringsLog.thMoney}</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} stripedRows={true} showRowHover={true}>
                {
                  inputLog.map((row, index) => {
                    return (
                    <TableRow key={index}>
                      <TableRowColumn className="Log-column-index">{index + 1}</TableRowColumn>
                      <TableRowColumn>{(new Date(row.date)).toLocaleDateString()}</TableRowColumn>
                      <TableRowColumn>{row.money}</TableRowColumn>
                    </TableRow>);
                  })
                }
              </TableBody>
            </Table>
          <RaisedButton className="Log-btn-back" label={stringsLog.btnBackLabel} onClick={this.backToStart} secondary={true} />
        </div>;
    }

    return result
  }
}

export default Log;