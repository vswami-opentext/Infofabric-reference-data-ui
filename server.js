require('dotenv').config();
const express = require('express')
const app = express()
const axios = require('axios');
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, './dist/infofabric-reference-data-ui')))

app.all('/api/*', async(req, res) => {
	try{
		console.log('url--->', process.env.API_URL+''+req.url)
		return axios.get(process.env.API_URL+req.url)
			   .then(data => res.status(200).send(data.data))
			   .catch(err => res.send(err));
	 }
	 catch(err){
		console.error("api call error on all paths:", err);
	 }
})

app.get('/reference-data-ui/health', (req, res) => {
	console.log('Health checked');
    res.json({status: 'UP'});
})
const _app_folder = __dirname + '/dist/infofabric-reference-data-ui';

app.use('/reference-data-ui', express.static(_app_folder, {maxAge: '1m'}));

app.get('/*', (req, res) => {
	return res.sendFile(path.join(__dirname, './dist/infofabric-reference-data-ui/index.html'))
})

app.listen(4200, _ => console.log('Loaded Successfully...'))