//store.js
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './features/taskSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      return { tasks: [] };
    }
    return { tasks: JSON.parse(serializedState) };
  } catch (e) {
    console.error("Could not load state", e);
    return { tasks: [] };
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState);
  } catch (errors) {
   console.log("errors",errors)

  }
};

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState().tasks);
});

export default store;
