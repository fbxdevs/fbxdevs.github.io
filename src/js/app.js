import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import PlaceHolder from './components/PlaceHolder';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';

import Home from './components/routes/Home';

const ROUTES = [
	{
		'title':'Home',
		'href':'/home',
		'component': (props) => {
			return (
				<Home {...props} />
			)
		}
	},
	{
		'title':'About',
		'href':'/about',
		'component': (props) => {
			return (
				<PlaceHolder {...props} />
			)
		}
	},
	{
		'title':'Contact',
		'href':'/contact',
		'component': (props) => {
			return (
				<PlaceHolder {...props} />
			)
		}
	}
];

class App extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Navbar links={ROUTES} />

					<div className='container'>
					<Switch>
						{ROUTES.map( (link,i) => {
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