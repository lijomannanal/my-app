import Express from 'express';
import DrinksController from '../controllers/DrinksController';


const router = Express.Router();

/**
 * @swagger
 * /drinks:
 *   get:
 *     summary:  API to fetch the drinks by type
 *     description: API to fetch the drinks by type 
 *     tags:
 *       - Drinks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: type
 *         description: Drinks type.
 *         in: query
 *         type: string   
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/drinksData'  
 *       400:
 *         description: Invalid input
 *         schema: 
 *           $ref: '#/definitions/invalidInputError' 
 *       500:
 *         schema: 
 *           $ref: '#/definitions/serverError'
 */ 
    router.get('/', DrinksController.getDrinks);

    export default router;

/**
 * @swagger
 *  definitions:
 *      drinksData:
 *        type: object
 *        properties: 
 *          id:
 *            type: string
 *            example: 1
 *          name:
 *            type: string
 *            example: coke
 *          price:
 *            type: string
 *            example: 10.99
 *          rating:
 *            type: string
 *            example: 4.4
 *          description:
 *            type: string
 *            example: Delicious
 *          image:
 *            type: string
 */




