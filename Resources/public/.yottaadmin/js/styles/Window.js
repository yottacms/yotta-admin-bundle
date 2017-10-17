import { lime, pink } from 'material-ui/colors';

export default {} = theme => {
    
    const unit = theme.spacing.unit,
        appBarHeight = unit * 7;
    
    return ({
        root: {
            padding: unit,
            paddingTop: appBarHeight, 
            top: 0,
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        }
    });
    
};
