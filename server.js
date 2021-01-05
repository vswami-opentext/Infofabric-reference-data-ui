require('dotenv').config();
const express = require('express')
const app = express()
const axios = require('axios');
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.json())

// app.use(express.static(path.join(__dirname, './dist/infofabric-reference-data-ui')))
app.use((req, res, next) => {
		console.log('-------------------headers1------------------------\n');
		console.log('url 1--->', req.url);
		next();
});
app.get('/api/*', async(req, res) => {
	try{
		console.log('-------------------headers------------------------\n');
		console.dir(req.headers);
		console.log('-------------------IM_UserID-----------------\n');
		console.log('im_userid', req.headers['im_userid']);
		console.log('im_buid', req.headers['im_buid']);
		console.log('smuser', req.headers['smuser']);
		console.log('smuserdn', req.headers['smuserdn']);
		console.log('---------------------************----------------------\n');
		console.log('url--->', process.env.API_URL+req.url);
		return axios.get(process.env.API_URL+req.url)
			   .then(data => res.status(200).send(data.data))
			   .catch(err => res.send(err));
	 }
	 catch(err){
		console.error("api call error on all paths:", err);
	 }
})

app.get('/health', (req, res) => {
	console.log('Health checked');
    res.json({status: 'UP'});
})
const _app_folder = __dirname + '/dist/infofabric-reference-data-ui';

app.use('/reference-data-ui', express.static(_app_folder, {maxAge: '1m'}));

app.get('/*', (req, res) => {
	return res.sendFile(path.join(__dirname, './dist/infofabric-reference-data-ui/index.html'))
})

app.listen(4200, _ => console.log('Loaded Successfully...'))