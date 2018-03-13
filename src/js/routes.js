import Home from './components/routes/Home';
import About from './components/routes/About';
import Contact from './components/routes/Contact';
import Meetup from './components/routes/Meetup';

import pollId from './pollId.js';

const ROUTES = [
	{
		'title': 'Home',
		'href': '/home',
		'display': false,
		'component': (props) => {
			return (
				<Home {...props} />
			);
		},
	},
	{
		'title': 'Meetup',
		'href': '/meetup',
		'component': (props) => {
			return (
				<Meetup pollId={pollId} {...props} />
			);
		},
	},
	{
		'title': 'About',
		'href': '/about',
		'component': (props) => {
			return (
				<About {...props} />
			);
		},
	},
	{
		'title': 'Contact',
		'href': '/contact',
		'component': (props) => {
			return (
				<Contact {...props} />
			);
		},
	},
];

export default ROUTES;
