'use strict';

const util=require('util');

/**
 * Range Class
 */
class Range{
    /**
     * [constructor description]
     * @method constructor
     * @param  {Object}    range Object containing min max and step
     * @return {Range}          class to handle valid range and step for values
     */
    constructor(range){
        Object.defineProperties(
            this,
            {
                min:{
                    enumerable:true,
                    get:getMin,
                    set:getMin
                },
                max:{
                    enumerable:true,
                    get:getMax,
                    set:getMax
                },
                step:{
                    enumerable:true,
                    get:getStep,
                    set:getStep
                },
                isValid:{
                    enumerable:true,
                    writable:false,
                    value:checkValidValue
                },
                load:{
                    enumerable:true,
                    writable:false,
                    value:loadRange
                }
            }
        );

        let min=0;
        let max=0;
        let step=0;

        if(range){
            loadRange(range);
        }

        /**
         * the Range min
         * @method getMin
         * @return {Number} Range.min
         */
        function getMin(){
            return min;
        }

        /**
         * the Range step
         * @method getStep
         * @return {Number} Range.step
         */
        function getStep(){
            return step;
        }

        /**
         * the Range max
         * @method getMax
         * @return {Number} Range.max
         */
        function getMax(){
            return max;
        }

        /**
         * converts an Object into a Range and checks validity
         * @method loadRange
         * @param  {Object}  range the range values
         * @return {Boolean}        success
         */
        function loadRange(range){
            let err;
            if(typeof range !== 'object' || Array.isArray(range)){
                err= new TypeError(
                    getTypeError({},range)
                );
                throw err;
            }

            if(typeof range.min !== 'number'){
                err= new TypeError(
                    getTypeError({},range.min,range)
                );
                throw err;
            }

            if(typeof range.max !== 'number'){
                err= new TypeError(
                    getTypeError({},range.max,range)
                );
                throw err;
            }

            if(typeof range.step !== 'number'){
                err= new TypeError(
                    getTypeError({},range.step,range)
                );
                throw err;
            }

            if(range.max<range.min){
                err= new TypeError(
                    `Expects min to be less than max
                        ${util.inspect(range,{depth:5, colors:true})}`
                );
                throw err;
            }

            min=range.min;
            max=range.max;
            step=range.step;

            return true;
        }
    }
}

/**
 * checks if value is valid for given range and step
 * @method checkValidValue
 * @param  {Number}        value proposed value
 * @return {Boolean}              value isValid
 */
function checkValidValue(value){
    let err;
    if(!isNaN(value) && typeof value !== 'number'){
        err= new TypeError(
            getTypeError(0,value,value)
        );
        throw err;
    }
    return(
        value<this.max
        && value>this.min
        && (
            Math.round(this.value*1e16) - Math.round(this.min*1e16)
        ) % Math.round(this.step*1e16) == 0
    );
}

/**
 * [getTypeError description]
 * @method getTypeError
 * @param  {Any}     expects example expectation
 * @param  {Any}     value   offending value
 * @param  {Any}     from   offending values containing object
 * @return {String}             Error String
 */
function getTypeError(expects,value,from){
    return `Expects ${typeof expects} but got ${typeof value}
        ${util.inspect(from,{depth:5, colors:true})}`;
}

module.exports=Range;
