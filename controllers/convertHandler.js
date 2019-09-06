/*
*
*
*       Complete the handler logic below
*       
*       
*/


// var initNum = donvertHandler.getNum(input); could return invalid number
//       var initUnit = convertHandler.getUnit(input);
//       var returnNum = convertHandler.convert(initNum, initUnit);
            // might be a string and not num for invalid
//       var returnUnit = convertHandler.getReturnUnit(initUnit);
//       var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);


function ConvertHandler() {

  const invalidRegex = /[^\da-zA-Z\.\/]/  // any special chars not / or .
  const findFirstChar = input => input.search(/[a-zA-Z]/)
  const doubleOpRegex  = /[^\da-zA-Z][^\da-zA-Z]|\/.+\//
  const unitArray = ['gal', 'l', 'lbs', 'kg', 'mi', 'km', 
                    'GAL', 'L', 'LBS', 'KG', 'MI', 'KM']
  
  this.getNum = function(input) {
    if (invalidRegex.test(input)){ // if special chars, reject
      return 'invalid number'
    }
    if (findFirstChar(input) === 0 ){ // blank num, add 1 to string
      input = '1'+input
    }
    let result = input.slice(0, findFirstChar(input)) // split num before a-z
    if (doubleOpRegex.test(result)){ // if .. or /. etc..
      return 'invalid number'
    }
    //do the math string operation, round to 5 decimal points
    const mathString = eval(result).toFixed(5) 
    return parseFloat(mathString, 10 )
  };
  
  this.getUnit = function(input) {
    if (invalidRegex.test(input)){ // if special chars, reject
      return 'invalid unit'
    }
    let result = input.slice(findFirstChar(input)) // extract unit string
    if (!unitArray.includes(result)){ // if not on valid array, reject
      return 'invalid unit'
    }
    return result
  };
  
  this.spellOutUnit = function (input){
    if (!unitArray.includes(input.toLowerCase())){ // if not on valid array, reject
    return 'invalid unit'
    }
    
    let result;
    
    switch(input.toLowerCase()){
        case 'gal':
        result = 'gallons'
        break
      case 'l':
        result = 'liters'
        break
      case 'lbs':
        result = 'pounds'
        break
      case 'kg':
        result = 'kilograms'
        break
      case 'mi':
        result = 'miles'
        break
      case 'km':
        result = 'kilometers'
        break 
    }
    return result
  }
  
  this.getReturnUnit = function(initUnit) {
    initUnit = initUnit.toLowerCase()
    if(!unitArray.includes(initUnit)){
      return 'invalid unit'
    }
    
    let result;
    
    switch (initUnit){
      case 'gal':
        result = 'l'
        break
      case 'l':
        result = 'gal'
        break
      case 'lbs':
        result = 'kg'
        break
      case 'kg':
        result = 'lbs'
        break
      case 'mi':
        result = 'km'
        break
      case 'km':
        result = 'mi'
        break 
    }
    return result;
  };

  
  this.convert = function(initNum, initUnit) {
    initUnit = initUnit.toLowerCase()
    // ONLY FOR NUM return, so don't handle unit yet
    if (typeof(initNum) === 'string' || initUnit.includes('invalid')){
      return 'invalid number'
    }
    // at this point both values are valid. 
    
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    
    switch(initUnit){
      case 'gal':
        result = initNum * galToL
        break
      case 'l':
        result = initNum / galToL
        break
      case 'lbs':
        result = initNum * lbsToKg
        break
      case 'kg':
        result = initNum / lbsToKg
        break
      case 'mi':
        result = initNum * miToKm
        break
      case 'km':
        result = initNum / miToKm
        break
    }
    const returnNum = result.toFixed(5)
    const final = parseFloat(returnNum, 10)
    return final
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let message
    if (typeof(returnNum)==='string' && returnUnit.includes('invalid')){
      message = 'invalid number and unit'
    }
    else if (typeof(returnNum)==='string'){
      message = 'invalid number'
    }
    else if (returnUnit.includes('invalid')){
      message = 'invalid unit'
    }
    else {
    message = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    }

    const obj = {
       initNum,
    initUnit,
    returnNum,
    returnUnit,
    message  
    }

    return obj

 }
  
}

module.exports = ConvertHandler;
