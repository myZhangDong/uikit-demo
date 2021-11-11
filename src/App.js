import logo from './logo.svg';
import './App.css';

import {
	Switch,
	Route,
	withRouter,
	Redirect,
	HashRouter
} from "react-router-dom";

import { createHashHistory } from 'history'

import Login from './layout/login'
import Main from './layout/main'

import WebIM, { initIMSDK } from './utils/WebIM'
import initListen from './utils/WebIMListen'
import Loading from './components/common/loading'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { loginWithToken } from './api/loginChat'

const history = createHashHistory()
initIMSDK()
initListen()

const AuthorizedComponent = (props) => {
	const Component = props.component;
	const webimAuth = sessionStorage.getItem('webim_auth')

	return webimAuth ? (
		<Switch>
			<Redirect to="/main" render={props => <Component {...props} />} />
		</Switch>
	) : <Redirect to="/login" />
}

function App() {
	const isFetching = useSelector(state => state?.isFetching) || false

	useEffect(() => {
		const webimAuth = sessionStorage.getItem('webim_auth')
		if (webimAuth) {
			let webimAuthObj = JSON.parse(webimAuth)
			loginWithToken(webimAuthObj.agoraId, webimAuthObj.accessToken)
		}
	}, [])

	return (
		<div className="App">
			<Loading show={isFetching} />
			<HashRouter basename='/' history={history}>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/main" component={Main} />
					<Route path="/" render={() => <AuthorizedComponent token={'11'} component={Main} />} />
				</Switch>
			</HashRouter>
		</div>
	);
}

export default App;

