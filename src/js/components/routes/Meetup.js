import {Component} from 'react';
import {Grid, Row} from 'react-bootstrap';
import UniCol from '../UniCol';
import DoodlePage from '../DoodlePage';

class Meetup extends Component {
	constructor(props) {
		super(props);

		this.onWheel = this.onWheel.bind(this);
	}

	onWheel(e) {
		console.log(`I'm sorry Jason, but I couldn't fix the scrolling. =(`);
	}

	componentWillMount() {
		
	}

	componentDidMount() {

	}

	render() {
		return (
			<Grid onWheel={this.onWheel}>
				<Row>
					<UniCol size={12} className="text-center">
						<DoodlePage pollId={this.props.pollId} />
					</UniCol>
				</Row>
			</Grid>
		);
	}
}

export default Meetup;
