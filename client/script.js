let url = 'http://localhost:5500/users';
let users = document.getElementById("userList");
let modal = document.getElementById("formpopup");
let formModal = document.getElementById("formContent")
let updateModal = document.getElementById("updateModal");




fetch(url)
	.then(response => {

		response.json().then(data => {
			// console.log(data)
			data.forEach(element => {
				users.innerHTML +=
					`<tr>
			<td>${element.name}</td>
			<td>${element.last_name}</td>
			<td>${element.address}</td>
			<td>${element.city}</td>
			<td>${element.zip_code}</td>
			<td>${element.email}</td>
			<td>${element.phone_number}</td>

			<td><button type="button" id="${element.idUser}" class="editUser"  data.target= ><i class="fa-solid fa-pen" style="color: #7e99c8;"></i></button></td>
			<td><button type="button" id="${element.idUser}" class="deleteButtons"> <i class="fa-solid fa-trash"></button></td>
		 </tr>`

				console.log(users)
			})
			let deleteUser = document.querySelectorAll(".deleteButtons")
			console.log(deleteUser)

			let deleteModal = document.getElementById("deleteModal")
			deleteUser.forEach(deletebutton => {
				deletebutton.addEventListener('click', () => {
					deleteModal.style.display = "flex"
					const stockId = deletebutton.id;
					console.log(stockId)

					deleteModal.dataset.stockId = stockId


				})

			})

			let btnno = document.getElementById("btnno")
			btnno.addEventListener('click', () => {
				deleteModal.style.display = "none"
				// console.log(deleteModal.dataset.stockId)

			})

			let btnyes = document.getElementById("btnyes")
			btnyes.addEventListener('click', () => {
				deleteModal.style.display = "none"

				const stockId = deleteModal.dataset.stockId
				const response = fetch(`http://localhost:5500/user/${stockId}`, {
					method: "DELETE",
					headers: {
						"content-type": "application/json",
					},
				})


				window.location.reload()

			})
			let btnUpdate = document.querySelectorAll(".editUser");
			console.log(btnUpdate)
			btnUpdate.forEach(btnupdate => {
				btnupdate.addEventListener("click", () => {
					updateModal.style.display = "flex"

					const stockId = btnupdate.id;
					console.log(stockId)

					updateModal.dataset.stockId = stockId
					try {
						const response = fetch(`http://localhost:5500/oneuser/${stockId}`, {
							method: "GET", // Utiliser la méthode GET pour récupérer un utilisateur
							headers: {
								"Content-Type": "application/json",
							}
						});
						response
							.then((res) => res.json())
							.then((data) => {
								console.log(data);
								// Insertion des données dans le formulaire Update
								const updateModal = document.getElementById("resultupdate");

								updateModal.editName.value = data[0].name
								updateModal.editlast_name.value = data[0].last_name
								updateModal.editAddress.value = data[0].address
								updateModal.editCity.value = data[0].city
								updateModal.editPhone_number.value = data[0].phone_number
								updateModal.editEmail.value = data[0].email
								updateModal.editZip_code.value = data[0].zip_code
								console.log(updateModal.editName.value);

							})
							.catch((error) => {
								console.error("Erreur lors de l'obtention des données:", error);
							});
					} catch (error) {
						console.error("Erreur lors de l'envoi de la requête", error);
					}
					




					
					 let editSubmit = document.getElementById("editSubmit");
					updateModal.addEventListener("submit", (event) => {
						event.preventDefault();
						const updatedata = {
							name: updateModal.editName.value,
							last_name: updateModal.editlast_name.value,
							address: updateModal.editAddress.value,
							city: updateModal.editCity.value,
							phone_number: updateModal.editPhone_number.value,
							email: updateModal.editEmail.value,
							zip_code: updateModal.editZip_code.value

						}

						const response = fetch(`http://localhost:8000/user/${stockId}`, {
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(updatedata),
						});

						
					})
				})
			})

			let update = document.getElementById("resultupdate");
		})

	})




let AjouterUtilisateur = document.getElementById('button1')
button1.addEventListener('click', () => {

	modal.classList.add("active");
})

// en cliquant sur le bouton submit, on a mit un écouteur d'évenement submit pour excuter la fonction =>
document.getElementById("formpopup").addEventListener('submit', (event) => {
	event.preventDefault();

	// récupération des données saisies par l'utilisateur
	const name = document.getElementById("name").value
	const last_name = document.getElementById("last_name").value
	const address = document.getElementById("address").value
	const city = document.getElementById("city").value
	const zip_code = document.getElementById("zip_code").value
	const email = document.getElementById("email").value
	const phone_number = document.getElementById("phone_number").value

	console.log(name)
	console.log(last_name)
	console.log(address)
	console.log(city)
	console.log(zip_code)
	console.log(email)
	console.log(phone_number)

	// Stockage par création d'un objet contenant les données (clé:valeur) 
	const newuser = {
		name,
		last_name,
		address,
		city,
		zip_code,
		email,
		phone_number,

	}
	console.log(newuser)
	// exécute la requête : create user dans user controller
	const response = fetch("http://localhost:5500/register", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},

		// JSON.stringify () transforme en chaîne de caractères JSON l'objet transmis en paramètre. On peut ensuite stocker cette chaîne avec localStorage.
		body: JSON.stringify(newuser),

	})


	//  reset le formulaire 
	modal.reset()

	// rfraiche 

	window.location.reload()
})









// document.getElementById("editName").value = .name;
// document.getElementById("editlast_name").value = .last_name;
// document.getElementById("editAddress").value = .address;
// document.getElementById("editCity").value = .city;
// document.getElementById("editZip_code").value = .zip_code;
// document.getElementById("editEmail").value = email;
// document.getElementById("editPhone_number").value = .phone_number;


