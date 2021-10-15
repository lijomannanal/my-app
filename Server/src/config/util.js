/**
 * Function to generate random number from 0 to 1
 * @function randomizeValue
 * @param {Number} min - Start range
 * @param {Number} res - End range
 */
const randomizeValue = () => {
	const value = (1 + 10E-16) * Math.random();
  	if (value > 1.0) {
    	return 1.0;
    }
  
  	return value;
}

/**
 * Function to generate random integer
 * @function randomNumberFromInterval
 * @param {Number} min - Start range
 * @param {Number} res - End range
 */

export const randomNumberFromInterval = (min, max) => {
    return min + (max - min) * randomizeValue();
}


  