import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, NavItem } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFileCode } from '@fortawesome/fontawesome-free-solid';

export default class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: '',
		}

		this.setActive = this.setActive.bind(this);
	}

	componentWillMount() {
		
		this.setState({
			active: window.location.pathname.split('/')[1]
		});
	}

	componentWillUnmount() {
		
	}

	componentDidCatch(error, info) {
		
	}

	setActive(lc,url) {

		this.setState({
			active: lc
		}, () => {
			window.location.hash = `#${url}`;
		});

	}

	render() {
		return (
			<BSNavbar className='fixed-top' inverse collapseOnSelect>
				<BSNavbar.Header>
					<BSNavbar.Brand>
						<a  className='nav-link' 
							onClick={() => {this.setActive('home','/#/home')}} 
							href="/#/home" >
							<FontAwesomeIcon icon={faFileCode} />&nbsp;
							FbxDevs
						</a>
					</BSNavbar.Brand>
					<BSNavbar.Toggle />
				</BSNavbar.Header>
				
				<BSNavbar.Collapse>
				<Nav>
				{this.props.links.map( (link,i) => {
					if (link.display == undefined || link.display) {
						let lc = link.title.toLowerCase().split(' ').join('-');
						return (
							<NavItem 
								key={lc}
								className={this.state.active == lc ? 'active' : ''}
								id={lc}
								onClick={() => {this.setActive(lc,link.href)}} 
								href={`#${link.href}`} >
								<Link 
									to={link.href} 
									style={{textDecoration:'none'}}
									className='nav-link' >
									{link.title}
								</Link>
							</NavItem>
						)
					}
					return null;
				})}
				</Nav>
				</BSNavbar.Collapse>

			</BSNavbar>
		);
	}
}