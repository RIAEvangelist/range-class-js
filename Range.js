'use strict';

const util=require('util');

/**
 * Range Class
 *
 * @example
 *
 * const Range=require('range-class-js');
 *
 * const range1=new Range;
 * range1.min=0;
 * range1.max=100;
 * range1.step=10;
 *
 * const range2=new Range;
 * range2.load(
 * 		{
 * 			min:0,
 * 			max:50,
 * 			step:5
 * 		}
 * );
 *
 * const range3=new Range(
 * 		{
 * 			min:0,
 * 			max:10,
 * 			step:1
 * 		}
 * );
 *
 */
class Range{
    /**
     * creates a new range instance
     *
     * @constructor
     * @param  {Object}    range Object containing min max and step
     * @return {Range}          class to handle valid range and step for values
     */
    constructor(range){
        Object.defineProperties(
            this,
            {
                /**
                 * range min, set via load method or directly
                 * @memberof Range
                 * @type {Number}
                 */
                min:{
                    enumerable:true,
                    writable:true,
                    value:0
                },
                /**
                 * range max, set via load method or directly
                 * @memberof Range
                 * @type {Number}
                 */
                max:{
                    enumerable:true,
                    writable:true,
                    value:0
                },
                /**
                 * range step, set via load method or directly
                 * @memberof Range
                 * @default 1e-2 (0.01)
                 * @type {Number}
                 */
                step:{
                    enumerable:true,
                    writable:true,
                    value:1e-2
                },
                /**
                 * used to normalize values and steps during valid calculations
                 * @memberof Range
                 * @default 1e10
                 * @type {Number}
                 */
                stepNormalizer:{
                    enumerable:true,
                    writable:true,
                    value:1e10
                },
                /**
                 * checks if number is valid in range with given step
                 *
                 * @example
                 *
                 * const Range=require('range-class-js');                *
                 *
                 * const range=new Range;
                 * range.load(
                 *     {
                 *         min:0,
                 *         max:5,
                 *         step:1
                 *     }
                 * );
                 *
                 * let valid=range.isValid(1.5);
                 * //valid===false
                 *
                 * valid=range.isValid(2);
                 * //valid=== true
                 *
                 * @protected
                 * @method Range.isValid
                 * @param {Number} Number to check against range and step
                 * @returns {Boolean} Number is valid value in range with given step
                 */
                isValid:{
                    enumerable:true,
                    writable:false,
                    value:checkValidValue
                },
                /**
                * converts an Object into a Range and checks validity
                *
                * @example
                *
                * const Range=require('range-class-js');                *
                *
                * const range=new Range;
                * range.load(
                *     {
                *         min:0,
                *         max:5,
                *         step:0.05
                *     }
                * );
                *
                * @method Range.load
                * @protected
                * @param  {Object}  range the range values
                * @return {Boolean}        success
                 */
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
         * @private
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
 * @private
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
 * @private
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
