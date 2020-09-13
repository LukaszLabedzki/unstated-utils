import React from 'react';

import { AdvancedContainer, connect } from '../../lib';
import { AutoPropInput } from '../../lib';

export class TextContainer extends AdvancedContainer {
  state = { text: 'Hello' };
}

export const TextView = props => (
  <div>
    <AutoPropInput container={props.container} propName="text" />
    Text: {props.container.state.text}
  </div>
);

export const Text = connect({
  containers: [TextContainer],
  mapToProps: container => ({ container }),
  component: TextView
});
