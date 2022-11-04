/**
 * DAL файл для отправки ajax-запросов и получения  от сервера
 */

function getDataForUsersTable() {

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "api/users",
        success: (data) => {
            insertDataToUsersTable(data);
        },
        error: (data) => {
            console.log(data);
        }
    });
}

function getDataForEditUser(userId) {

    $.ajax({
        url: `api/users/${userId}`,
        type: 'GET',
        headers: {
            'x-auth-token': localStorage.accessToken,
        },
        success: (user) => {
            fillEditModalForm(user);
        },
        error: (user) => {
            console.log(user)
        }
    })
}
function getDataForDeleteUser(userId) {
    $.ajax({
        url: `api/users/${userId}`,
        type: 'GET',
        headers: {
            'x-auth-token': localStorage.accessToken,
        },
        success: (user) => {
            fillDeleteModalForm(user);
        },
        error: (user) => {
            console.log(user)
        }
    })
}

function putUpdatedUserData(userEdit) {

    $.ajax({
        url: 'api/users',
        type: 'PUT',
        data: JSON.stringify(userEdit),
        headers: {
            'x-auth-token': localStorage.accessToken,
            "Content-Type": "application/json"
        },
        dataType: 'json',
        success:  () => {
            getDataForUsersTable();
        },
        error: (userEdit) => {
            console.log(userEdit)
        }
    })
}

function postNewUserData(newUser) {

    $.ajax({
        url: 'api/users',
        type: 'POST',
        data: JSON.stringify(newUser),
        headers: {
            'x-auth-token': localStorage.accessToken,
            "Content-Type": "application/json"
        },
        dataType: 'json',
        success:  () => {
            getDataForUsersTable();
            closeFormForNewUser();
        },
        error: (newUser) => {
            console.log(newUser)
        }
    })
}
function deleteUserByID(userId) {

    $.ajax({
        url: `api/users/${userId}`,
        type: 'DELETE',
        headers: {
            'x-auth-token': localStorage.accessToken,
        },
        success:  () => {
            getDataForUsersTable();
        },
        error: (userForDelete) => {
            console.log(userForDelete)
        }
    })
}