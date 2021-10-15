import Express from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import DrinksRouter from './routes/DrinksRouter';
import CafeRouter from './routes/CafeRouter';
import CafeViewRouter from './routes/CafeViewRouter';
import globalErrorHandler from './config/globalErrorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger';
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const App = Express();

App.use(compression());
App.use(cors());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded( { extended: true } ));
console.log(__dirname);
App.use(Express.static('./uploads'));
App.use('/uploads', Express.static('./uploads'));
App.use('/drinks', DrinksRouter);
App.use('/cafe', CafeRouter);
App.use('/cafes', CafeViewRouter);
App.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
App.use(globalErrorHandler);



export default App;