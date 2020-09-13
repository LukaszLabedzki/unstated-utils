import React from 'react';
import { Container } from 'unstated';
import { connect } from '../unstated-connect';

export class SimpleRouterContainer extends Container {
  constructor(props) {
    super(props);

    this.routes = props.routes;

    this.state = {
      component: null
    };

    this.push(props.initial);
  }

  push = async next => {
    let component = next;

    if (next.load) {
      component = await next.load();
    }

    return this.setState({ component });
  };
}

export const SimpleRouter = connect({
  containers: [SimpleRouterContainer],
  mapToProps: router => ({ Component: router.state.component, router }),
  component: ({ Component, router, ...otherProps }) =>
    Component ? <Component router={router} {...otherProps} /> : null
});
