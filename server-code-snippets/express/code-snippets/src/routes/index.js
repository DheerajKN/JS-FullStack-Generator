import { Router } from 'express';
import addresses from '../controller/addressController';

const routes = Router()

routes.get('/test', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.use('/addresses', addresses);

module.exports = routes;
