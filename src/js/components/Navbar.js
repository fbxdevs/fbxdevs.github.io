import {Component} from 'react';
import {Link} from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome';
import {Navbar as BSNavbar, Nav, NavItem} from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import {faFileCode} from '@fortawesome/fontawesome-free-solid';
fontawesome.library.add(brands, faFileCode);

export default class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: '',
		};

		this.setActive = this.setActive.bind(this);
	}

	componentWillMount() {
		this.setState({
			active: window.location.pathname.split('/')[1],
		});
	}

	componentWillUnmount() {

	}

	componentDidCatch(error, info) {

	}

	setActive(lc, url) {
		this.setState({
			active: lc,
		}, () => {
			window.location.hash = `#${url}`;
		});
	}

	render() {
		return (
			<BSNavbar className='fixed-top' inverse collapseOnSelect>
				<BSNavbar.Header>
					<BSNavbar.Brand>
						<a
							className='nav-link'
							onClick={() => {this.setActive('home', '/#/home');}}
							href="/#/home"
						>
							<FontAwesomeIcon icon={faFileCode} />&nbsp;
							FbxDevs
						</a>
					</BSNavbar.Brand>
					<BSNavbar.Toggle />
				</BSNavbar.Header>
				
				<BSNavbar.Collapse>
					<Nav>
						{this.props.links.map( (link, i) => {
							if(link.display == undefined || link.display) {
								const lc = link.title.toLowerCase().split(' ').join('-');
								return (
									<NavItem
										key={lc}
										className={this.state.active == lc ? 'active' : ''}
										id={lc}
										onClick={() => {this.setActive(lc, link.href);}}
										href={`#${link.href}`}
									>
										<Link
											to={link.href}
											style={{textDecoration: 'none'}}
											className='nav-link'
										>
											{link.title}
										</Link>
									</NavItem>
								);
							}
							return null;
						})}
					</Nav>
					<Nav pullRight>
						<NavItem className='nav-link' href='https://fbxdevs-slack-signup.herokuapp.com' target='_blank'>
							<FontAwesomeIcon icon={['fab', 'slack']} />
							<span> Slack</span>
						</NavItem>
					</Nav>
				</BSNavbar.Collapse>

			</BSNavbar>
		);
	}
}
