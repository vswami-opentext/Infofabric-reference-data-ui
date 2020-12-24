require('dotenv').config();
const express = require('express')
const app = express()
const axios = require('axios');
const bodyParser = require('body-parser')
const session = require('express-session') // -> session storage using mongo
const path = require('path')

app.use(session({ secret: 'zz', resave: true, saveUninitialized: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, './dist/infofabric-reference-data-ui'))) // BUT ON PRODUCTION -> nginx

app.all('/api/*', async(req, res) => {
	req.session.quote = req.body.quote;
	try{
		return axios.get(process.env.API_URL+req.url)
			   .then(data => res.status(200).send(data.data))
			   .catch(err => res.send(err));
	 }
	 catch(err){
		console.error("GG", err);
	 }
})

app.get('/*', (req, res) => {
	return res.sendFile(path.join(__dirname, './dist/infofabric-reference-data-ui/index.html'))
})

app.listen(4200, _ => console.log('Loaded Successfully...'))