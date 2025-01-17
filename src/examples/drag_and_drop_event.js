import { render } from 'react-dom';
import { Scheduler } from '@mormat/react_scheduler';

function App() {
    
    const events = [
        { "label": "moveable",       "start": "2024-10-08 09:00", "end": "2024-10-08 12:00" },
        { "label": "fixed position", "start": "2024-10-10 09:00", "end": "2024-10-10 12:00" },
    ]

    const handleDrop = function(schedulerEvent, valuesBefore) {
        if (schedulerEvent.label.includes("fixed position")) {
            schedulerEvent.update(valuesBefore);
        }
    }

    return ( 
        <Scheduler 
            currentDate = "2024-10-08"
            events = { events } 
            onEventDrop = { handleDrop } 
        /> 
    );
    
}

render(<App />, document.getElementById('scheduler'));
