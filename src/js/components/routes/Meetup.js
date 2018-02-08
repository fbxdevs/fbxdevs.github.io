import {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import UniCol from '../UniCol';

import DoodlePage from '../DoodlePage';

class Meetup extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		
	}

	componentDidMount() {

	}

	render() {
		return (
			<DoodlePage pollId={this.props.pollId} />
		);
	}
}

export default Meetup;