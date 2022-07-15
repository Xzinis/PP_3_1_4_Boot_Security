const urlUser = 'http://localhost:8080/api/user';
const tableUser = document.querySelector('tbody');

let result = '';
const currentUser = (user) => {
    result += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.lastname}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${user.roles.map(role => role.name)}</td>
                    </tr>`
    tableUser.innerHTML = result
}

fetch(urlUser)
    .then(response => response.json())
    .then(data => currentUser(data))
