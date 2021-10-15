import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import CafeRepository from '../repositories/CafeRepository';
import Logger from '../config/logger';
import { UPLOAD_DIR, UUID_REGEX } from '../config/constants';
import ErrorBase from '../errors/ErrorBase';
import ErrorCodes from '../errors/ErrorCodes';
const LOG = new Logger('UserController.js');
const path = require('path')

import fs from 'fs';

class CafeController {
   /**
   * Function to create new cafe
   * @function createCafe
   * @param {Object} req - ExpressJS req
   * @param {Object} res - ExpressJS res
   * @param {requestCallback} next - Callback that handles request
   */

    static async createCafe (req, res, next)  {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                if (!fs.existsSync(UPLOAD_DIR)){
                    fs.mkdirSync(UPLOAD_DIR);
                }
             cb(null, UPLOAD_DIR)
            },
            filename: (req, file, cb) => {
            cb(null, 'cafe_'+ Date.now()+ path.extname(file.originalname))
            },
        });
        try {
            const multerUploader = multer({ storage: storage })
            const upload = multerUploader.single('logo');

            upload(req, res, async function (err) {
                try {
                    if (err) {
                        throw new ErrorBase('Internal Error', ErrorCodes.RUNTIME_ERROR_CODE, 500);
                    }
                    const { name, description, location } = req.body;
                    const { filename: logo } = req.file;
                    console.log(req.file);
                    const locationInfo = await CafeRepository.getLocationByName(location);
                    if (locationInfo && locationInfo.length) {
                       const locationId = locationInfo[0]['id'];
                       const cafeID = uuidv4();
                       const input = [
                           cafeID, name, description, logo, locationId
                       ];
                       await CafeRepository.insertCafeInfo(input);
                    } else {
                        throw new ErrorBase('Invalid location', ErrorCodes.INVALID_INPUT, 400);
                    }
                    return res.sendStatus(201);
                } catch (error) {
                    LOG.error(error);
                    return res.status(400).json({ message: error.message}); 
                }
              });

        } catch (error) {
            LOG.error(error);
            next(error);
        }
       
    }

 /**
   * Function to create add employee to the cafe
   * @function addEmployee
   * @param {Object} req - ExpressJS req
   * @param {Object} res - ExpressJS res
   * @param {requestCallback} next - Callback that handles request
   */

  static async addEmployee (req, res, next)  {
    try {
        const { cafeID, employeeID, employeeName, daysWorked } = req.body;
        if (!new RegExp(UUID_REGEX).test(employeeID)) {
            throw new ErrorBase('Invalid employeeID format', ErrorCodes.INVALID_INPUT, 400);
        }
        const employeeInfo = await CafeRepository.getEmployeeByUUID(employeeID);
        if (employeeInfo && employeeInfo.length) {
            throw new ErrorBase('Employee with this employeeID already exists', ErrorCodes.INVALID_INPUT, 400);
        }
        const result = await CafeRepository.getCafeByUUID(cafeID);
        if (!result || !result.length) {
            throw new ErrorBase('Invalid CafeID', ErrorCodes.INVALID_INPUT, 400);
        }
        const cafeId = result[0]['id'];
        const input = [ employeeID, employeeName, daysWorked, cafeId];
        await CafeRepository.createEmployee(input);
        return res.sendStatus(201);
    } catch (error) {
        LOG.error(error);
        next(error);
    }

  };
}
export default CafeController;