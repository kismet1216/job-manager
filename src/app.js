import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './app.scss';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import Board from './board/board';

function App() {
	return (
		<BrowserRouter>
			<header>
				<NavLink to="/board">Board</NavLink>
			</header>
			<Switch>
				<Route path="/board" component={Board} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
