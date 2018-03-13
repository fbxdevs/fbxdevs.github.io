import {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom';

import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';

import ROUTES from './routes.js';

class App extends Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Navbar links={ROUTES} />

					<div className='container'>
						<Switch>
							{ROUTES.map( (link, i) => {
								return (
									<Route
										path={link.href}
										component={link.component} />
								);
							})}
							
							<Redirect exact from="/" to="/home" />
							<Route component={NoMatch} />
						</Switch>
					</div>
				</div>
			</HashRouter>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
