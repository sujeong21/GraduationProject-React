import React, { useState } from 'react';
import { STORED_USERS } from '../App';
import '../css/SignUp.css';

// 회원가입 페이지
// 전반적으로 로그인페이지와 거의 유사하다.
const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleUserId = (e) => setUserId(e.target.value);
  const handleUserPassword = (e) => setUserPassword(e.target.value);
  const handleUserEmail = (e) => setUserEmail(e.target.value);

  return (
    <div className='container'>
      <div className='signup_container'>
        <div style={{ display: 'flex', gap: 25, flexDirection: 'column' }}>
          <div className='signup_title'>SIGNUP</div>
          <input
            type='text'
            className='signup_input'
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
          <input
            type='email'
            placeholder='EMAIL'
            value={userEmail}
            onChange={handleUserEmail}
          />
        </div>
        <div>
          <button
            className='signup_button'
            type='submit'
            disabled={
              !(
                userId?.length > 0 &&
                userPassword?.length > 0 &&
                userEmail?.length > 0
              )
            }
            onClick={() => {
              let demoUsers = JSON.parse(localStorage.getItem(STORED_USERS));

              demoUsers = Array.isArray(demoUsers)
                ? [...demoUsers, { userId, userPassword, userEmail }]
                : [{ userId, userPassword, userEmail }];
              localStorage.setItem(STORED_USERS, JSON.stringify(demoUsers));

              alert('회원가입 완료!');
              window.location = '/login';
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
