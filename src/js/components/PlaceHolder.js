import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

class PlaceHolder extends React.Component {
	render() {
		return (
			<Grid>
				<Row className="show-grid">
					<Col xs={12} sm={12} md={12} lg={12}>
						<h1 className="text-center">Hello, Fairbanks!</h1>
					</Col>
					<Col xs={12} sm={12} md={12} lg={12}>
						<h4 className="text-center">This page is still a work in progress...</h4>
					</Col>
					<Col xs={12} sm={12} md={12} lg={12}>
						<h4 className="text-center"><a href={this.props.slackInviteUrl} target="_blank">Maybe join our slack in the meantime?</a></h4>
					</Col>
				</Row>
			</Grid>
		);
	}
}

PlaceHolder.defaultProps = {
	slackInviteUrl: 'https://fbxdevs-slack-signup.herokuapp.com',
};

export default PlaceHolder;