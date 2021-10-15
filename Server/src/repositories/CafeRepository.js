import pool from '../config/database';
import { GET_LOCATION, CREATE_CAFE, GET_CAFE_BY_UUID, CREATE_EMPLOYEE, 
    GET_EMPLOYEE_BY_UUID, GET_CAFES_BY_LOCATION, GET_ALL_EMPLOYEES} from './Query';
export class CafeRepository {
    /**
    * Function to create cafe
    * @function insertCafeInfo
    * @param {Array} inputArray 
    */
     static async insertCafeInfo (inputArray)  {
        return new Promise(async(resolve, reject) => {
            try {
            const db = await pool();
            db.query(CREATE_CAFE, inputArray, (err, res) => {
                if (err) {
                    throw err;
                }
                resolve(res);
            });
        } catch(error) {
            reject(error);
        }
        });
     } 

    /**
    * Function to create cafe
    * @function getLocationByName
    * @param {Array} inputArray 
    */
        static getLocationByName (locationName)  {
            return new Promise(async(resolve, reject) => {
            try {
                const db = await pool();
                db.query(GET_LOCATION, [locationName], (err, res) => {
                    if (err) {
                        throw err;
                    }
                    resolve(res);
                });
            } catch(error) {
                reject(error);
            }
            });

        } 

    /**
    * Function to create cafe
    * @function getLocationByName
    * @param {Array} inputArray 
    */
     static getCafeByUUID (uuid)  {
        return new Promise(async(resolve, reject) => {
        try {
            const db = await pool();
            db.query(GET_CAFE_BY_UUID, [uuid], (err, res) => {
                if (err) {
                    throw err;
                }
                resolve(res);
            });
        } catch(error) {
            reject(error);
        }
        });

    }

        /**
    * Function to add new employee to cafe
    * @function createEmployee
    * @param {Array} inputArray 
    */
         static async createEmployee (inputArray)  {
            return new Promise(async(resolve, reject) => {
                try {
                const db = await pool();
                db.query(CREATE_EMPLOYEE, inputArray, (err, res) => {
                    if (err) {
                        throw err;
                    }
                    resolve(res);
                });
            } catch(error) {
                reject(error);
            }
            });
         }

    /**
    * Function to get employee by UUID
    * @function getEmployeeByUUID
    * @param {Array} inputArray 
    */
     static getEmployeeByUUID (uuid)  {
        return new Promise(async(resolve, reject) => {
        try {
            const db = await pool();
            db.query(GET_EMPLOYEE_BY_UUID, [uuid], (err, res) => {
                if (err) {
                    throw err;
                }
                resolve(res);
            });
        } catch(error) {
            reject(error);
        }
        });

    }

     /**
    * Function to get employee by UUID
    * @function getEmployeeByUUID
    * @param {String} location 
    */
      static getCafesByLocation (location)  {
        return new Promise(async(resolve, reject) => {
        try {
            const db = await pool();
            db.query(GET_CAFES_BY_LOCATION, [location], (err, res) => {
                if (err) {
                    throw err;
                }
                resolve(res);
            });
        } catch(error) {
            reject(error);
        }
        });

    }

         /**
    * Function to get all employees sorted by thier days_worked
    * @function getAllEmployees
    */
    static getAllEmployees ()  {
        return new Promise(async(resolve, reject) => {
        try {
            const db = await pool();
            db.query(GET_ALL_EMPLOYEES, (err, res) => {
                if (err) {
                    throw err;
                }
                resolve(res);
            });
        } catch(error) {
            reject(error);
        }
        });

    }
 }
 export default CafeRepository;