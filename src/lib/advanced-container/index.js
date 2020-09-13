import { Container } from 'unstated';

export const WithAdvancedState = WrappedContainer =>
  class extends WrappedContainer {
    onNextState(state) {}

    createState = (newState, oldState) => {
      if (newState) {
        const calculateState =
          this.constructor.calculateState || this.calculateState;

        if (calculateState) {
          const calculatedState = calculateState(newState, oldState);

          if (calculatedState) return { ...newState, ...calculatedState };
        }

        return newState;
      }
    };

    setState(f) {
      switch (typeof f) {
        case 'function': {
          return super.setState(state => {
            const newState = { ...state, ...f(state) };

            const nextState = this.createState(newState, state);

            if (nextState) this.onNextState(nextState);

            return nextState;
          });
        }
        case 'object': {
          return super.setState(state => {
            const newState = { ...state, ...f };

            const nextState = this.createState(newState, state);

            if (nextState) this.onNextState(nextState);

            return nextState;
          });
        }
        default: {
          return super.setState(f);
        }
      }
    }
  };

export class AdvancedContainer extends WithAdvancedState(Container) {}
