import * as actionTypes from './action-types';

export const clickElement = (data) => {
    return {
        type : actionTypes.CLICK_ELEMENT,
        payload : data
    }
}

export const reset = () => {
    return {
        type : actionTypes.RESET_DATA
    }
}

export const clearLog = () => {
    return {
        type : actionTypes.CLEAR_LOG
    }
}