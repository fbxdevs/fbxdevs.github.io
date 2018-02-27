import {Component} from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';

class MenuBar extends Component {
	render() {
		return <AppBar title={this.props.title} />;
	}
}

MenuBar.defaultProps = {
	title: 'Defualt Title',
};

export default MenuBar;
