import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearLog } from '../redux/actions/tic-tac-toe-action-creator';

class Logger extends Component {
    render() {
        return (
            <div>
                <div className='log'> 
                <h1>Log of the game</h1>
                <ul>
                    {this.props.log}
                </ul>
                </div>
                <button onClick={this.props.clearLogs}>Clear Log</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return  {
        clearLogs : () => dispatch(clearLog())
    }
}

export default connect(null, mapDispatchToProps)(Logger);