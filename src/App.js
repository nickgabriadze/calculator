import React from 'react';
import { useReducer } from 'react';
import './App.css';
import { DelButton, DigitButton, Operators, OtherButtons, EqualsButton } from './buttons.js'


export const ACTIONS = {
  DISPLAY_DIGIT: "DISPLAY_DIGIT",
  DISPLAY_OPERATION: "DISPLAY_OPERATION",
  EVALUATE: "EVALUATE",
  ALL_CLEAR: "ALL_CLEAR",
  DELETE: "DEL"
};

const reducer = (state, { type, payload }) => {

  switch (type) {
    case ACTIONS.DISPLAY_DIGIT:
      if (state.expr == null & state.main == null) {
        state.expr = ''
        state.main = ''
      }
      if (state.expr.length > state.main.length) {
        state.main = state.expr
      }
      
      if (state.expr[0] == 0 & payload.digit == '0') {
        return state;
      }
      if (state.expr[0] == 0 & state.expr >= 1) {
        state.expr = state.expr.slice(1,)
        state.main = state.expr
      }

      if (state.expr.includes(".") & payload.digit === '.') {
        return state;
      }
      if (state.evaluated) {
        return ({
          ...state,
          expr: '',
          main: '',
          evaluated: false
        })
      }
      return ({
        ...state,
        expr: state.expr + payload.digit,
        main: state.main + payload.digit,
        opCount: false
      })

    case ACTIONS.DISPLAY_OPERATION:

      if ((state.expr == null || state.expr == '') & payload.operation == '-') {
        state.expr = ''
        state.main = ''
        return ({
          ...state,
          expr: state.expr + '-',
          main: state.expr + '-'

        })
      }

      if (state.expr == null || state.expr == '') {
        return state;
      }

      if (state.opCount == true) {
        return state;
      }

      return ({
        ...state,
        main: state.main + payload.operation,
        expr: '',
        opCount: true
      })

    case ACTIONS.DELETE:
      if (state.expr == null & state.main == null) {
        return state;
      }

      if (state.expr === '') {
        state.expr = state.main
        state.main = ''
      }

      return (
        {
          ...state,
          expr: state.expr.slice(0, -1),
        }
      )
    case ACTIONS.ALL_CLEAR:
      if (state.expr == null || state.main == null) {
        return state;
      }

      return ({
        ...state,
        expr: '',
        main: '',
        opCount: false
      })
    case ACTIONS.EVALUATE:
      if (state.main == null || state.main == '') {
        return state;
      }
      const lastOne = state.main[state.main.length - 1];

      if (lastOne == '/' ||
        lastOne == '*' ||
        lastOne == '-' ||
        lastOne == '+') {
        state.main = state.main.slice(0, -1)
      }

      if (state.expr == '.') {
        return ({
          main: '0',
          expr: '',
          evaluated: true
        })
      }

      return ({
        main: eval(state.main).toString(),
        expr: '',
        evaluated: true

      })
  }

}


function Calculator() {
  const [{ expr, main, opCount, evaluated }, dispatch] = useReducer(reducer, {});

  return (
    <div className="calculator">
      <div id="output">
        <div id="second">{main}</div>
        <div id="first">{expr}</div>

      </div>
      <OtherButtons className="others" AC="AC" dispatch={dispatch} />
      <DelButton className="others" DEL="DEL" dispatch={dispatch} />
      <Operators operation={"+"} dispatch={dispatch} />
      <Operators operation={"-"} dispatch={dispatch} />
      <Operators operation={"/"} dispatch={dispatch} />
      <Operators operation={"*"} dispatch={dispatch} />
      <DigitButton digit={"1"} dispatch={dispatch} />
      <DigitButton digit={"2"} dispatch={dispatch} />
      <DigitButton digit={"3"} dispatch={dispatch} />
      <DigitButton digit={"4"} dispatch={dispatch} />
      <DigitButton digit={"5"} dispatch={dispatch} />
      <DigitButton digit={"6"} dispatch={dispatch} />
      <DigitButton digit={"7"} dispatch={dispatch} />
      <DigitButton digit={"8"} dispatch={dispatch} />
      <DigitButton digit={"9"} dispatch={dispatch} />
      <DigitButton digit={"0"} dispatch={dispatch} />
      <DigitButton digit={"."} dispatch={dispatch} />
      <EqualsButton dispatch={dispatch} />

    </div>
  );
}


export default Calculator;
