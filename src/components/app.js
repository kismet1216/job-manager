import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './app.scss';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import Board from './board/board';
import store from '../redux/store';
import { Provider } from 'react-redux';
import ResumeMaker from './resume-maker/resume-maker';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <header>
          <NavLink to="/board">面板</NavLink>
          <NavLink to="/resume-maker">简历制作</NavLink>
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={Board} />
            <Route path="/board" component={Board} />
            <Route path="/resume-maker" component={ResumeMaker} />
          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
