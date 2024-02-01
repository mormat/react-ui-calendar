import { useState, useEffect } from 'react';

let lastUniqueId = 1;

const cssNamespace = 'mormat-scheduler-';

function useUniqueId() {

    const [uniqueId] = useState(() => cssNamespace + lastUniqueId++);

    return uniqueId;

}

const getClassName = (suffix) => cssNamespace + suffix

export { useUniqueId, getClassName }