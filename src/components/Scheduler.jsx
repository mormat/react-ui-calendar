
import { useEffect, useRef, useState, useReducer } from 'react';
import jscheduler_ui from '@mormat/jscheduler_ui';

import withEventAdd    from './Scheduler/withEventAdd';
import withEventEdit   from './Scheduler/withEventEdit';
import withRootElement from './Scheduler/withRootElement';
import Header from './Header';
import Layout from './Layout';

const instances = new Map();

function BaseScheduler( { translations = {}, onEventAdd, ...schedulerProps } ) {
    
    const schedulerRef = useRef();
    const [schedulerOptions, dispatchSchedulerOptions] = useReducer(
        createSchedulerOptionsReducer( schedulerRef ), 
        {}
    );
    
    const [ randomValue ] = useState( () => self.crypto.randomUUID());
    
    useEffect(() => {
        
        const { events, ...otherSchedulerProps } = schedulerProps;
        
        const element  = schedulerRef.current;     
        const scheduler = jscheduler_ui.render(
            element, 
            { 
                ...otherSchedulerProps,
                styles: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
            }
        );

        dispatchSchedulerOptions( { type: 'init' } );

        instances.set(element, scheduler );        
        
        return function() {
            instances.delete( element );
        }
        
    }, []);
    
    useEffect(() => {
        loadEvents( schedulerProps.events );
    }, [schedulerOptions]);
        
    function loadEvents(events) {
        
        const scheduler = instances.get(schedulerRef.current);
        
        if (typeof events === 'function') {
            const dateRange = scheduler.getEventsDateRange();
            const setEvents = (events) => {
                scheduler.setOptions({ events });
            };
            events({ dateRange, setEvents });
            
        } else if (events) {
            scheduler.setOptions({ events });
        }
        
    }
    
    return ( 
        <Layout.FixedHeader 
            header = { 
                <>
                    <Header { ... {   
                        translations,
                        schedulerOptions, 
                        dispatchSchedulerOptions
                    } } /> 
                    { /*
                    <button onClick={
                        (e) => {
                            e.preventDefault();
                            onEventAdd({});
                        }
                    }>
                        { randomValue }
                    </button>
                     */ }
                </>
            }
            body   = {( 
                <div ref = { schedulerRef } 
                     data-scheduler
                     style= { Layout.styles['full'] }>
                </div>
            )}
        /> 
    )
    
}

function createSchedulerOptionsReducer( schedulerRef ) {
    
    return function(state, action) {
        const scheduler = instances.get(schedulerRef.current);
        
        switch (action.type) {
            case 'init':
                return {
                    ...state,
                    title:    scheduler.getLabel(),
                    viewMode: scheduler.getOption('viewMode')
                }
            case 'previous':
                scheduler.previous();
                return {
                    ...state,
                    title:   scheduler.getLabel(),
                }
            case 'today':
                scheduler.today();
                return {
                    ...state,
                    title:   scheduler.getLabel(),
                }
            case 'next':
                scheduler.next();
                return {
                    ...state,
                    title:   scheduler.getLabel(),
                }
            case 'switchViewMode':
                const { viewMode } = action;
                scheduler.setOptions( { viewMode } );
                return {
                    ...state, viewMode,
                    title:    scheduler.getLabel(),
                }
            default:
                return state;
        }
    }
    
}

let Scheduler = BaseScheduler;
Scheduler = withEventAdd( Scheduler );
Scheduler = withEventEdit( Scheduler );
Scheduler = withRootElement( Scheduler );

export default Scheduler;
    
export { instances }
