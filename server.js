'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
const express = require('express');
const app = express();
const fs = require('fs')

const path = require('path');


app.use(express.static(path.join('public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

const toneAnalyzer = new ToneAnalyzerV3({
    version_date: '2016-05-19',
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  });

  
app.post('/api/analyze_text', (req, res, next) => {
    const { userText } = req.body
    console.log('req.body', userText)

    const toneParams = {
    'tone_input': { 'text': userText},
    'content_type': 'application/json'
   }

toneAnalyzer.tone(toneParams, function (error, toneAnalysis){
    if (error) {
        console.log(error)
    } else {
        console.log('JSON.stringify(toneAnalysis, null, 2)', JSON.stringify(toneAnalysis, null, 2))
        res.send(toneAnalysis.document_tone.tone_categories[0])
    }
})
})


app.get('/api/test_json', (req, res, next) => {
    const jsonData = JSON.parse(fs.readFileSync('data/data.json'))
    //sending back emotional tone for document
    const documentTones = jsonData.document_tone.tone_categories[0] 
    const sentences = jsonData.sentences_tone
    
    console.log([documentTones, sentences])

    res.send([documentTones, sentences])
})

app.use((_req, res) => {
    res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
    if (err.output && err.output.statusCode) {
        return res
            .status(err.output.statusCode)
            .set('Content-Type', 'text/plain')
            .send(err.message);
    }

    console.log(err.stack);
    res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Listening on port', port);
});

module.exports = app;

