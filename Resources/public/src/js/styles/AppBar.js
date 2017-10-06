import { lime, pink } from 'material-ui/colors';
import BackgroundHeaderCard from '../../images/toolbar_background.svg';

export default {} = theme => {
    
    const appBarHeight = theme.spacing.unit * 7;
    
    return ({
        body: {
            paddingTop: appBarHeight,
        },
        flex: {
            flex: 1,
        },
        list: {
            width: 250
        },
        badge: {
            backgroundColor: pink[500],
        },
        
        Drawer: {
        },
        
            rightPane: {
                
            },
        
            toolBar: {
                paddingLeft: theme.spacing.unit,
                paddingRight: theme.spacing.unit,
            },
            appBar: {
                height: appBarHeight,
                boxSizing: 'inherit',
                
                background: {
        			image: 'url(' + BackgroundHeaderCard + ')',
        			size: 'cover',
        			position: 'bottom center',
        		},
                
                '& $toolBar': {
                    minHeight: appBarHeight
                }
            },
                toolBar2: {
                    extend: 'toolBar',
                    paddingLeft: 15,
                    minHeight: appBarHeight
                },
            
                appBarSwithCheckedBar: {
                },
                appBarSwithChecked: {
                    color: 'white',
                    '& + $appBarSwithCheckedBar': {
                        backgroundColor: lime[500],
                        opacity: 1
                    },
                },
                
                btnPrifile: {
                    textTransform: 'none'
                },
                    btnProfileIco: {
                        marginRight: theme.spacing.unit
                    },
                    
        DrawerAnchorLeft: {
            top: 56
        },
        DrawerPaper: {
            zIndex: 1000
        },
        DrawerPaper2: {
            paddingRight: 0
        }
                    
            
    });
    
};
