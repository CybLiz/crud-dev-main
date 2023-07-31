let url = 'http://localhost:5500/users';
let users = document.getElementById("userList");
let modal = document.getElementById("formpopup");

fetch(url)
	.then(response => {

		response.json().then(data => {
			console.log(data)
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

			<td><button type="button" id="button2" class="icons"><i class="fa-solid fa-pen" style="color: #7e99c8;"></i></button></td>
			<td><button type="button" id="button3"> <i class="fa-solid fa-trash"></button></td>
		</tr>
	`

				console.log(users)
			})

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
let btnUpdate= document.getElementById("button2");
let modal2 = document.getElementById("modalist");
btnUpdate.addEventListener("click", () =>{
	modal2.style.display = "flex"

} 
)


let update = document.getElementById("resultupdate");
fetch(url)
	.then(response => {

		response.json().then(data => {
			console.log(data)
			data.forEach(element => {
				update.innerHTML +=
					`<li id="${element.idUser}" class="user"> ${element.name} ${element.last_name}</li>`
			})


		})

	})
	




