import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CURRENT_USER, STORED_USERS } from '../App';
import { GlobalContext } from '../components/provider/GlobalProvider';
import '../css/Login.css';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  // 로그인 성공시 글로벌 컨텍스트에 유저정보 set
  const { setUserObj } = useContext(GlobalContext);

  const handleUserId = (e) => setUserId(e.target.value);
  const handleUserPassword = (e) => setUserPassword(e.target.value);

  const history = useHistory();

  // 로그인 액션 함수
  const onLogin = () => {
    const demoUsers = JSON.parse(localStorage.getItem(STORED_USERS)) ?? [];

    const found = demoUsers.find(
      (e) => e.userId === userId && e.userPassword === userPassword
    );
    if (found) {
      localStorage.setItem(CURRENT_USER, JSON.stringify(found));
      setUserObj(found);
      history.push('/');
    } else {
      alert('계정정보를 확인할 수 없습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className='container'>
      <div className='login_container'>
        <div
          style={{
            display: 'flex',
            gap: 25,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className='login_title'>LOGIN</div>
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
            onClick={onLogin}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
