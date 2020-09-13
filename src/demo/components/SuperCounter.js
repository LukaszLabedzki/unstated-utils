import React from 'react';

import { AdvancedContainer, connect } from '../../lib';

export class SuperCounterContainer extends AdvancedContainer {
  constructor(props = {}) {
    super(props);

    // For logging
    this.name = props.name || 'Global';

    this.state = this.createState({
      valueA: props.initValueA || 0,
      valueB: props.initValueB || 0
    });
  }

  static calculateState(newState) {
    return { multiplied: newState.valueA * newState.valueB };
  }

  onNextState(state) {
    console.log(this.name, state);
  }

  changeValueA = amount =>
    this.setState(({ valueA }) => ({ valueA: valueA + amount }));

  changeValueB = amount =>
    this.setState(({ valueB }) => ({ valueB: valueB + amount }));
}

export const SuperCounterView = props => (
  <div>
    <div>
      Value A: {props.valueA}
      <button onClick={props.onDecreaseValueA}>-</button>
      <button onClick={props.onIncreaseValueA}>+</button>
    </div>
    <div>
      Value B: {props.valueB}
      <button onClick={props.onDecreaseValueB}>-</button>
      <button onClick={props.onIncreaseValueB}>+</button>
    </div>
    <div>Multiplied: {props.multiplied}</div>
  </div>
);

export const SuperCounter = connect({
  containers: [SuperCounterContainer],
  mapToProps: counter => ({
    ...counter.state,
    onDecreaseValueA: () => counter.changeValueA(-1),
    onIncreaseValueA: () => counter.changeValueA(1),
    onDecreaseValueB: () => counter.changeValueB(-1),
    onIncreaseValueB: () => counter.changeValueB(1)
  }),
  component: SuperCounterView
});
