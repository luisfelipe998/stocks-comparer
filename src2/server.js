import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { getCompaniesStatsAndAvgStatsComparison } from './api/index.js';
import { sectorChoices, subsectorChoices } from './choices/index.js'

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(`${path.resolve()}/src2/public/index.html`);
});

app.get('/frontend/script', (req, res) => {
    res.sendFile(`${path.resolve()}/src2/public/script.js`)
});

app.post('/backend/comparison', async (req, res) => {
    try {
        res.send(await getCompaniesStatsAndAvgStatsComparison(req.body));
    } catch (e) {
        res.status(500).send({ error: 'There was an error processing the request. Review the input.'});
    }
});

app.get('/backend/sectors', (req, res) => {
    res.send(sectorChoices);
});

app.get('/backend/subsectors', (req, res) => {
    res.send(subsectorChoices);
});

const port = 3000;
app.listen(port, () => {
    console.log('App started on port ' + port)
})
