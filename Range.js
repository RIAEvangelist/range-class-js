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
                    writable:true,
                    value:0
                },
                max:{
                    enumerable:true,
                    writable:true,
                    value:0
                },
                step:{
                    enumerable:true,
                    writable:true,
                    value:1e-2
                },
                stepNormalizer:{
                    enumerable:true,
                    writable:true,
                    value:1e10
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

        if(range){
            this.load(range);
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

            this.min=range.min;
            this.max=range.max;
            this.step=range.step;

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
    if(isNaN(value) || typeof value !== 'number'){
        return false;
    }
    return(
        value<=this.max
        && value>=this.min
        && (
            Math.round(value*this.stepNormalizer) - Math.round(this.min*this.stepNormalizer)
        ) % Math.round(this.step*this.stepNormalizer) == 0
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
