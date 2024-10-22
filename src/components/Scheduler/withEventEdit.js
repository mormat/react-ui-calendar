
function withEventEdit( WrappedScheduler ) {
    
    return function( { onEventEdit, ...otherProps } ) {
        
        const onEventClick = (schedulerEvent) => {
            onEventEdit( schedulerEvent );
        }
        
        return (
            <WrappedScheduler { ...otherProps } 
                onEventClick = { onEventEdit ? onEventClick : null }
            />
        );
        
    }
    
}

export default withEventEdit