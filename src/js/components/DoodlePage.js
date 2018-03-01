import {Component} from 'react';
// import {Grid, Row, Col} from 'react-bootstrap';

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
			
			<div id="doodle-poll-container">
				<iframe id="doodle-poll"
					className="text-center"
					src={`https://doodle.com/poll/${this.props.pollId}`}>
				</iframe>
			</div>
					
		);
	}
}

export default DoodlePage;
