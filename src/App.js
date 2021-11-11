import logo from './logo.svg';
import './App.css';

import {
	Switch,
	Route,
	withRouter,
	HashRouter
} from "react-router-dom";

import { createHashHistory } from 'history'

import Login from './layout/login'
import Main from './layout/main'

import WebIM, { initIMSDK } from './utils/WebIM'
import initListen from './utils/WebIMListen'
import Loading from './components/common/loading'
import { useSelector, useDispatch } from 'react-redux'
const history = createHashHistory()
initIMSDK()
initListen()
console.log('APPPPP')
function App() {
	const isFetching = useSelector(state => state?.isFetching) || false
	return (
		<div className="App">
			<Loading show={isFetching} />
			<HashRouter basename='/' history={history}>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/main" component={Main} />
				</Switch>
			</HashRouter>
		</div>
	);
}

export default App;

