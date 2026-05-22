window.onload = init;

function init(){
    if(!localStorage.getItem("token")){

        document.querySelector('.btn-primary').addEventListener('click', login);
    } else {
        window.location.href = "employees.html";
    }

}

function login() {
    var username = document.getElementById('input-username').value;
    var password = document.getElementById('input-password').value;


    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            username: username,
            password: password
        }
    }).then(function(res) {
        console.log(res.data);
        if(res.data.code === 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "employees.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    }).catch(function(err) {
        console.log(err);
        alert("Ocurrio un error");
    })
}