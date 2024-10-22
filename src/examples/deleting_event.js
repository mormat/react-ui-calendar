import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { Scheduler, OkCancelDialog } from '@mormat/react_scheduler';

function App() {
    
    const [schedulerEvent, setSchedulerEvent] = useState();

    const events = [
        { "label": "interview",  "start": "2024-10-08 10:00" },
    ]

    const handleEventEdit = function(schedulerEvent) {
        setSchedulerEvent(schedulerEvent);
    }

    return <>
        <Scheduler 
            currentDate = "2024-10-08"
            events = { events } 
            onEventEdit = { handleEventEdit } 
        /> 
        { schedulerEvent && (
            <OkCancelDialog 
                message = { `Delete the '${schedulerEvent.label}' event ?` }
                onConfirm = { () => {
                    schedulerEvent.delete();
                    setSchedulerEvent(null);
                }}
                onCancel = { () => {
                    setSchedulerEvent(null);
                }}                
            />
        ) }
    </>;
}

const root = createRoot( document.getElementById('scheduler' ) );
root.render(<App />);
