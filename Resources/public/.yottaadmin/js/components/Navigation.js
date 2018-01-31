import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { 
    Icon, ListItem, ListItemIcon, ListItemText, 
    Drawer, List, ListSubheader, Divider,
    MenuItem, IconButton 
} from 'material-ui';
import { observer } from 'mobx-react';

import styleSheet from '../styles/Navigation'

@observer
@withStyles(styleSheet)
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

        this.closeNavigation();
        this.context.router.history.push(path);

    }
    
    render() {
    
        const {classes, store, location, menuItems} = this.props,
            menuItemsUser = menuItems.filter(item => { return !item.developer }),
            menuItemsDeveloper = menuItems.filter(item => { return item.developer }),
            isHomePage = location.pathname == '/';
            
        return (
            <div>

                <IconButton color="inherit"
                    onClick={this.openNavigation}>
                    <Icon>menu</Icon>
                </IconButton>
                    
                { menuItems.length > 0 && (
                    <Drawer
                        open={this.state.openNavigation}
                        onRequestClose={this.closeNavigation}
                        >
                        { menuItemsUser.length > 0 && (
                            <List subheader={<ListSubheader>Yotta.Admin modules</ListSubheader>} className={classes.list}>
                                { menuItemsUser.map((item, index) => (
                                    <MenuItem onClick={() => this.handleClickMenuItem(item.url)} key={index}>
                                        <ListItemIcon>
                                            <Icon>{item.icon}</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary={item.name}/>
                                    </MenuItem>
                                )) }
                            </List>
                        )}
                        { menuItemsUser.length > 0 && menuItemsDeveloper.length > 0 && (
                            <Divider />
                        )}
                        { menuItemsDeveloper.length > 0 && (
                            <List subheader={<ListSubheader>Developer's modules</ListSubheader>} className={classes.list}>
                                {menuItemsDeveloper.map((item, index) => (
                                    <MenuItem onClick={() => this.handleClickMenuItem(item.url)} key={index}>
                                        <ListItemIcon>
                                            <Icon>{item.icon}</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary={item.name}/>
                                    </MenuItem>
                                ))}
                            </List>
                        )}
                    </Drawer>
                )}
            </div>
        );

    }
 
}
