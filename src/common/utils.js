export const NUM = 1
export const STRING = 2
export const WORDNUM = 3

<<<<<<< HEAD
let globalCount = 0
=======
let globalCount = 1
>>>>>>> streamlining

/**
 * generates a random word, of length size
 * @param {*} size 
 */
export const genWord = function(size) {
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	let length = possible.length;
	let characters = [];
  	for (let i = 0; i < size; i++) {
    	characters.push(possible.charAt(Math.floor(Math.random() * length)));
  	}
	return characters.join('');
}

/**
 * Generates a random number, given size the number of digits
 * @param {*} size 
 */
export const genWordNumber = function(size) {
	let possible = "0123456789";
	let length = possible.length;
	let characters = [];
	for (let i = 0; i < size; i++) {
		characters.push(possible.charAt(Math.floor(Math.random() * length)));
	}
	return characters.join('');
}

/**
 * Generates a random number, given size the number of digits
 * @param {*} size 
 */
export const genNumber = function(size) {
	return String(Math.floor(Math.random() * Math.pow(size, 10)));
}

const cleanHeaders = function (headers) {
	for (let h of headers) {
		h.minSize = h.minSize || 0
		h.maxSize = h.maxSize || 1
	}
}

/**
 * Generates a obj randomly
 * @param {Header[]} headers 
 */
export const generateRandomObj = function (headers, id) {
	let obj = {}
	cleanHeaders(headers)
	for (let h of headers) {
		let result = null
		let size = Math.floor(Math.random() * (h.maxSize - h.minSize + 1)) + h.minSize
		size = size === 0 ? 1 : size
		if (h.type === NUM) {
			result = genNumber(size)
		} else if (h.type === WORDNUM) {
			result = genWordNumber(size)
		} else if (h.type === STRING) {
			result = genWord(size)
		}
		else {
			result = genWord(size)
		}
		result = h.format ? h.format(result) : result
		obj[h.field] = result
	}
	obj.id = id
	return obj
}

/**
 * generates the num of objects randomly as requested
 * @param {Header[]} headers 
 * @param {Number} num 
 */
export const generateRandomObjs = function (headers, num) {
	let objects = []
	for (let i = 0; i < num; i++) {
		globalCount++
		objects.push(generateRandomObj(headers, globalCount))
	}
	globalCount++
	return objects
}


export const formatDollars = (value) => {
    if (value) {
      let negative = value < 0 ? "-" : "";
      let money = negative + "$" + formatCommas(value);
      return money;
    }
    else {
      return "";
    }
}

export const formatCommas = (value) => {
    let numberString = String(Math.abs(value)).split("").reverse();
    let s = [];
    for(let i in numberString) {
			let valid = Number(i) % 3 === 0 && Number(i) !== 0
      if (valid) {
        s.push(",");
      }
      s.push(numberString[i]);
		}
    return s.reverse().join("", "");
}
