import {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import UniCol from '../UniCol';

class Contact extends Component {
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
				<Row>
					<UniCol size={12} className="text-center">
						<div className="text-center">
							<span className="mediumText">
								The <b>BEST</b> way to contact us is by joining our
								<span className="bigText">
									<a href={this.props.slackInviteUrl} target="_blank"> Slack</a>
								</span>.
							</span>
						</div>
					</UniCol>
					<UniCol size={12} className="text-center">
						<div className="text-center">
							<span className="mediumText">
								If you must, you can also reach us by email at <a href="mailto:fbxdevmtg@gmail.com">fbxdevmtg@gmail.com</a>
							</span>
						</div>
					</UniCol>
				</Row>
			</Grid>
		);
	}
}

Contact.defaultProps = {
	slackInviteUrl: 'https://fbxdevs-slack-signup.herokuapp.com',
};

export default Contact;