import { blueGrey } from 'material-ui/colors';
import Settings from './Settings';

export default {} = theme => {
    
    const appBarHeight = Settings.appBarHeight(theme.spacing.unit);
    
    return ({
        body: {
            paddingTop: appBarHeight,
            '& a': {
                color: 'inherit'
            }
        },
        flexTitle: {
            flex: 1,
            minWidth: 0,
            
            '& > *': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
        },
        appBar: {
            height: appBarHeight,
            boxSizing: 'inherit',
            background: blueGrey[400],
            
            '& $toolBar': {
                minHeight: appBarHeight
            }
        },
            toolBar: {
                paddingLeft: theme.spacing.unit,
                paddingRight: theme.spacing.unit,
            },
            menuIcon: {
                textDecoration: 'none'
            }
    });
    
};
