import React from 'react';
import { useReducer } from 'react';
import './App.css';
import {DelButton, DigitButton, Operators, OtherButtons,EqualsButton} from './buttons.js'


export const ACTIONS = {
   DISPLAY_DIGIT: "DISPLAY_DIGIT",
   DISPLAY_OPERATION: "DISPLAY_OPERATION",
   EVALUATE: "EVALUATE",
   ALL_CLEAR: "ALL_CLEAR",
   DELETE: "DEL"
};

const reducer = (state, {type, payload}) => {
  const evaluated = false
  switch(type){

    case ACTIONS.DISPLAY_DIGIT:
      if(state.expr == null){
        state.expr = ""
      }

      if(state.evaluated == true){
        
        return {...state, expr: '' + payload.digit,
        evaluated: false};
      }
      
      if(state.expr.includes(".") & payload.digit === "."){
        return state;
      }
      
    
      return({
        ...state,
        expr: state.expr + payload.digit,
        operation: false,
        digitDisplayed: true
      })
      
    case ACTIONS.DISPLAY_OPERATION:      
  
      if(state.expr == null & payload.operation == "-"){
        state.expr = ''
        return({
          ...state,
        expr: state.expr  + payload.operation,
        operation: true,
        digitDisplayed: false
        })
      }
      if(state.expr == null){
        return state;
      }
      if(state.operation == true){
        return state;
      }
      return ({
        ...state,
        expr: state.expr + payload.operation,
        operation: true,
        digitDisplayed: false
      })

    case ACTIONS.ALL_CLEAR:
      if(state.expr != null){
        return({...state, expr: ""})
        
      }

    case ACTIONS.EVALUATE:
      if(state.digitDisplayed == false){
        return state;
      }
     
      if(state.expr != null){
        return({...state, expr: eval(state.expr), 
        evaluated: true})
      
    }

    case ACTIONS.DELETE:
      if(state.expr == null){
        return state;
      }
      
      return({
        ...state,
        expr: state.expr.toString().slice(0, -1)
      })
    }

  


}
function Calculator() {
   const [{expr, evaluated, operation, digitDisplayed}, dispatch] = useReducer(reducer, {});
   
  return (
    <div className="calculator">
    <div id="output">
    <div id="first">{expr}</div>
    </div>
    <OtherButtons  className="others" AC="AC" dispatch={dispatch}/>
    <DelButton className="others" DEL="DEL" dispatch={dispatch}/>
    <Operators operation={"+"} dispatch={dispatch}/>
    <Operators operation={"-"} dispatch={dispatch}/>
    <Operators operation={"/"} dispatch={dispatch}/>
    <Operators operation={"*"} dispatch={dispatch}/>
    <DigitButton digit={"1"} dispatch={dispatch}/>
    <DigitButton digit={"2"} dispatch={dispatch}/>
    <DigitButton digit={"3"} dispatch={dispatch}/>
    <DigitButton digit={"4"} dispatch={dispatch}/>
    <DigitButton digit={"5"} dispatch={dispatch}/>
    <DigitButton digit={"6"} dispatch={dispatch}/>
    <DigitButton digit={"7"} dispatch={dispatch}/>
    <DigitButton digit={"8"} dispatch={dispatch}/>
    <DigitButton digit={"9"} dispatch={dispatch}/>
    <DigitButton digit={"0"} dispatch={dispatch}/>
    <DigitButton digit={"."} dispatch={dispatch}/>
    <EqualsButton dispatch={dispatch}/>
    
    </div>
  );
}


export default Calculator;