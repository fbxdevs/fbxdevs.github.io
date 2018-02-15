import {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

class DoodlePage extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<Grid>
				<Row className="show-grid">
					<Col xs={2} sm={2} md={2} lg={2}></Col>
					<Col xs={8} sm={8} md={8} lg={8}>
						<div id="doodle-poll-container">
							<iframe id="doodle-poll" 
								className="text-center"
								src={`https://doodle.com/poll/${this.props.pollId}`}>
							</iframe>
						</div>
					</Col>
					<Col xs={2} sm={2} md={2} lg={2}></Col>
				</Row>
			</Grid>
		);
	}
}

export default DoodlePage;