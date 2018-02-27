import {Component} from 'react';
import {Col} from 'react-bootstrap';

class UniCol extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		
	}

	componentDidMount() {

	}

	render() {
		return <Col
			xs={this.props.size}
			sm={this.props.size}
			md={this.props.size}
			lg={this.props.size}
		>
			{this.props.children}
		</Col>;
	}
}

UniCol.defaultProps = {
	size: 12,
};

export default UniCol;
