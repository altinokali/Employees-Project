import { Request } from "./request"
import { UI } from "./ui"
// Selecet Elements

const form = document.querySelector("#employee-form")
const nameInput = document.querySelector("#name")
const departmentInput = document.querySelector("#department")
const salaryInput = document.querySelector("#salary")
const employeesList = document.querySelector("#employees")
const updateEmoployeeButton = document.querySelector("#update")
let updateState = null;
const request = new Request("http://localhost:3000/employees")

const ui = new UI()

eventListeners();

function eventListeners() {
    document.addEventListener("DOMContentLoaded", getAllEmployees);
    form.addEventListener("submit" , addEmployee);
    employeesList.addEventListener("click", UpdateOrDelete);
    updateEmoployeeButton.addEventListener("click", updateEmployee);
}

function getAllEmployees() {
        request.get()
        .then(employees => {
            ui.addAllEmployeesToUI(employees)
        }).catch((err) => console.log(err))
        
}

// request.get()
// .then(employees => console.log(employees))
// .catch((err) => console.log(err))

// request.post({
//     name : "Caner Altindag", department: "Civil Engineering", salary : 6200
// }).then(employee => console.log(employee))
// .catch((err) => console.log(err))


// request.put(2,{
//     name : "Aslı Altindag", department: "Civil Engineering", salary : 6200
// }).then(employee => console.log(employee))
// .catch((err) => console.log(err))

// request.delete(4)
//     .then(message => console.log(message))
//     .catch((err) => console.log(err))

function addEmployee(e) {
  
    const employeeName =nameInput.value.trim();
    const employeeDepartment = departmentInput.value.trim();
    const employeeSalary = parseInt(salaryInput.value.trim());
    
    if(employeeName === "" || employeeDepartment === "" || employeeSalary === ""){
        alert('Lütfen ilgili alanlari doldurunuz');
    }
    else
    {
    request.post({name: employeeName, department: employeeDepartment, salary: employeeSalary})
    .then(employee => {ui.addEmployeeToUI(employee)})
    .catch(err => console.log(err));
    }
   

    ui.clearInputs()
    e.preventDefault();
}

function UpdateOrDelete(e) {
    if(e.target.id === "delete-employee") {
        //Silme islemi
        deleteEmployee(e.target);

    }else if(e.target.id === "update-employee"){
        //Güncelle
        updateEmployeeController(e.target.parentElement.parentElement);
    }
}

function deleteEmployee(targetEmployee) {
 const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;
 request.delete(id)
 .then(message => {{
    ui.deleteEmployeeFromUUI(targetEmployee.parentElement.parentElement);
 }}).catch(err => console.log(err));
}

function updateEmployeeController(targetEmployee) {
    ui.toggleUpdateButton(targetEmployee)

    if(updateState === null) {
        updateState = {
            updateId : targetEmployee.children[3].textContent,
            updateParent : targetEmployee
        }

    }else {
        updateState = null;
    }
}

function updateEmployee() {
    if(updateState) {
        //Güncellem
        const data = {name: nameInput.value.trim(), department:departmentInput.value.trim(),salary: Number(salaryInput.value.trim())}
        request.put(updateState.updateId,data)
        .then(updatedEmployee => {
            ui.updateEmployeeOnUI(updatedEmployee,updateState.updateParent); 
        })
        .catch(err => console.log(err))
    }
}
