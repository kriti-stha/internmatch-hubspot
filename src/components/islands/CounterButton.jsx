import styles from '../../styles/counter.module.css';

import { useState } from 'react';

export function addNumbers(...args) {
    return args.reduce((sum, num) => sum + num, 0);
}

export default function CounterButton({ defaultCount }) {
   
    let [count, setCount] = useState(defaultCount);
  
    return (

        <div> 
            <button className={styles.counter} onClick={() => setCount(count + 1)}>Click me to update the count: {count}</button>
            
        </div>
    ) 
}