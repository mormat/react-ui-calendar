import { createRoot } from 'react-dom/client';
import { Scheduler, EventForm } from '@mormat/react_scheduler';
import { useState} from 'react';

function App() {
    
    const [schedulerEvent, setSchedulerEvent] = useState();
    
    const handleEventAdd = function(schedulerEvent) {
        setSchedulerEvent(schedulerEvent);
    }
    
    return <>
        <Scheduler onEventAdd = { handleEventAdd } />
        { schedulerEvent && (
            <EventForm 
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
