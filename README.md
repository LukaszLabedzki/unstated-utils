# unstated-utils

Small library offering some utilities related to the "unstated" state management library.

## Install

To add to your project:

`yarn add https://bitbucket.org/arvidnicolaas/unstated-utils.git`

## Demo

To start the demo in this project:
`yarn start`

## Usage

It exports the following:

### `connect({inject, containers, mapToProps, component})` function

Swiss army knife giving one access point for unstated's `Provider` and `Subscribe`.

- `inject`: a list of container instances to inject (will create a new `Provider`)
- `containers`: a list of container classes to subscribe to (will create a new `Subscribe`). You can use a function to avoid circular dependency errors, like: `containers: () => [container1, ...]`
- `mapToProps`: function mapping the container instances to component properties
- `component`: the resulting view to which the incoming properties and the properties from `mapToProps` are passed

Usage:

```
const CounterView = ({ count }) => <div>{count}</div>;

const Counter = connect({
  containers: [CounterContainer],
  mapToProps: ({ state: count }) => ({ count }),
  component: CounterView
});

const ConfigCounter = ({ initCount, ...otherProps }) =>
  connect({
    inject: [new CounterContainer({ initCount })],
    containers: [CounterContainer],
    mapToProps: ({ state: count }) => ({ count }),
    component: CounterView
  })(otherProps);

const App = () => (
  <div>
    <Counter />
    <ConfigCounter initCount={5} />
  </div>
);
```

You can use `connect` to surround your app with a global Provider. If you don't want to inject
any container instances, you still have to supply an empty list to inject as follows:

```
const AppView = () => <div><MyCounter /> ... </div>

const App = connect({
  inject: [],
  component: AppView
});
```

It is also possible to use incoming props to configure connect, e.g. as follows:

```
const Component = props => connect({
  containers: [props.container]
  component: props.component
})(props)
```

### `AdvancedContainer` class

An extension of the unstated `Container` offering:

- a `static calculateState(newState, oldState) { return {...calculatedProps}}` hook allowing each state update to include calculated properties. When necessary, this method can also not be static and will still be picked up. However, static is preferred.
- an `onNextState(state, oldState) => {}` hook allowing some logic to be executed on a state change

### `WithPersist` class decorator

A class decorator that adds hooks to persist and load its state.
It is used as follows:

```
class PersistedContainer extends WithPersist({
  ContainerClass: YourContainerClass,
  persist: { loadState: () => {...}, storeState: state => {...} },
  persistKeys: ['prop1', 'prop2']
  autoLoad: false
}) {}
```

- By default all state keys will be persisted, unless the `persistKeys` property is specified. In this case only the specified keys will be persisted.
- Rehydration can be checked with the `rehydrated` property
- When the ```autoLoad``` property is true, the object will load the persisted state immediately after construction. Note that this operation is still asynchronous so happens after construction.
- Manual rehydration is possible with the asynchronous ```rehydrate()``` method.
 
### `SimpleRouter` class

A simple router that can be used when no browser URL synchronization is needed. Use as follows:

```
const routes = {
  hello: ({router}) =>
    (<div>
      Hello
      <button onClick={() => router.push(routes.goodbye)}>Click</button>
     </div>
    ),
  goodbye: ({router}) =>
    (<div>
      Goodbye
      <button onClick={() => router.push(routes.hello)}>Click</button>
     </div>
    ),
  myAsyncRoute: {
    load: () => import('../myComponent')
  }
}

const router = new SimpleRouterContainer({ routes, initial: routes.hello });

const App = connect({
  inject: [router],
  component: SimpleRouter  
}) 
```
