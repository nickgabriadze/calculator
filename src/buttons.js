import React from 'react'
import {ACTIONS} from './App';

export function DigitButton({digit, dispatch}){
    return(
        <button id="numbers" onClick={() => dispatch({type: ACTIONS.DISPLAY_DIGIT, payload:{digit}})}>{digit}</button>
    )
}

export function Operators({operation, dispatch}){
    return (
        <button id="operators" onClick={() => dispatch({type: ACTIONS.DISPLAY_OPERATION, payload:{operation}})}>{operation}</button>
    )
}
export function OtherButtons({AC, dispatch}){
    return (
        <button id="others"  onClick ={() => dispatch({type: ACTIONS.ALL_CLEAR, payload:{AC}})}>{AC}</button>
    )
}
export function EqualsButton({dispatch}){
    return (
    <button id="equals" onClick={() => dispatch({type: ACTIONS.EVALUATE, payload:{}})}>=</button>
    )
}

export function DelButton({DEL,dispatch}){
    return(
        <button id="others" onClick={() => dispatch({type: ACTIONS.DELETE, payload:{DEL}})}>{DEL}</button>
    )
}