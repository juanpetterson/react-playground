import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCountStore } from './store/zustandStore';
import { increment } from './store/redux-store/reducers/countReducer';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const countRedux = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const increaseCount = useCountStore((state) => state.increaseCount);
  const zustandCount = useCountStore((state) => state.count);

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count} - useState
        </button>
        <button onClick={increaseCount}>
          count is {zustandCount} - zustand
        </button>
        <button onClick={() => dispatch(increment())}>
          count is {countRedux} - redux
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
