import * as actionTypes from '../actions/action-types';
const initialState = {
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

export const reducer = (state = initialState, actions) => {
    switch(actions.type) {
        case actionTypes.CLICK_ELEMENT :
            return {
                ...state,
                winData : actions.payload.winData,
                allClicked : actions.payload.allClicked,
                log : actions.payload.log,
                xOrO : actions.payload.xOrO,
                winningMsg : actions.payload.winningMsg
            }
        case actionTypes.CLEAR_LOG : 
            return {
                ...state,
                log : []
            }
        case actionTypes.RESET_DATA :
            let newState = {...state}
            newState.log.push('Game Restart');
            return {
                ...state,
                log : newState.log,
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
                winningMsg : ''
            }
        default :
            return state
    }
}