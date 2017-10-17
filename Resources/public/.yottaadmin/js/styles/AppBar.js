import Settings from './Settings';

export default {} = theme => {
    
    const appBarHeight = Settings.appBarHeight(theme.spacing.unit);
    
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
