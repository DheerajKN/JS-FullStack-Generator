import express from 'express';
import os from 'os';
import routes from './routes';

const app = express();

app.use(express.static('dist'));
app.use(express.json())

//  Connect all our routes to our application
app.use('/api', routes);
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
