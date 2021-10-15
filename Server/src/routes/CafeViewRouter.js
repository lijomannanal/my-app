import Express from 'express';
import CafeViewController from '../controllers/CafeViewController';

const router = Express.Router();

/**
 * @swagger
 * /cafes:
 *   get:
 *     summary:  API to fetch cafes by location
 *     description: API to fetch cafes by location
 *     tags:
 *       - Cafes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: location
 *         description: location.
 *         in: query
 *         example: city1
 *         type: string
 *         enum: [city1, city2, city3, city4, city5]  
 *     responses:
 *       201:
 *         description: Ok
 *       500:
 *         description: System error
 *         schema: 
 *           $ref: '#/definitions/serverError'
 */ 
 router.get('/', CafeViewController.getCafesByLocation);

/**
 * @swagger
 * /cafes/employees:
 *   get:
 *     summary:  API to fetch all employees sorted in the days_worked
 *     description: API to fetch all employees sorted in the days_worked
 *     tags:
 *       - Cafes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/employeeData'  
 *       500:
 *         description: System error
 *         schema: 
 *           $ref: '#/definitions/serverError'
 * 
 */ 
   router.get('/employees', CafeViewController.getAllEmployees);

    export default router;

/**
 * @swagger
 *  definitions:
 *      cafeData:
 *        type: object
 *        properties: 
 *          name:
 *            type: string
 *            example: v4u
 *          description:
 *            type: string
 *            example: Top notch cafe!
 *          employees:
 *            type: int
 *            example: 10
 *          logo:
 *            type: string
 *            example: http://localhost:8080/uploads/abc.jpg
 *          location:
 *            type: string
 *            example: city1
 *          id:
 *            type: string
 *            example: UIABC567F
 *      employeeData:
 *        type: object
 *        properties: 
 *          name:
 *            type: string
 *            example: John
 *          days_worked:
 *            type: int
 *            example: 10
 *          cafe:
 *            type: string
 *            example: v4u
 *          id:
 *            type: string
 *            example: UIABC567F
 * 
 *      serverError:
 *        type: object
 *        properties: 
 *          errorCode:
 *            type: integer
 *            example: 99
 *          message:
 *            type: string
 *            example: Internal Server Error
 *      invalidInputError:
 *        type: object
 *        properties: 
 *          errorCode:
 *            type: integer
 *            example: 215
 *          message:
 *            type: string
 *            example: Invalid input!
 * 
 */

