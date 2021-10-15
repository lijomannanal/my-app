import Logger from '../config/logger';
import ErrorBase from '../errors/ErrorBase';
import ErrorCodes from '../errors/ErrorCodes';
import { COFFEE_URL, BEER_URL, DRINK_TYPES, COFFEE_IMAGE_URL, BEER_DESCRIPTION } from '../config/constants';
import { remoteCall } from '../services/ApiService';
import { randomNumberFromInterval} from '../config/util';
import { v4 as uuidv4 } from 'uuid';
const LOG = new Logger('DrinksController.js');

 class DrinksController {
   /**
   * Function to get drinks based on type
   * @function getDrinks
   * @param {Object} req - ExpressJS req
   * @param {Object} res - ExpressJS res
   * @param {requestCallback} next - Callback that handles request
   */
    static async getDrinks  (req, res, next) {
      try {
         const { type } = req.query;
         LOG.info(`Requesting getDrinks with type ${type}`);

          if(!type || Object.values(DRINK_TYPES).includes(type)) {
             let promises = [];
             if(type === DRINK_TYPES.COFFEE) {
               promises.push(remoteCall(COFFEE_URL));
             } else if(type === DRINK_TYPES.BEER) {
               promises.push(remoteCall(BEER_URL));
             } else {
                promises.push(...[remoteCall(COFFEE_URL), remoteCall(BEER_URL)]);
             }
             let response = [];
            try {
             response = await Promise.all(promises);
            } catch (error) {
               throw new ErrorBase('Internal Error', ErrorCodes.RUNTIME_ERROR_CODE, 500);
            }

            let coffeData = [];
            let beerData = [];
            if (type === DRINK_TYPES.COFFEE || !type) {
              if (type === DRINK_TYPES.COFFEE) {
                coffeData = response[0];

              } else {
                  coffeData = response[0];
                  beerData = response[1];
              }     
            } else {
               beerData = response[0];
            }

            coffeData = await Promise.all(coffeData.map(async coffee => {
               let price = Math.floor(randomNumberFromInterval(8,20));
               price = `$${price}.99`;
               const rating = randomNumberFromInterval(1,5).toFixed(3);
               let image = await remoteCall(COFFEE_IMAGE_URL);
               image = image.file;
               const item = {...coffee, id: uuidv4(), name: coffee.title, price, rating, image, title: undefined, ingredients:undefined };
               return item;
            }));

            beerData = beerData.filter(beer => beer.id && typeof beer.id === 'number').map(beer => {
               const rating = beer.rating && beer.rating.average  ? beer.rating.average.toFixed(3): '0.000';
               const item = {...beer, id: uuidv4(), rating, description: BEER_DESCRIPTION[beer['name']] || '' };
               return item;
            });

            const data = [...coffeData, ...beerData];

            if(!type) {
               data.sort((a,b) => parseFloat(b.rating) - parseFloat(a.rating));
            }

            res.json(data);

          } else {
            LOG.error(`Invalid type ${type}`)
            throw new ErrorBase('Invalid type', ErrorCodes.INVALID_INPUT, 400);
          }

      } catch (error) {
        LOG.error(error);
        next(error);
      }
    }
}
export default DrinksController;