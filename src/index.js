import { Request } from "./request";
import { UI } from "./ui";

//Elementleri seçme
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeeList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");

const request = new Request("http://localhost:3000/employees");
const ui = new UI();

let updateState = null;

eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded",getAllEmployees);
    form.addEventListener("submit",addEmployee);
    employeeList.addEventListener("click",UpdateOrDelete);
    updateEmployeeButton.addEventListener("click",updateEmployee);
}

function getAllEmployees(){
    request.get()
    .then(employees => {
        ui.addAllEmployeeToUI(employees);
    })
    .catch(err => console.log(err));
}
function addEmployee(e){

    const employeeName = nameInput.value.trim();
    const employeeDepartment = departmentInput.value.trim();
    const employeeSalary = salaryInput.value.trim();

    if(employeeName ==="" || employeeDepartment ==="" || employeeSalary ===""){
        alert("Lütfen tüm alanları doldurun");
    }
    else{
        request.post({name:employeeName,department:employeeDepartment,salary:Number(employeeSalary)})
        .then(employee => {
            addAllEmployeeToUI(employee);
        })
        .catch(err => console.log(err));
    }


    ui.clearInputs();
    e.preventDefault();
}
function UpdateOrDelete(e){
    // console.log(e.target);
    if(e.target.id === "delete-employee"){
        //silme
        deleteEmployee(e.target);
    }
    else if(e.target.id === "update-employee"){
        //güncelleme
        updateEmployeeController(e.target.parentElement.parentElement);
    }
}
function deleteEmployee(targetEmployee){
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;

    request.delete(id)
    .then(message => {
        ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement); //tr elementi (a -> td ->tr)
    })
    .catch(err => console.log(err));
}
function updateEmployeeController(targetEmployee){
    ui.toggleUpdateButton(targetEmployee);
    if(updateState === null){
        updateState = {
            updateId : targetEmployee.children[3].textContent, //updateid' yi neden böyle gönderioruz? updateEmployee fonksiyonumaza id'yi başka türlü gönderemeyiz çünkü bu fonksiyon eventlistener'a göre çalışıyor ve eventlistener'a buradan herhangi bir id gönderemiyoruz.
            updateParent : targetEmployee
        }
    }
    else{
        updateState = null;
    }
}

function updateEmployee(){
    if (updateState){
        //Güncelleme
        const data = {name: nameInput.value.trim(),department: departmentInput.value.trim(), salary: Number(salaryInput.value.trim())}
    
        request.put(updateState.updateId,data)
        .then(updatedEmployee => {
            ui.updateEmployeeOnUI(updatedEmployee,updateState.updateParent);
        })
        .catch(err => console.log(err));
    }
}









//kendi restapi'mıza get request attık
// request.get() 
// .then(employees => console.log(employees))
// .catch(err => console.log(err));

// request.post({name:"serhat say",department:"Pazarlama",salary:3500})
// .then(employee => console.log(employee))
// .catch(err => console.log(err));

// request.put(1,{name:"Ömercan",department:"Bilişim",salary:5000})
// .then(employee => console.log(employee))
// .catch(err => console.log(err));

// request.delete(3)
// .then(message => console.log(message))
// .catch(err => console.log(err));