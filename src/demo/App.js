import './style.css';

import React from 'react';

import { connect } from '../lib';
import {
  SuperCounter,
  Text,
  Quote,
  SuperCounterContainer,
  TextContainer,
  QuoteContainer
} from './components';

const GlobalStateDemo = () => (
  <div className="cell">
    <SuperCounter />
    <Text />
    <Quote />
  </div>
);

const IndividualStateDemo = ({ initValueA, initValueB, name, ...otherProps }) =>
  connect({
    inject: [
      new SuperCounterContainer({ initValueA, initValueB, name }),
      new TextContainer(),
      new QuoteContainer()
    ],
    component: GlobalStateDemo
  })(otherProps);

const SharedStateDemo = connect({
  inject: [
    new SuperCounterContainer({ name: 'Shared' }),
    new TextContainer(),
    new QuoteContainer()
  ],
  component: GlobalStateDemo
});

const AppView = () => (
  <div>
    <div className="group">
      <h3>Global state</h3>
      <GlobalStateDemo />
      <GlobalStateDemo />
    </div>
    <div className="group">
      <h3>Individual state</h3>
      <IndividualStateDemo
        initValueA={10}
        initValueB={10}
        name="Individual 1"
      />
      <IndividualStateDemo initValueA={3} initValueB={14} name="Individual 2" />
    </div>
    <div className="group">
      <h3>Shared state</h3>
      <SharedStateDemo />
      <SharedStateDemo />
    </div>
  </div>
);

export const App = connect({
  inject: [],
  component: AppView
});
