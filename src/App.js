import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import GlobalContextProvider from "./components/provider/GlobalProvider";
import Detail from "./routes/Detail";
import Genres from "./routes/Genres";
import Login from "./routes/Login";
import MainPage from "./routes/MainPage";
import SignUp from "./routes/SignUp";

export const STORED_USERS = "STORED_USERS";
export const STORED_LIKES = "STORED_LIKES";
export const CURRENT_USER = "CURRENT_USER";
export const STORED_COMMENTS = "STORED_COMMENTS";

export const genres = [
  "평점 높은 영화 순",
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Game Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Sport",
];

function App() {
  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    // 웹 실행시 최초 동작하는 구간.
    // 로컬스토리지에서 유저정보를 가져와 GlobalContext에 설정해줌.
    const item = localStorage?.getItem(CURRENT_USER);
    console.log("localstorage: ", item);
    const currentUser = item ? JSON.parse(item) : undefined;
    if (currentUser) setUserObj(currentUser);
  }, []);

  return (
    <GlobalContextProvider userObj={userObj} setUserObj={setUserObj}>
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/sign_up">
            <SignUp />
          </Route>
          <Route exact={true} path="/">
            <MainPage />
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Route path="/genres/:genre">
            <Genres />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </GlobalContextProvider>
  );
}
export default App;
