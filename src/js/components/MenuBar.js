import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';

class MenuBar extends React.Component {
	render() {
		return <AppBar title={this.props.title} />;
	}
}

MenuBar.defaultProps = {
	title: 'Defualt Title'
};

export default MenuBar;