import Express from 'express';
import CafeController from '../controllers/CafeController';


const router = Express.Router();

/**
 * @swagger
 * /cafe:
 *   post:
 *     summary:  API to create cafe
 *     description: API to create cafe
 *     tags:
 *       - Cafe
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of the cafe
 *         in: formData
 *         type: string
 *         example: Cafe1
 *       - name: description
 *         description: Description of the cafe
 *         in: formData
 *         type: string
 *         example: Cafe1
 *       - name: logo
 *         description: Logo of the cafe
 *         in: formData
 *         type: file
 *       - name: location
 *         description: Location of the cafe
 *         in: formData
 *         type: string
 *         example: Cafe1 
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Invalid input
 *         schema: 
 *           $ref: '#/definitions/invalidInputError' 
 *       500:
 *         schema: 
 *           $ref: '#/definitions/serverError'       
 */ 

 

    router.post('/', CafeController.createCafe);

/**
 * @swagger
 * /cafe/employee:
 *   post:
 *     summary:  API to add employee to cafe
 *     description: API to add employee to cafe
 *     tags:
 *       - Cafe
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of the cafe
 *         in: body
 *         type: object
 *         properties: 
 *           cafeID:
 *             type: string
 *             example: 19de0b20-02ab-4e22-9c20-5d9dca3e1518
 *           employeeID:
 *             type: string
 *             example: UIABC567F
 *           employeeName:
 *             type: string
 *             example: John
 *           daysWorked:
 *             type: int
 *             example: 10
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Invalid input
 *         schema: 
 *           $ref: '#/definitions/invalidInputError' 
 *       500:
 *         schema: 
 *           $ref: '#/definitions/serverError'  
      
 */ 
    router.post('/employee', CafeController.addEmployee);

    export default router;





