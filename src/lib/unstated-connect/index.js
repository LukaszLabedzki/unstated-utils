import React from 'react';
import { Provider, Subscribe } from 'unstated';

class Connect extends React.PureComponent {
  render() {
    const {
      inject = null,
      containers = null,
      mapToProps = c => ({}),
      component: Component,
      componentProps = {}
    } = this.props;

    let result = null;

    if (containers) {
      let containers2 = containers;
      if (typeof containers === 'function') containers2 = containers();

      if (!Array.isArray(containers2)) containers2 = [containers2];

      result = (
        <Subscribe to={containers2}>
          {(...conts) => (
            <Component {...componentProps} {...mapToProps(...conts)} />
          )}
        </Subscribe>
      );
    } else {
      result = <Component {...componentProps} />;
    }

    if (inject) {
      let inject2 = inject;

      if (typeof inject === 'function') inject2 = inject();

      if (!Array.isArray(inject2)) inject2 = [inject2];

      result = <Provider inject={inject2}>{result}</Provider>;
    }

    return result;
  }
}

export const connect = props => componentProps => (
  <Connect {...props} componentProps={componentProps} />
);
