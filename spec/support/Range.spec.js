'use strict';

const Range=require('../../Range.js');

describe(
    'All methods on the range class should work',
    describeRangeTests
)

function describeRangeTests(done){

    it(
        'should initialize with no parameters',
        initRangeWithNoParameters
    );

    it(
        'should initialize with valid parameters',
        initRangeWithNoParameters
    );

    done();

}

function initRangeWithNoParameters(done){
    const range=new Range;
    console.log(12,range);
    expect(range.min).toBe(0);
    expect(range.max).toBe(0);
    expect(range.step).toBe(0);
    expect(range.isValid(0)).toBe(false);
    expect(range.load).toBeDefined();
    done();
}

function initRangeWithNoParameters(done){
    const range=new Range(
        {
            min:0,
            max:5,
            step:1
        }
    );

    expect(range.min).toBe(0);
    expect(range.max).toBe(5);
    expect(range.step).toBe(1);
    expect(range.isValid(1.5)).toBe(false);
    expect(range.isValid(7)).toBe(true);
    expect(range.load).toBeDefined();
    done();
}
