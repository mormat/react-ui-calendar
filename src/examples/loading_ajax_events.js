import { createRoot } from 'react-dom/client';
import Scheduler from '@mormat/react_scheduler';

const props = {
    currentDate: "2024-10-08",
    events: function( { dateRange, setEvents }) {
        const { start, end } = dateRange;
        const url = './examples.json?start=' + start.getTime() + '&end=' + end.getTime();

        fetch(url).then(function(response) {
            return response.json();
        }).then(function(values){
            setEvents(values);
        })
        
        document.getElementById('comments').innerHTML = `loading '${url}'`;

    }
}

const root = createRoot( document.getElementById('scheduler' ) );
root.render(
    <Scheduler { ...props } />
);
