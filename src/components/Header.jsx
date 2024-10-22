import { useState } from 'react';

import { useUniqueId } from '@src/utils/hooks';

function Header({ translations = {}, schedulerOptions, dispatchSchedulerOptions }) {

    const handleClickPrevious = (e) => {
        e.preventDefault();
        dispatchSchedulerOptions( { type: 'previous' } )
    }
    const handleClickToday = (e) => {
        e.preventDefault();
        dispatchSchedulerOptions( { type: 'today' } )
    }
    const handleClickNext  = (e) => {
        e.preventDefault();
        dispatchSchedulerOptions( { type: 'next' } )
    }
    const handleViewModeChange = (e) => {
        dispatchSchedulerOptions({ 
            type:    'switchViewMode',
            viewMode: e.target.value
        });
    }

    return (
        <div className="mormat-scheduler-Header" 
             style={{ overflow: 'visible', padding: '1px' }} 
        >
            <div style={{ width: '33.33%', float: 'left', textAlign: 'left' }}>
                <ButtonGroup 
                    items={[
                        { 
                            label: '<',     
                            onClick: handleClickPrevious 
                        },
                        { 
                            label: translations['header.today'] || 'today', 
                            onClick: handleClickToday 
                        },
                        {   label: '>',     onClick: handleClickNext },
                    ]} 
                />
            </div>
            <div style={{ width: '33.33%', float: 'left', textAlign: 'center' }}>
                <h4>{ schedulerOptions.title } - { schedulerOptions.viewMode }</h4>
            </div>
            <div style={{ width: '33.33%', float: 'right', textAlign: 'right' }}>
                <ToggleGroup 
                    items={[
                        { 
                            label: translations['header.day'] || 'day', 
                            value: 'day' 
                        },
                        { 
                            label: translations['header.week'] || 'week', 
                            value: 'week' 
                        },
                        { 
                            label: translations['header.month'] || 'month', 
                            value: 'month'
                        }
                    ]} 
                    onChange = { handleViewModeChange }
                    
                    value = { schedulerOptions.viewMode } 
                />
            </div>
        </div>                
    )

}

const ButtonGroup = ({ items }) => (
    <div>
        { items.map( ( { label, onClick }, k)  => (
            <button key={ k } onClick={ onClick } >
                { label }
            </button>
        )) }
    </div>
);

const ToggleGroup = ({ items, value, onChange }) => {
    
    const name = useUniqueId();
    
    return (
        <div>
            { items.map( (v, k) => (
                <label key={ k }>
                    <input type="radio" 
                        checked  = { value == v.value }
                        onChange = { onChange }
                        value    = { v.value }
                        name     = { name }
                    />
                    &nbsp;
                    { v.label }
                    &nbsp;
                </label>
            ) ) }
        </div>
    )
    
};

export default Header