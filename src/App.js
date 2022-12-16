import React from 'react'
import { useState } from "react";
import Upload from './Upload';
const App = () => {
  const data = [
    [1,2,"2019-12-25","2020-12-28"],
    [1,3,"2018-10-12",null],
    [1,4,"2019-11-16",null],
    [1,5,"2020-1-5","2020-12-21"],
    [2,1,"2018-10-3",null],
    [2,2,"2019-1-16","2020-3-24"],
    [2,3,"2019-5-22","2019-12-26"],
    [2,4,"2020-3-7",null],
    [2,5,"2018-1-24","2019-1-15"],
    [3,1,"2019-3-21","2020-11-26"],
    [3,5,"2019-9-28","2020-12-25"],
    [4,2,"2018-10-22",null],
    [4,3,"2018-1-27","2020-8-28"],
    [5,3,"2018-2-3","2020-10-14"],
    [5,5,"2018-8-4",null]
  ];
  
  const overlap = (e1d1, e1d2, e2d1, e2d2) => {
  
    const startDate1 = new Date(e1d1);
    const endDate1 = e1d2 === null ? new Date() : new Date(e1d2);
    const startDate2 = new Date(e2d1);
    const endDate2 = e2d2 === null ? new Date() : new Date(e2d2);
  
    const start = startDate1 < startDate2 ? startDate2 : startDate1;
    const end = endDate1 < endDate2 ? endDate1 : endDate2;
  
    if (end >= start) {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    
    return 0;
  };
  
  const result = data.reduce((acc, el) => {
    let c = acc[el[1]];
    if (!c) {
      c = acc[el[1]] = {
        overlap: 0,
        e1: 0,
        e2: 0,
        data: []
      };
    };
    
    c.data.forEach(d => {
      const o = overlap(d[2], d[3], el[2], el[3]);
      if (o > c.overlap) {
        c.overlap = o;
        c.e1 = d[0];
        c.e2 = el[0];
      }
    });
    
    c.data.push(el);
    return acc;
  
  }, {});
  
  const deObjectify = Object.entries(result).map(([projectId, {e1, e2, overlap}]) => ({e1, e2, projectId, overlap}));
  
  console.log(deObjectify);
  
  console.log("inner workings");
  console.log(result);
  return (
   <div>
    <Upload/>
   </div>
  )
}

export default App
