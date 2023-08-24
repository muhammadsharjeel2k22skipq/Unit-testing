'use client';
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34,
//firstNum=0; secondNum=1 nexnum = first+second = 0+1 = 1;

import React,{ useState } from 'react';

let prev = 0;
let curr = 1;

const Label = () => {
  const [sum, setSum] = useState(0);

    const handleClick = () => {
      // sum = prev + curr; // 1,
      let temp = prev + curr;
      prev = curr;
      curr = temp;
      setSum(temp);
    };

  return (
    <div className='mt-10 flex flex-col gap-3'>
        <span>{`Next num is: ${sum}`}</span>
        <button onClick={handleClick}>Click Me</button>
    </div>
  )
}

export default Label;
