import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './app.scss';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import Board from './board/board';
import store from '../redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <header>
          <NavLink to="/">面板</NavLink>
          <NavLink to="/resume-maker">简历制作</NavLink>
        </header>
        <Switch>
          <Route path="/" component={Board} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
