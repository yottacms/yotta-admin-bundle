export default {} = theme => {
    
    const unit = theme.spacing.unit,
        appBarHeight = unit * 7;
        
    return ({
        progressBar: {
            position: 'fixed',
            width: '100%',
            top: 0,
            zIndex: theme.zIndex.appBar + 1
        }
    });
    
};
