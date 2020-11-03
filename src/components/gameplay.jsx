import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clickElement, reset } from '../redux/actions/tic-tac-toe-action-creator';

//components
import Logger from './logger';

class Gameplay extends Component {

  _elementClick(field) {
      let { columnData, xOrO, winData, allClicked, winningMsg, log} = this.props;
      const newLog = `${xOrO} clicked on ${Number(field)+1}`;
      if(allClicked.includes(Number(field)) || winningMsg.trim().length){
        return;
      }
      columnData[field] = xOrO;
      if(xOrO === 'x') {
        xOrO = 'o';
        winData.x = winData.x.concat(field);
      } else {
        xOrO = 'x'
        winData.o = winData.o.concat(field);
      }
      allClicked.push(Number(field));
      log.push(newLog);
      this._checkWinner(winData, allClicked, log, xOrO, winningMsg)
  } 

  _checkWinner = (winData, allClicked, log, xOrO, winningMsg) => {
      const { winCom } = this.props;
      winCom.forEach(each => {
        if(each.every(elem => winData.x.includes(elem))) {
          winningMsg = 'X is winner';
          log.push('X wins');
          allClicked = [];
          return;
        } else if (each.every(elem => winData.o.includes(elem))) {
          winningMsg = 'O is winner';
          log.push('O wins');
          allClicked = [];
          return;
        }
      });
      if(allClicked.length > 8) {
          winningMsg = 'Tie Start Again';
          log.push('Game Ties');
          allClicked = [];
      }
      const data = {
          winData : winData,
          allClicked : allClicked,
          log : log,
          xOrO : xOrO,
          winningMsg: winningMsg
      }
      this.props.elementClick(data);
  }

  render() {
    const { log } = this.props;
    let logs = '';
    if (log.length) {
      logs = log.map(each => {
          return <li key={Math.random()}>{each}</li>
      })
      }
    return (
        <div style={{display:'flex', flexDirection:'row'}}>
            <div>
            <h1>Tic Tac Toe</h1>
            <h2>{this.props.xOrO}'s turn</h2>
            <div className="container">
                <div onClick={() => this._elementClick('0')}>{this.props.columnData['0']}
                </div>
                <div onClick={() => this._elementClick('1')}>{this.props.columnData['1']}
                </div>
                <div onClick={() => this._elementClick('2')}>{this.props.columnData['2']}
                </div>
                <div onClick={() => this._elementClick('3')}>{this.props.columnData['3']}
                </div>
                <div onClick={() => this._elementClick('4')}>{this.props.columnData['4']}
                </div>
                <div onClick={() => this._elementClick('5')}>{this.props.columnData['5']}
                </div>
                <div onClick={() => this._elementClick('6')}>{this.props.columnData['6']}
                </div>
                <div onClick={() => this._elementClick('7')}>{this.props.columnData['7']}
                </div>
                <div onClick={() => this._elementClick('8')}>{this.props.columnData['8']}
                </div>
            </div>
            <h1>{this.props.winningMsg}</h1>
            <button onClick={() => this.props.resetData()}>Restart</button>
            </div>
            <Logger log={logs}/>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        columnData : state.reducer.columnData,
        xOrO : state.reducer.xOrO,
        winningMsg : state.reducer.winningMsg,
        winData : state.reducer.winData,
        allClicked : state.reducer.allClicked,
        log : state.reducer.log,
        winCom : state.reducer.winCom
    }
}

const mapDispatchToProps = dispatch => {
    return {
        elementClick : (newData) => dispatch(clickElement(newData)),
        resetData : () => dispatch(reset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gameplay);