import React from 'react';
const makeData = (number, titlePrefix = 'Tab') => {
  const data = [];
  for (let i = 0; i < number; i++) {
    data.push({
      title: `${titlePrefix} ${i}`,
      content:
        <div style={{fontSize:'17px'}}>
          Tab {i} contents
        </div>
    });
  }
  return data;
}

export {makeData};