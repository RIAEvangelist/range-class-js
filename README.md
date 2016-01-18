<a name="Range"></a>
## Range
Range Class

**Kind**: global class  

* [Range](#Range)
    * [new Range(range)](#new_Range_new)
    * [.min](#Range.min) : <code>Number</code>
    * [.max](#Range.max) : <code>Number</code>
    * [.step](#Range.step) : <code>Number</code>
    * [.stepNormalizer](#Range.stepNormalizer) : <code>Number</code>
    * [.isValid(Number)](#Range.isValid) ⇒ <code>Boolean</code>
    * [.load(range)](#Range.load) ⇒ <code>Boolean</code>

<a name="new_Range_new"></a>
### new Range(range)
creates a new range instance


| Param | Type | Description |
| --- | --- | --- |
| range | <code>Object</code> | Object containing min max and step |

**Example**  
```javascript
const Range=require('range-class-js');

const range1=new Range;
range1.min=0;
range1.max=100;
range1.step=10;

const range2=new Range;
range2.load(
		{
			min:0,
			max:50,
			step:5
		}
);

const range3=new Range(
		{
			min:0,
			max:10,
			step:1
		}
);
```
<a name="Range.min"></a>
### Range.min : <code>Number</code>
range min, set via load method or directly

**Kind**: static property of <code>[Range](#Range)</code>  
<a name="Range.max"></a>
### Range.max : <code>Number</code>
range max, set via load method or directly

**Kind**: static property of <code>[Range](#Range)</code>  
<a name="Range.step"></a>
### Range.step : <code>Number</code>
range step, set via load method or directly

**Kind**: static property of <code>[Range](#Range)</code>  
**Default**: <code>1e-2 (0.01)</code>  
<a name="Range.stepNormalizer"></a>
### Range.stepNormalizer : <code>Number</code>
used to normalize values and steps during valid calculations

**Kind**: static property of <code>[Range](#Range)</code>  
**Default**: <code>1e10</code>  
<a name="Range.isValid"></a>
### Range.isValid(Number) ⇒ <code>Boolean</code>
checks if number is valid in range with given step

**Kind**: static method of <code>[Range](#Range)</code>  
**Returns**: <code>Boolean</code> - Number is valid value in range with given step  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| Number | <code>Number</code> | to check against range and step |

**Example**  
```javascript
const Range=require('range-class-js');                *

const range=new Range;
range.load(
    {
        min:0,
        max:5,
        step:1
    }
);

let valid=range.isValid(1.5);
//valid===false

valid=range.isValid(2);
//valid=== true
```
<a name="Range.load"></a>
### Range.load(range) ⇒ <code>Boolean</code>
converts an Object into a Range and checks validity

**Kind**: static method of <code>[Range](#Range)</code>  
**Returns**: <code>Boolean</code> - success  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| range | <code>Object</code> | the range values |

**Example**  
```javascript
const Range=require('range-class-js');                *

const range=new Range;
range.load(
    {
        min:0,
        max:5,
        step:0.05
    }
);
```
