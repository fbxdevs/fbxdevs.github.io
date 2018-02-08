import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';

import Home from './components/routes/Home';
import About from './components/routes/About';
import Contact from './components/routes/Contact';

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
				<About {...props} />
			)
		}
	},
	{
		'title':'Contact',
		'href':'/contact',
		'component': (props) => {
			return (
				<Contact {...props} />
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