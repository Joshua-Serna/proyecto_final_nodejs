//const employee = require("../../routes/employee");

window.onload = init;
var headers = {};
var url = "http://localhost:3000";
var employeeId = null;

function init(){
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }
        loadEmployees();
        
        document.querySelector('.btn-info').addEventListener('click', addEmployee);
        document.querySelector('.btn-primary').addEventListener('click', searchEmployee);
        document.querySelector('.btn-success').addEventListener('click', updateEmployee);
        document.querySelector('.btn-danger').addEventListener('click', deleteEmployee);
        document.querySelector('.btn-secundary').addEventListener('click', logout);

    } else {
        window.location.href = "index.html";
    }
}

function addEmployee() {
    
    var name = document.getElementById('input-name').value;
    var lastname = document.getElementById('input-lastname').value;
    var phone = document.getElementById('input-phone').value;
    var email = document.getElementById('input-email').value;
    var address = document.getElementById('input-address').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/employees/',
        headers: headers.headers,
        data: {
            name: name,
            lastname: lastname,
            phone: phone,
            email: email,
            address: address
        }
    }).then(function(res) {

        console.log(res);
        alert("Empleado registrado exitosamente");
        window.location.href = "employees.html";

    }).catch(function(err) {

        console.log(err);

    });
}

function searchEmployee(){

    var search = document.getElementById("search").value;

    axios.get(url + "/employees/" + search, headers)

    .then(function(res){
        fillForm(res.data[0]);
    }).catch(function(err){
        console.log(err);
    });
}

function fillForm(employee) {

    employeeId = employee.id;

    document.getElementById("input-name").value = employee.name;
    document.getElementById("input-lastname").value = employee.lastname;
    document.getElementById("input-phone").value = employee.phone;
    document.getElementById("input-email").value = employee.email;
    document.getElementById("input-address").value = employee.address;
}

function updateEmployee(){

    var name = document.getElementById('input-name').value;
    var lastname = document.getElementById('input-lastname').value;
    var phone = document.getElementById('input-phone').value;
    var email = document.getElementById('input-email').value;
    var address = document.getElementById('input-address').value;

    axios.put(

        url + "/employees/" + employeeId,

        {
            name: name,
            lastname: lastname,
            phone: phone,
            email: email,
            address: address
        },

        headers

      ).then(function(res) {

        console.log(res);
        alert("Empleado actualizado exitosamente");
        window.location.href = "employees.html";

    }).catch(function(err) {

        console.log(err);

    });
}

function deleteEmployee() {

    axios.delete(

        url + "/employees/" + employeeId,
        
        headers

    ).then(function(res) {

        console.log(res);
        alert("Empleado eliminado exitosamente");
        clearForm()
        window.location.href = "employees.html";

    }).catch(function(err) {

        console.log(err);

    });
}

function clearForm() {

    employeeId = null;

    document.getElementById("input-name").value = "";
    document.getElementById("input-lastname").value = "";
    document.getElementById("input-phone").value = "";
    document.getElementById("input-email").value = "";
    document.getElementById("input-address").value = "";

}



function loadEmployees() {

    axios.get(
        
        url + "/employees", 
        
        headers
    
    ).then(function(res) {

        console.log(res);
        displayEmployees(res.data.message);

    }).catch(function(err){

        console.log(err);

    })
}

function displayEmployees(employees) {
    
    var table = document.getElementById("employees-table");

    table.innerHTML = "";

    for(var i = 0; i < employees.length; i++){

        table.innerHTML += `

            <tr>

                <td>${employees[i].id}</td>
                <td>${employees[i].name}</td>
                <td>${employees[i].lastname}</td>
                <td>${employees[i].phone}</td>
                <td>${employees[i].email}</td>
                <td>${employees[i].address}</td>

            </tr>

        `;
    }
}

function logout() {

    localStorage.removeItem("token");

    window.location.href = "index.html";

}
