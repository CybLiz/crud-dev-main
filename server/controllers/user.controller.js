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




router.put('/profil/:id', auth, userCtrl.editUser);



exports.editUser = (req, res) => {

	const { nom, prenom, email} = req.body;

	const query = `UPDATE users SET nom = ?, prenom = ?, email = ? WHERE id= '${req.auth.userId}'`;

	Connection.query(query, [nom, prenom, email], (err) => {
		if (err) {
			console.error('Erreur lors de la modification de l\'utilisateur: ' + err);

			res.status(500).json({ error: 'Erreur lors de la modification de l\'utilisateur' });
		} else {
			res.status(200).json({ message: 'Utilisateur modifié' });
			console.log(id)
		}


	});
};





import React, { useState, useEffect } from "react";
import Axios from "axios";
import emailjs from "emailjs-com";

import "../../style/DonneesPersonnelles.css";

import { MdEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { ImLocation } from "react-icons/im";
import { BsFillPersonFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

function maskPassword(password) {
  return "*".repeat(password.length);
}

function Parametre() {
  const isAuthenticated = !!localStorage.token;

  const [UserData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); // Ajout d'un état pour gérer le chargement

  useEffect(() => {
    if (isAuthenticated) {
      Axios.get(`http://localhost:3000/api/auth/profil`)
        .then((response) => {
          setUserData(response.data[0]);
          setLoading(false); // Mettre à jour l'état de chargement à false lorsque les données sont chargées
          console.log(response.data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des données de l'utilisateur",
            error
          );
          setLoading(false); // Mettre à jour l'état de chargement en cas d'erreur
        });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Veuillez vous connecter pour accéder aux paramètres.</div>;
  }

  const [visibleModalId, setVisibleModalId] = useState(false);
  const openModal = () => {
    setVisibleModalId(true);
  };
  const closeModal = () => {
    setVisibleModalId(false);
  };

  const [verificationCode, setVerificationCode] = useState("");

  const [codeGenerated, setCodeGenerated] = useState(false);

  const handleChangeEmail = () => {
    // Générez et envoyez le code de vérification côté serveur (vous devrez implémenter cette partie)
    function generateVerificationCode() {
      const min = 100000;
      const max = 999999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const sendGeneratedCode = (e) => {
      e.preventDefault();

      emailjs
        .sendGenerateVerificationCode(
          "service_pmkyhoi",
          "template_v73k1xn",
          e.target,
          "VrlLLWa_n6uFKsZXd"
        )
        .then((result) => {
          console.log("E-mail envoyé avec succès :", result.text);
        })
        .catch((error) => {
          console.error("Erreur lors de lenvoi de le-mail :", error);
        });
    };

    setCodeGenerated(true);
    openModal();
  };

  return (
    <>
      {loading ? (
        // Si les données sont en cours de chargement, affichez un indicateur de chargement
        <p>Chargement en cours...</p>
      ) : (
        // Si les données sont chargées, affichez les données
        <div className="donneesPersonnelles">
          <h1>Mes données personnelles</h1>
          <p>
            Voir et mettre à jour vos informations ici. Gérez vos identifiants
            et mots de passe ici.
          </p>

          <div className="infoPerso">
            <div className="info">
              <div className="accounIcon">
                <BsFillPersonFill className="icon" />
              </div>

              <div className="complete">
                <div className="droite">
                  <div>
                    <p>Nom :</p>
                    <span>{UserData.nom}</span>
                  </div>
                  <div>
                    <p>Prénom :</p>
                    <span>{UserData.prenom}</span>
                  </div>
                </div>

                <div className="bouton">
                  <button
                    className="update"
                    onClick={() => setVisibleModalId("info")}
                  >
                    Modifier
                  </button>
                </div>
              </div>

              <div className="gauche">
                <div>
                  <p>Numéro de téléphone :</p>
                  <span></span>
                </div>
                <div>
                  <p>Date de naissance :</p>
                  <span></span>
                </div>
              </div>
            </div>

            <form className="updateModal">
              {visibleModalId === "info" && (
                <div className="InfoModalContent">
                  <RxCross2 className="modalCross" onClick={closeModal} />

                  <h3> Mettre à jour mes coordonnées </h3>
                  <input type="text" placeholder="Nom" value={UserData.nom} />
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={UserData.prenom}
                  />
                  <input type="date" placeholder="Date de naissance" />
                  <input type="text" placeholder="Numéro de téléphone" />

                  <div className="submit">
                    <button type="submit" id="submit">
                      Enregister
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="infoPlus">
              <div className="adresse infodiv">
                <div className="addInfo">
                  <p>
                    <ImLocation className="icon" />
                    Mes Adresses
                  </p>
                  <span>20 rue Cugnot 59100</span>
                </div>

                <div className="bouton">
                  <button
                    className="update"
                    onClick={() => setVisibleModalId("address")}
                  >
                    Modifier
                  </button>
                </div>

                <div className="updateModal">
                  {codeGenerated && visibleModalId === "address" && (
                    <div className="addressModalContent">
                      <RxCross2 className="modalCross" onClick={closeModal} />
                      <h1>Mes Adresses</h1>
                      <h2>Ajoutez ou modifiez vos adresses ici</h2>

                      <div className="deliveryAdress">
                        <h5>Adresse de livraison </h5>
                        {/* Ajoutez ici les champs d'adresse de livraison */}
                      </div>

                      <div className="bilingAdress">
                        <h5>Adresse de facturation </h5>
                        {/* Ajoutez ici les champs d'adresse de facturation */}
                      </div>

                      <div className="newAddress">
                        {/* Ajoutez ici la possibilité d'ajouter une nouvelle adresse */}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="email infodiv">
                <div className="addInfo">
                  <p>
                    <MdEmail className="icon" />
                    Mon adresse Email
                    <br />
                  </p>
                  <span>{UserData.email}</span>
                </div>

                <div className="bouton">
                  <button
                    className="update"
                    onClick={() => setVisibleModalId("email", sendGeneratedCode)}
                  >
                    Modifier
                  </button>
                </div>

                <div className="updateModal">
                  {codeGenerated && visibleModalId === "email" && (
                    <div className="emailModalContent">
                      <RxCross2 className="modalCross" onClick={closeModal} />
                      <h5>Assurons-nous qu'il s'agit bien de vous, Liza</h5>
                      <p>
                        Veuillez saisir le code de sécurité à 6 chiffres envoyé
                        à liza.bahloul@gmail.com.
                      </p>
                      <input
                        type="text"
                        placeholder="Code de sécurité"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      <button type="submit" className="continuer">
                        Conituer
                      </button>
                      <p>
                        Vous n'avez pas reçu de code ? Vérifiez votre dossier
                        spam ou obtenir un nouveau code.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="motDePasse infodiv">
                <div className="addInfo">
                  <p>
                    <RiLock2Fill className="icon" />
                    Mon mot de passe
                    <br />
                  </p>
                  <span>********</span>
                </div>
                <div className="bouton">
                  <button
                    className="update"
                    onClick={() => setVisibleModalId("password")}
                  >
                    Modifier
                  </button>
                </div>

                <div className="updateModal">
                  {visibleModalId === "password" && (
                    <div className="passwordModalContent">
                      <RxCross2 className="modalCross" onClick={closeModal} />

                      <h5>Changer le mot de passe</h5>
                      <p>
                        N’hésitez pas à mettre à jour votre mot de passe à tout
                        moment afin de sécuriser votre compte GMA.
                      </p>
                      <input
                        type="password"
                        placeholder="Mot de passe actuel"
                      />
                      <input
                        type="password"
                        placeholder="Nouveau Mot de passe"
                      />
                      <input
                        type="password"
                        placeholder="Confirmez ce nouveau passe"
                      />
                      <button type="submit">Enregister</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Parametre;





import React, { useState, useEffect } from "react";
import Axios from "axios";
import emailjs from "@emailjs/browser";

import "../../style/DonneesPersonnelles.css";

import { MdEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { ImLocation } from "react-icons/im";
import { BsFillPersonFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

function maskPassword(password) {
  return "*".repeat(password.length);
}

function Parametre() {
  const isAuthenticated = !!localStorage.token;

  const [UserData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); // Ajout d'un état pour gérer le chargement
  const [codeGenerated, setCodeGenerated] = useState(false);
  const [visibleModalId, setVisibleModalId] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");


  useEffect(() => {
    if (isAuthenticated) {
      Axios.get(`http://localhost:3000/api/auth/profil`)
        .then((response) => {
          setUserData(response.data[0]);
          setLoading(false); // Mettre à jour l'état de chargement à false lorsque les données sont chargées
          // console.log(response.data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des données de l'utilisateur",
            error
          );
          setLoading(false); // Mettre à jour l'état de chargement en cas d'erreur
        });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Veuillez vous connecter pour accéder aux paramètres.</div>;
  }

  const openModal = () => {
    setVisibleModalId(true);
  };
  const closeModal = () => {
    setVisibleModalId(false);
  };

      
    // const generateVerificationCode = () => {
    //   const min = 100000;
    //   const max = 999999;
    //   return Math.floor(Math.random() * (max - min + 1)) + min;
    // };


    function generateVerificationCode(size) {
      const c = '1234567890';
      let codeGenerated = ``;
      for (let i = 0; i < size; i++) {
        codeGenerated += c.charAt(Math.random() * c.length);
    
      }
    }
      
console.log(generateVerificationCode )


    const sendGeneratedCode = (e) => {
      e.preventDefault();

      emailjs
        .generateVerificationCode(
          "service_pmkyhoi",
          "template_v73k1xn",
          e.target,
          "VrlLLWa_n6uFKsZXd"
        )
        .then((result) => {
          console.log("E-mail envoyé avec succès :", result.text);
        })
        .catch((error) => {
          console.error("Erreur lors de lenvoi de le-mail :", error);
        });
    };

    const handleChangeEmail = () => {
      setCodeGenerated(true);
      openModal();
    };
  





  return (
    <>
      {loading ? (
        // Si les données sont en cours de chargement, affichez un indicateur de chargement
        <p>Chargement en cours...</p>
      ) : (
        // Si les données sont chargées, affichez les données
        <div className="donneesPersonnelles">
          <h1>Mes données personnelles</h1>
          <p>
            Voir et mettre à jour vos informations ici. Gérez vos identifiants
            et mots de passe ici.
          </p>

          <div className="infoPerso">
            <div className="info">
              <div className="accounIcon">
                <BsFillPersonFill className="icon" />
              </div>

              <div className="complete">
                <div className="droite">
                  <div>
                    <p>Nom :</p>
                    <span>{UserData.nom}</span>
                  </div>
                  <div>
                    <p>Prénom :</p>
                    <span>{UserData.prenom}</span>
                  </div>
                </div>

                <div className="bouton">
                  <button
                    className="update"
                    onClick={() => setVisibleModalId("info")}
                  >
                    Modifier
                  </button>
                </div>
              </div>

              <div className="gauche">
                <div>
                  <p>Numéro de téléphone :</p>
                  <span></span>
                </div>
                <div>
                  <p>Date de naissance :</p>
                  <span></span>
                </div>
              </div>
            </div>

            <form className="updateModal">
              {visibleModalId === "info" && (
                <div className="InfoModalContent">
                  <RxCross2 className="modalCross" onClick={closeModal} />

                  <h3> Mettre à jour mes coordonnées </h3>
                  <input type="text" placeholder="Nom" value={UserData.nom} />
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={UserData.prenom}
                  />
                  <input type="date" placeholder="Date de naissance" />
                  <input type="text" placeholder="Numéro de téléphone" />

                  <div className="submit">
                    <button type="submit" id="submit">
                      Enregister
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="infoPlus">
              <div className="adresse infodiv">
                <div className="addInfo">
                  <p>
                    <ImLocation className="icon" />
                    Mes Adresses
                  </p>
                  <span>20 rue Cugnot 59100</span>
                </div>

                <div className="bouton">
                  <button
                    className="update"
                    onClick={() => setVisibleModalId("address")}
                  >
                    Modifier
                  </button>
                </div>

                <div className="updateModal">
                  {codeGenerated && visibleModalId === "address" && (
                    <div className="addressModalContent">
                      <RxCross2 className="modalCross" onClick={closeModal} />
                      <h1>Mes Adresses</h1>
                      <h2>Ajoutez ou modifiez vos adresses ici</h2>

                      <div className="deliveryAdress">
                        <h5>Adresse de livraison </h5>
                        {/* Ajoutez ici les champs d'adresse de livraison */}
                      </div>

                      <div className="bilingAdress">
                        <h5>Adresse de facturation </h5>
                        {/* Ajoutez ici les champs d'adresse de facturation */}
                      </div>

                      <div className="newAddress">
                        {/* Ajoutez ici la possibilité d'ajouter une nouvelle adresse */}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="email infodiv">
                <div className="addInfo">
                  <p>
                    <MdEmail className="icon" />
                    Mon adresse Email
                    <br />
                  </p>
                  <span>{UserData.email}</span>
                </div>

                <div className="bouton">
                  <button
                    className="update"
                    onClick={() => handleChangeEmail("email")} 
                  >
                    Modifier
                  </button>
                </div>

                <div className="updateModal">
                  {codeGenerated && visibleModalId === "email" && (
                    <div className="emailModalContent">
                      <RxCross2 className="modalCross" onClick={closeModal} />
                      <h5>Assurons-nous qu'il s'agit bien de vous, Liza</h5>
                      <p>
                        Veuillez saisir le code de sécurité à 6 chiffres envoyé
                        à liza.bahloul@gmail.com.
                      </p>
                      <input
                        type="text"
                        placeholder="Code de sécurité"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      <button type="submit" className="continuer">
                        Conituer
                      </button>
                      <p>
                        Vous n'avez pas reçu de code ? Vérifiez votre dossier
                        spam ou obtenir un nouveau code.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="motDePasse infodiv">
                <div className="addInfo">
                  <p>
                    <RiLock2Fill className="icon" />
                    Mon mot de passe
                    <br />
                  </p>
                  <span>********</span>
                </div>
                <div className="bouton">
                  <button
                    className="update"
                    onClick={() => setVisibleModalId("password")}
                  >
                    Modifier
                  </button>
                </div>

                <div className="updateModal">
                  {visibleModalId === "password" && (
                    <div className="passwordModalContent">
                      <RxCross2 className="modalCross" onClick={closeModal} />

                      <h5>Changer le mot de passe</h5>
                      <p>
                        N’hésitez pas à mettre à jour votre mot de passe à tout
                        moment afin de sécuriser votre compte GMA.
                      </p>
                      <input
                        type="password"
                        placeholder="Mot de passe actuel"
                      />
                      <input
                        type="password"
                        placeholder="Nouveau Mot de passe"
                      />
                      <input
                        type="password"
                        placeholder="Confirmez ce nouveau passe"
                      />
                      <button type="submit">Enregister</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Parametre;
