import React, { useState } from 'react';
import { DEMO_USERS } from '../App';
import '../css/Login.css';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleUserId = (e) => setUserId(e.target.value);
  const handleUserPassword = (e) => setUserPassword(e.target.value);

  return (
    <div className='container'>
      <div className='login_container'>
        <div style={{ display: 'flex', gap: 25, flexDirection: 'column' }}>
          <h1 className='login_title'>LOGIN</h1>
          <input
            type='text'
            className='login_input'
            placeholder='USERNAME'
            value={userId}
            onChange={handleUserId}
          />
          <input
            type='password'
            placeholder='PASSWORD'
            value={userPassword}
            onChange={handleUserPassword}
          />
        </div>
        <div>
          <p>비회원으로 둘러보기</p>
          <button
            disabled={!(userId?.length > 0 && userPassword?.length > 0)}
            className='login_button'
            type='submit'
            onClick={() => {
              const demoUsers = JSON.parse(localStorage.getItem(DEMO_USERS));

              const found = demoUsers.find(
                (e) => e.userId === userId && e.userPassword === userPassword
              );
              if (found) {
                window.location = '/';
              } else {
                alert('계정정보를 확인할 수 없습니다. 다시 시도해 주세요.');
              }
            }}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
