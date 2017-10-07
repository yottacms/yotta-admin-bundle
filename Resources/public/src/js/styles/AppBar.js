import { blueGrey } from 'material-ui/colors';

export default {} = theme => {
    
    const appBarHeight = theme.spacing.unit * 7;
    
    return ({
        body: {
            paddingTop: appBarHeight,
        },
        flex: {
            flex: 1,
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
            }
    });
    
};
