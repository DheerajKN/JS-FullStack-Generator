import express from 'express';
import os from 'os';
import path from 'path';
import routes from './routes';

const app = express();

app.use(express.static('build'));
app.use(express.json())

//  Connect all our routes to our application
app.use('/api', routes);
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

//Detect which command ran and link subsequent index.html file on prod mode
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', `/build/index.html`))
})

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
