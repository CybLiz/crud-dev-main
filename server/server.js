// 1 installation des dépendences
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const userRoutes = require('./routes/user.route');
// analyse la requête
const cors = require('cors');


const connectDB= require('./config/db')

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors({
	origin: 'http://127.0.0.1:5050',
	optionSuccessStatus:200,

}))
app.use('/' , userRoutes);



const start = async() => {
	try {
		await connectDB();
		const port = process.env.PORT || 5050;
		app.listen(port,() =>{
			console.log(`le serveur à démarré sur leport ${port}`);
		})
	} catch { 
		console.log('Erreur lors du démarrage du serveur');
	}
};


start();
