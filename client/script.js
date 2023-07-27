let url = 'http://localhost:5500/users';
let users = document.getElementById("userList");


fetch(url)
.then(response =>{

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
		</tr>
	`

	console.log(users)
})

})


})
