const urlUsers = 'http://localhost:8080/api/admin';
const urlRoles = 'http://localhost:8080/api/roles';


const tableUsers = document.querySelector('tbody');

let result = '';
const allUsers = () => {
    fetch(urlUsers)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                result += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.lastname}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${user.roles.map(role => role.name)}</td>
                        <td><button type="button" class="editBtn btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#editModal">Edit</button></td>
                        <td><button type="submit" class="deleteBtn btn btn-danger" data-bs-toggle="modal"
                        data-bs-target="#deleteModal">Delete</button></td>
                    </tr>`
            })
            tableUsers.innerHTML = result
        })
}

fetch(urlUsers)
    .then(response => response.json())
    .then(data => allUsers(data))


function getAllRoles(target) {
    fetch(urlRoles)
        .then(response => response.json())
        .then(roles => {
            let optionRoles = ``
            roles.forEach(role => {
                optionRoles += `<option value='${role.id}'>${role.name}</option>`
            })
            target.innerHTML = optionRoles
        })
}

let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }
    return array;
}

const reloadUsersTable = () => {
    fetch(urlUsers)
        .then(response => response.json())
        .then(data => {
            result = ''
            allUsers(data)
        })
}


 addNewUser = document.getElementById('newUser');
const firstNameNew = document.getElementById('name');
const lastNameNew = document.getElementById('lastname');
const ageNew = document.getElementById('age');
const emailNew = document.getElementById('email');
const passwordNew = document.getElementById('password');
const rolesNew = document.getElementById('roles');

getAllRoles(roles)
addNewUser.addEventListener('submit', (e) => {
        e.preventDefault()
        let options = document.querySelector('#roles')
        let listRoles = roleArray(options)
        fetch(urlUsers, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: firstNameNew.value,
                lastname: lastNameNew.value,
                age: ageNew.value,
                email: emailNew.value,
                password: passwordNew.value,
                roles: listRoles,
            })
        })
            .then(data => allUsers(data))
            .then(reloadUsersTable)
        firstNameNew.value = ''
        lastNameNew.value = ''
        ageNew.value = ''
        emailNew.value = ''
        passwordNew.value = ''
        rolesNew.value = ''
    }
)


const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}


const editModal = document.getElementById('editModal');
const newEditModal = bootstrap.Modal.getOrCreateInstance(editModal);
const editId = document.getElementById('editId');
const editFirstName = document.getElementById('editFirstName');
const editLastName = document.getElementById('editLastName');
const editAge = document.getElementById('editAge');
const editEmail = document.getElementById('editEmail');
const editPassword = document.getElementById('editPassword');
const editRoles = document.getElementById('editRole');

on(document, 'click', '.editBtn', e => {
    let userData = e.target.parentNode.parentNode
    id = userData.children[0].innerHTML
    editId.value = userData.children[0].innerHTML
    editFirstName.value = userData.children[1].innerHTML
    editLastName.value = userData.children[2].innerHTML
    editAge.value = userData.children[3].innerHTML
    editEmail.value = userData.children[4].innerHTML
    editPassword.value = ''
    editRoles.value = getAllRoles(editRoles)
})


editModal.addEventListener('submit', e => {
    e.preventDefault()
    let options = document.querySelector('#editRole')
    let listRoles = roleArray(options)
    fetch(urlUsers, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: editId.value,
            name: editFirstName.value,
            lastname: editLastName.value,
            age: editAge.value,
            email: editEmail.value,
            password: editPassword.value,
            roles: listRoles
        })
    })
        .then(data => allUsers(data))
        .then(reloadUsersTable)
    newEditModal.hide()

})


const deleteModal = document.getElementById('deleteModal');
const newDeleteModal = bootstrap.Modal.getOrCreateInstance(deleteModal);
const deleteId = document.getElementById('deleteId');
const deleteFirstName = document.getElementById('deleteFirstName');
const deleteLastName = document.getElementById('deleteLastName');
const deleteAge = document.getElementById('deleteAge');
const deleteEmail = document.getElementById('deleteEmail');
const deleteRoles = document.getElementById('deleteRole');
on(document, 'click', '.deleteBtn', e => {
    let userData = e.target.parentNode.parentNode
    id = userData.children[0].innerHTML
    deleteId.value = userData.children[0].innerHTML
    deleteFirstName.value = userData.children[1].innerHTML
    deleteLastName.value = userData.children[2].innerHTML
    deleteAge.value = userData.children[3].innerHTML
    deleteEmail.value = userData.children[4].innerHTML
    deleteRoles.value = getAllRoles(deleteRoles)
})

deleteModal.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(urlUsers + `/${id}`, {
        method: 'DELETE'
    })
        .then(data => showAllUsers(data))
        .catch(error => console.log(error))
        .then(reloadUsersTable)
    newDeleteModal.hide()
})