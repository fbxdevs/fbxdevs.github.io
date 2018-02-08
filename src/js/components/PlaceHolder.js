import {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import UniCol from './UniCol';

class PlaceHolder extends Component {
	render() {
		return (
			<Grid>
				<Row className="show-grid">
					<UniCol size={12}>
						<h1 className="text-center">Hello, Fairbanks!</h1>
					</UniCol>
					<UniCol size={12}>
						<h4 className="text-center">This page is still a work in progress...</h4>
					</UniCol>
					<UniCol size={12}>
						<h4 className="text-center"><a href={this.props.slackInviteUrl} target="_blank">Maybe join our slack in the meantime?</a></h4>
					</UniCol>
				</Row>
			</Grid>
		);
	}
}

PlaceHolder.defaultProps = {
	slackInviteUrl: 'https://fbxdevs-slack-signup.herokuapp.com',
};

export default PlaceHolder;