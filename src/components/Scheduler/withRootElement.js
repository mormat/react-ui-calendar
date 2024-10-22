import { useEffect, useRef } from 'react';

function withRootElement( WrappedScheduler ) {
    
    return function( props ) {
        
        const style = {
            position: 'relative', 
            minHeight: '480px', 
            height: '100%'
        }
        
        return (
            <div className="mormat-scheduler" style = { style } >
                <WrappedScheduler 
                    { ...props } 
                    eventsDraggable  = { props.onEventDrop }
                    eventsResizeable = { props.onEventResize }
                />
            </div>
        );
        
    }
    
}

export default withRootElement