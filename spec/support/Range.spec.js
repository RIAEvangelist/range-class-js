'use strict';

const Range=require('../../Range.js');

describe(
    'All methods on the range class should work',
    describeRangeTests
);

function describeRangeTests(){
    it(
        'should initialize with no parameters',
        initRangeWithNoParameters
    );

    it(
        'should initialize with Object',
        initRangeWithObject
    );

    it(
        'should work with large numbers',
        initRangeWithLargeNumbers
    );

    it(
        'should work with small numbers',
        initRangeWithSmallNumbers
    );

    it(
        'should work with negative numbers',
        initRangeWithNegativeNumbers
    );

    it(
        'should not initialize with object if min>max',
        minLessMax
    );

    it(
        'should only load numbers on object for values',
        onlyNumbers
    );

    it(
        'should only validate numbers',
        onlyValidateNumbers
    );
}

function initRangeWithNoParameters(done){
    const range=new Range;
    expect(range.min).toBe(0);
    expect(range.max).toBe(0);
    expect(range.step).toBe(1e-2);
    expect(range.isValid(0)).toBe(true);
    expect(range.isValid(0.01)).toBe(false);
    expect(range.load).toBeDefined();
    done();
}

function initRangeWithObject(done){
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
    expect(range.isValid(-1)).toBe(false);
    expect(range.isValid(1.5)).toBe(false);
    expect(range.isValid(3)).toBe(true);
    expect(range.isValid(7)).toBe(false);
    expect(range.load).toBeDefined();
    done();
}

function initRangeWithLargeNumbers(done){
    const range=new Range;
    range.max=range.stepNormalizer;
    range.step=1e5;
    for(let i=range.min; i<range.max; i+=range.step){
        expect(range.isValid(i)).toBe(true);
    }
    done();
}

function initRangeWithSmallNumbers(done){
    const range=new Range;
    range.max=1;
    range.step=1e-5;
    for(let i=range.min; i<range.max; i+=range.step){
        expect(range.isValid(i)).toBe(true);
    }
    done();
}

function initRangeWithNegativeNumbers(done){
    const range=new Range;
    range.min=-100;
    range.max=-1;
    range.step=1;

    for(let i=range.min; i<range.max; i+=range.step){
        expect(range.isValid(i)).toBe(true);
    }
    done();
}

function minLessMax(done){
    let failed=false;
    try{
        const range=new Range(
            {
                min:5,
                max:1,
                step:1
            }
        );
    }catch(err){
        failed=true;
    }

    expect(failed).toBe(true);
    done();
}

function onlyNumbers(done){
    let fail=0;
    const rangeObj={
        min:'a',
        max:1,
        step:1
    };

    const range=new Range;

    try{
        range.load(1);
    }catch(err){
        fail++;
    }

    try{
        range.load(rangeObj);
    }catch(err){
        fail++;
    }

    rangeObj.max=rangeObj.min;
    rangeObj.min=0;

    try{
        range.load(rangeObj);
    }catch(err){
        fail++;
    }

    rangeObj.step=rangeObj.max;
    rangeObj.max=1;

    try{
        range.load(rangeObj);
    }catch(err){
        fail++;
    }

    expect(fail).toBe(4);
    done();
}

function onlyValidateNumbers(done){
    const range=new Range;
    expect(range.isValid('a')).toBe(false);
    expect(range.isValid(NaN)).toBe(false);
    expect(range.isValid(false)).toBe(false);
    expect(range.isValid(null)).toBe(false);
    expect(range.isValid(undefined)).toBe(false);
    expect(range.isValid()).toBe(false);
    expect(range.isValid([1])).toBe(false);
    expect(range.isValid({})).toBe(false);
    done();
}
