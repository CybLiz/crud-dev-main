const mysql = require('mysql');
const conn = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
})

// Register a new user

const createUser = (req, res) => {
	// utilise req.body de body-parser
	const { name, last_name, address, city, zip_code, email, phone_number } = req.body;
	// Verifier si les champs sont remplis
	if (!name || !last_name || !address || !city || !zip_code || !email || !phone_number) {
		return res.status(400).json({ error: 'élément manquant', })
	}
	const query = 'INSERT INTO user (name, last_name, address, city, zip_code, email, phone_number) Values (?,?,?,?,?,?,?)';
	conn.query(query, [name, last_name, address, city, zip_code, email, phone_number], (err, result) => {
		if (err) {
			console.error('Erreur lors de l\'insertion des données : ' + err);

			res.status(500).json({ error: 'Erreur lors de l\'insertion des données' });
		} else {
			res.status(200).json({ message: 'Utilisateur enregistré' });
		}


	});
};

const editUser = (req, res) => {

	const { name, last_name, address, city, zip_code, email, phone_number } = req.body;

	const query = 'UPDATE user SET name = ?, last_name = ?, address = ?, city = ?, zip_code = ?, email = ?, phone_number = ? WHERE idUser = ?';

	conn.query(query, [name, last_name, address, city, zip_code, email, phone_number, req.params.id], (err) => {
		if (err) {
			console.error('Erreur lors de la modification de l\'utilisateur: ' + err);

			res.status(500).json({ error: 'Erreur lors de la modification de l\'utilisateur' });
		} else {
			res.status(200).json({ message: 'Utilisateur modifié' });
			console.log(id)
		}


	});
};


const deleteUser = (req, res) => {

	//  = ? va dire quand tu clique sur le bouton delete liza tu récupére id de l'utilisateur en question pour le supprimer 
	const query = ' DELETE FROM `user` WHERE idUser = ?';

	conn.query(query, [req.params.id], (err, result) => {
		if (err) {
			console.error('Erreur lors de la suppression de l\'utilisateur: ' + err);

			res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
		} else {
			res.status(200).json({ message: 'Utilisateur supprimé' });
		}


	});
};


// get all users
const getUsers = (req, res) => {
	const query = 'SELECT * FROM user';
	conn.query(query, (err, result) => {
		if (err) {
			console.error("Erreur lors de la récupération des données : " + err);
			res.status(500).json({ error: "Erreur lors de la récupération des données" });
		} else {
			res.status(200).json(result);
		}
	})
}

const getOneUser = (req, res) => {
	const userId = req.params.id;
	const query = `SELECT name, last_name, address, city, zip_code, email, phone_number FROM user WHERE idUser = ${userId}`;
	conn.query(query, (err, result) => {
		if (err) {
			console.error("Erreur lors de la récupération des données :" + err);
			res.status(500).json({ error: "Erreur lors de la récupération des données" })
		} else {
			res.status(200).json(result)
		}
	})
}

module.exports = {
	createUser,
	getUsers,
	deleteUser,
	editUser,
	getOneUser
};