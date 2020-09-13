import React from 'react';

import { connect } from '../unstated-connect';

class AutoPropInputView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { value: props.value };
  }

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value === this.props.value) return;
    if (this.props.value === this.state.value) return;

    this.setState({ value: this.props.value });
  }

  onInputValueChanged = async evt => {
    const value = evt.target.value;

    if (value === this.state.value) return;

    await this.setState({ value });
    if (!this.props.updateOnBlur) {
      await this.props.setValue(value);
      if (this.props.onChange) this.props.onChange(value);
    }
  };

  trySubmit = key => {
    if (key.keyCode === 13 && this.props.onSubmit) {
      this.props.onSubmit();
    }
  };

  render() {
    const {
      input: Input,
      onChange,
      onSubmit,
      setValue,
      value,
      updateOnBlur,
      onBlur,
      ...otherProps
    } = this.props;

    const inputProps = {
      value: this.state.value,
      onChange: this.onInputValueChanged,
      onKeyUp: this.trySubmit,
      ...otherProps
    };

    if (updateOnBlur) inputProps.onBlur = async () => {
      await this.props.setValue(this.state.value);
      if (onChange) onChange(value);
      if (onBlur) onBlur();
    }

    if (Input) return <Input {...inputProps} />;
    return <input {...inputProps} />;
  }
}

export const AutoPropInput = ({ container, propName, ...otherProps }) =>
  connect({
    inject: [container],
    containers: [container],
    mapToProps: ({ state }) => ({
      value: state[propName],
      setValue: value => container.setState({ [propName]: value })
    }),
    component: AutoPropInputView
  })(otherProps);
