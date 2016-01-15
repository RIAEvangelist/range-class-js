'use strict';

const Range=require(`${__dirname}/../Range.js`);
const util=require('util');

const myRange=new Range;
const rangeObject={
    min:0,
    max:3,
    step:1
};
myRange.load(rangeObject);

console.log(util.inspect(myRange,{depth:3,colors:true}),'\n');

for(let i=myRange.min-1; i<myRange.max+1; i+=.5){
    let valid=myRange.isValid(i);

    console.log(`${valid?'\u2713':'x'} ${i} isValid : ${valid}`);
}
