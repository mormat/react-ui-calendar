import { createRoot } from 'react-dom/client';
import { Scheduler, EventForm } from '@mormat/react_scheduler';
import { useState } from 'react';

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
            <EventForm 
                values = { schedulerEvent.values }
                onConfirm = { (values) => {
                    schedulerEvent.update(values);
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

