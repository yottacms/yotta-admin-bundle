import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Icon, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, IconButton } from 'material-ui';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom'

import styleSheet from '../styles/Navigation'

@withStyles(styleSheet)
@observer
export default class extends React.Component {
	
    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.shape({
                push: PropTypes.func.isRequired,
            }).isRequired
        }).isRequired
    }
    
    state = {
        anchorEl: null,
        openNavigation: false,
    };

    openNavigation = event => {
        this.setState({
            openNavigation: true, 
            anchorEl: event.currentTarget
        });
    }
    
    closeNavigation = () => {
        this.setState({
            openNavigation: false, 
            anchorEl: null
        });
    }
    
    handleClickMenuItem = path => {

        const { history } = this.context.router;

        this.closeNavigation();
        history.push(path);

    }
    
	render() {
	
		const {classes, store, location, menuItems} = this.props,
            isHomePage = location.pathname == '/';

		return (
            <div>
                { isHomePage ? (
                    <IconButton color="contrast"
                        onClick={this.openNavigation}>
                        <Icon>menu</Icon>
                    </IconButton>
                ) : (
                    <Link to="/" className={classes.menuIcon}>
                        <IconButton color="contrast">
                            <Icon>arrow_back</Icon>
                        </IconButton>
                    </Link>
                )}
                { menuItems.length > 0 && (
                    <Menu
                        open={this.state.openNavigation}
                        onRequestClose={this.closeNavigation}
                        anchorEl={this.state.anchorEl}
                        >
                        {menuItems.map((item, index) => (
                            <MenuItem onClick={() => this.handleClickMenuItem(item.url)} key={index}>
                                <ListItemIcon>
                                    <Icon>{item.ico}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={item.name}/>
                            </MenuItem>
                        ))}
                    </Menu>
                )}
            </div>
		);

	}
 
}
