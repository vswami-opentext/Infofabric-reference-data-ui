require('dotenv').config();
const express = require('express')
const app = express()
const axios = require('axios');
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, './dist/infofabric-reference-data-ui'))) // BUT ON PRODUCTION -> nginx

app.all('/api/*', async(req, res) => {
	try{
		return axios.get(process.env.API_URL+req.url)
			   .then(data => res.status(200).send(data.data))
			   .catch(err => res.send(err));
	 }
	 catch(err){
		console.error("GG", err);
	 }
})
app.get('/health', (req, res) => {
    res.json({status: 'UP'});
})

app.get('/*', (req, res) => {
	return res.sendFile(path.join(__dirname, './dist/infofabric-reference-data-ui/index.html'))
})

app.listen(4200, _ => console.log('Loaded Successfully...'))