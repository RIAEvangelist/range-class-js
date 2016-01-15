'use strict';

const Range=require(`${__dirname}/../Range.js`);
const util=require('util');

const myRange=new Range;
myRange.min=0;
myRange.max=3;
myRange.step=1;

console.log(util.inspect(myRange,{depth:3,colors:true}),'\n');

for(let i=myRange.min-1; i<myRange.max+1; i+=.5){
    let valid=myRange.isValid(i);

    console.log(`${valid?'\u2713':'x'} ${i} isValid : ${valid}`);
}
