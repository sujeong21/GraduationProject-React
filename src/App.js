import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Detail from './routes/Detail';
import Genres from './routes/Genres';
import Login from './routes/Login';
import MainPage from './routes/MainPage';
import SignUp from './routes/SignUp';

export const DEMO_USERS = 'DEMO_USERS';

export const genres = [
  '평점 높은 영화 순',
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Game Show',
  'History',
  'Horror',
  'Music',
  'Musical',
  'Mystery',
  'News',
  'Reality-TV',
  'Romance',
  'Sci-Fi',
  'Sport',
];

const demoUsers = [
  {
    userId: 'id123',
    userPassword: 'pw123',
  },
  {
    userId: 'ididid',
    userPassword: 'pwpwpw',
  },
];

function App() {
  // useEffect(() => {
  //   console.log('로컬스토리지에 USER정보 넣음');
  //   localStorage.setItem(DEMO_USERS, JSON.stringify(demoUsers));
  //   return () => {
  //     console.log('클린업 함수');
  //     localStorage.removeItem(DEMO_USERS);
  //   };
  // }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/sign_up'>
          <SignUp />
        </Route>
        <Route exact={true} path='/'>
          <MainPage />
        </Route>
        <Route path='/detail'>
          <Detail />
        </Route>
        <Route path='/genres'>
          <Genres />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}
export default App;
