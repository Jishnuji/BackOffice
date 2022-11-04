/**
 *
 */

$(document).ready(function () {
    $('.btnEdit').on('click', function (event) {
        event.preventDefault();
        let href = $(this).attr('href');
        $.get(href, function (user) {
            $('#idEditHidden').val(user.id);
            $('#idEdit').val(user.id);
            $('#usernameEdit').val(user.username);
            $('#lastnameEdit').val(user.lastname);
            $('#ageEdit').val(user.age);
            $('#emailEdit').val(user.email);
            $('#passwordEdit').val(user.password);
            let userRoles = user.authorities;
            $('#authoritiesEdit').val(userRoles.length === 1 ? userRoles[0].id : [userRoles[0].id, userRoles[1].id]);
        })
        $("#editModal").modal('show');
    });

    $('.btnDelete').on('click', function (event) {
        event.preventDefault();
        let href = $(this).attr('href');
        $.get(href, function (user) {
            $('#idDeleteHidden').val(user.id);
            $('#idDelete').val(user.id);
            $('#usernameDelete').val(user.username);
            $('#lastnameDelete').val(user.lastname);
            $('#ageDelete').val(user.age);
            $('#emailDelete').val(user.email);
            $('#passwordDelete').val(user.password);
            let userRoles = user.authorities;
            $('#authoritiesDelete').val(userRoles.length === 1 ? userRoles[0].id : [userRoles[0].id, userRoles[1].id]);
        })
        $("#deleteModal").modal('show');
    });
});