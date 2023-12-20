import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import { useCountStore } from './store/zustandStore';
import { increment } from './store/redux-store/reducers/countReducer';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Link } from 'react-router-dom';

type User = {
  id: number;
  name: string;
};

function App() {
  const countRedux = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const increaseCount = useCountStore((state) => state.increaseCount);
  const zustandCount = useCountStore((state) => state.count);
  const [loadUsers, setLoadUsers] = useState(false);
  const {
    data: users,
    status,
    isLoading: loading,
  } = useQuery<User[]>({
    enabled: loadUsers,
    queryKey: ['users'],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          const response = await fetch(
            'https://jsonplaceholder.typicode.com/users'
          ).then((res) => res.json());
          resolve(response);
        }, 2000);
      });
    },
  });

  console.log('status', status, loading);

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
      {/* TODO use suspense */}
      <section>
        <p>Users</p>
        <button onClick={() => setLoadUsers(true)}>Load users</button>
        {loading && <p>Loading...</p>}
        <React.Suspense fallback={<p>Loading...</p>}>
          {users &&
            users.map((user) => (
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            ))}
        </React.Suspense>
      </section>
    </>
  );
}

export default App;
