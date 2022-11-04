/**
 * Работа с юзер-интерфейсом
 */

$(document).ready(function () {
    getDataForUsersTable();
});

function insertDataToUsersTable(data) {
    let users = JSON.parse(JSON.stringify(data));
    $("#usersData").empty();
    for (let i in users) {
        let userId = users[i].id;
        $("#usersData").
        append("<tr> \
             <td>" + userId + "</td> \
             <td>" + users[i].username + "</td> \
             <td>" + users[i].lastname + "</td> \
             <td>" + users[i].age + "</td> \
             <td>" + users[i].email + "</td> \
             <td>" + users[i].cleanedRoles + "</td> \
             <td> \ <button onclick='getDataForEditUser(" + userId + ")' id='edit' class='btn btnEdit btn-info'>Edit</button> \ </td> \
             <td> \ <button onclick='getDataForDeleteUser(" + userId + ")' id='delete' class='btn btnDelete btn-danger'>Delete</button> \ </td> \
             </tr>");
    }
}

function fillEditModalForm(user) {
    let userRoles = user.authorities;
    $('#idEditHidden').val(user.id);
    $('#idEdit').val(user.id);
    $('#usernameEdit').val(user.username);
    $('#lastnameEdit').val(user.lastname);
    $('#ageEdit').val(user.age);
    $('#emailEdit').val(user.email);
    $('#passwordEdit').val(user.password);
    $('#authoritiesEdit').val(userRoles.length === 1 ? userRoles[0].id : [userRoles[0].id, userRoles[1].id]);

    $('#editModal').modal('show');
    $('#edit_button').off("click");

    $('#edit_button').click( () => {
        prepareUserDataForSending(user.id);
    });
}

function prepareUserDataForSending(userId) {
    const getArrayOfRoles = () => {
        let cleanedRolesId = [];
        let rolesId = $('#authoritiesEdit').val();
        for (let i of rolesId) {
            let role = {};
            role["id"] = +i;
            cleanedRolesId.push(role)
        }
        return cleanedRolesId;
    }

    let userEdit = {
        "id": userId,
        "username": $('#usernameEdit').val(),
        "lastname": $('#lastnameEdit').val(),
        "age": $('#ageEdit').val(),
        "email": $('#emailEdit').val(),
        "password": $('#passwordEdit').val(),
        "roles": getArrayOfRoles()
    };

    putUpdatedUserData(userEdit);
}

function openFormForNewUser() {
        const getArrayOfRoles = () => {
            let cleanedRolesId = [];
            let rolesId = $('#authoritiesNew').val();
            for (let i of rolesId) {
                let role = {};
                role["id"] = +i;
                role["name"] = +i === 1 ? "ROLE_USER" : "ROLE_ADMIN";
                role["authority"] = +i === 1 ? "ROLE_USER" : "ROLE_ADMIN";
                cleanedRolesId.push(role)
            }
            return cleanedRolesId;
        }

        let newUser = {
            "username": $('#username').val(),
            "lastname": $('#lastname').val(),
            "age": $('#age').val(),
            "email": $('#email').val(),
            "password": $('#password').val(),
            "roles": getArrayOfRoles()
        };
        postNewUserData(newUser);
}

function closeFormForNewUser() {
    $('#nav-home-tab').removeClass('nav-link').addClass('nav-link active').attr('aria-selected', true);
    $('#nav-profile-tab').removeClass('nav-link active').addClass('nav-link').attr('aria-selected', false);
    $('#nav-profile').removeClass('tab-pane fade active show').addClass('tab-pane fade');
    $('#nav-home').removeClass('tab-pane fade').addClass('tab-pane fade active show');
}

function fillDeleteModalForm(user) {
    let userRoles = user.authorities;
    $('#idDeleteHidden').val(user.id);
    $('#idDelete').val(user.id);
    $('#usernameDelete').val(user.username);
    $('#lastnameDelete').val(user.lastname);
    $('#ageDelete').val(user.age);
    $('#emailDelete').val(user.email);
    $('#authoritiesDelete').val(userRoles.length === 1 ? userRoles[0].id : [userRoles[0].id, userRoles[1].id]);

    $('#deleteModal').modal('show');

    $('#delete_button').click(() => {
        deleteUserByID(user.id);
    });
}


