import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
     allClicked : [],
     xOrO : 'x',
     winCom : [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]],
     winData : {
        x : '',
        o : ''
    },
    columnData : {
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: ''
    },
    winningMsg : '',
    log: []
  }

  _elementClick(field) {
    let { columnData, xOrO, winData, allClicked, winningMsg, log} = this.state;
    const newLog = `${xOrO} clicked on ${Number(field)+1}`;
    if(allClicked.includes(Number(field)) || winningMsg.trim().length){
      // console.log(allClicked)
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
    log.push(newLog)
    this.setState({columnData, xOrO, allClicked, winData, log}, () => this._checkWinner())
  } 

  _reset = () => {
    const newLogger = [...this.state.log];
    newLogger.push('Game restart');
    this.setState({
      allClicked : [],
      xOrO : 'x',
      winData : {
          x : '',
          o : ''
      },
      columnData : {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: ''
      },
      winningMsg: '',
      log:newLogger
    })
  }

  _checkWinner = () => {
    // console.log(this.state)
    const { winData, winCom, allClicked, log } = this.state;
    if(allClicked.length > 8) {
      this.setState({winningMsg:'Tie Start Again'});
      log.push('Game Ties');
    }
    winCom.forEach(each => {
      if(each.every(elem => winData.x.includes(elem))) {
        this.setState({winningMsg: 'X is winner'})
        log.push('X wins');
        return;
      } else if (each.every(elem => winData.o.includes(elem))) {
        this.setState({winningMsg:'O is winner'})
        log.push('O wins');
        return;
      }
    })
    this.setState({log})
  }

  render() {
    const { columnData, log } = this.state;
    let logs = '';
    if (log.length) {
      logs = log.map(each => {
        return <li key={Math.random()}>{each}</li>
      })
    }
    return (
      <div className="App">
        <div>
          <h1>Tic Tac Toe</h1>
          <h2>{this.state.xOrO}'s turn</h2>
          <div className="container">
              <div onClick={() => this._elementClick('0')}>{columnData['0']}
              </div>
              <div onClick={() => this._elementClick('1')}>{columnData['1']}
              </div>
              <div onClick={() => this._elementClick('2')}>{columnData['2']}
              </div>
              <div onClick={() => this._elementClick('3')}>{columnData['3']}
              </div>
              <div onClick={() => this._elementClick('4')}>{columnData['4']}
              </div>
              <div onClick={() => this._elementClick('5')}>{columnData['5']}
              </div>
              <div onClick={() => this._elementClick('6')}>{columnData['6']}
              </div>
              <div onClick={() => this._elementClick('7')}>{columnData['7']}
              </div>
              <div onClick={() => this._elementClick('8')}>{columnData['8']}
              </div>
          </div>
          <h1>{this.state.winningMsg}</h1>
          <button onClick={this._reset}>Restart</button>
        </div>
        <div className='log'> 
          <h1>Log of the game</h1>
          <ul>
            {logs}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
