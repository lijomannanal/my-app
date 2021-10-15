import CafeRepository from '../repositories/CafeRepository';
import Logger from '../config/logger';
import ErrorBase from '../errors/ErrorBase';
import ErrorCodes from '../errors/ErrorCodes';
import { UPLOAD_DIR } from '../config/constants';
const LOG = new Logger('CafeViewController.js');

 class CafeViewController {
  /**
   * Function to get cafes based on location
   * @function getCafesByLocation
   * @param {Object} req - ExpressJS req
   * @param {Object} res - ExpressJS res
   * @param {requestCallback} next - Callback that handles request
   */
   static async getCafesByLocation  (req, res, next) {
    try {
       const { location } = req.query;
       LOG.info(`Requesting getCafesByLocation with location ${location}`);
       let result = await CafeRepository.getCafesByLocation(location);
       result = result.map(item => {
         const { SERVER_HOST, PORT } = process.env;
         const logo = `http://${SERVER_HOST}:${PORT}${UPLOAD_DIR.split('.')[1]}${item.logo}`;
         return {...item, id: item.cafeID, logo, cafeID: undefined, locationId: undefined, }
       })

       return res.json(result);
    } catch (error) {
      LOG.error(error);
      next(error);
    }
  }

    /**
   * Function to fetch all employees
   * @function getAllEmployees
   * @param {Object} req - ExpressJS req
   * @param {Object} res - ExpressJS res
   * @param {requestCallback} next - Callback that handles request
   */
     static async getAllEmployees  (req, res, next) {
      try {
         const { location } = req.query;
         LOG.info(`Requesting all employees`);
         let result = await CafeRepository.getAllEmployees();
         result = result.map(item => {
           return {...item, id: item.employeeID, cafeId: undefined, id: undefined, }
         });
  
         return res.json(result);
      } catch (error) {
        LOG.error(error);
        next(error);
      }
    }
}
export default CafeViewController;