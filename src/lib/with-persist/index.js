import { pick } from '../utils/pick';

export const WithPersist = ({
  ContainerClass,
  persist = { loadState: () => {}, storeState: () => {} },
  persistKeys = ContainerClass.constructor.persistKeys,
  autoLoad = false
}) =>
  class extends ContainerClass {
    rehydrated = false;

    constructor(props) {
      super(props);

      if (autoLoad) this.rehydrate();
    }

    rehydrate = async () => {
      const state = await persist.loadState();

      if (!state) return false;

      await this.setState(state);
      this.rehydrated = true;

      return true;
    };

    async setState(f) {
      const result = await super.setState(f);

      if (persistKeys && persistKeys.length > 0) {
        const persistState = pick(this.state, persistKeys);
        persist.storeState(persistState);
      } else {
        persist.storeState(this.state);
      }

      return result;
    }
  };
