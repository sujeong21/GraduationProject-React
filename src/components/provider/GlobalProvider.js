import { createContext } from 'react';

// 웹 전반에 걸쳐 유저 정보를 담아두는 글로벌 컨텍스트
// 이 컨텍스트는 App.js 전반에 걸쳐 영향을 주므로, 어느 페이지에서든
// 이 컨텍스트를 통해 현재 로그인한 유저의 정보를 가져오고, 로그인처리를 할 수 있다.
export const GlobalContext = createContext({
  userObj: {},
  setUserObj: (obj) => {},
});

const GlobalContextProvider = ({ userObj, setUserObj, children }) => (
  <GlobalContext.Provider
    value={{
      userObj,
      setUserObj,
    }}
  >
    {children}
  </GlobalContext.Provider>
);

export default GlobalContextProvider;
