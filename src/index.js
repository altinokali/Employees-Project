import { Request } from "./request"
// Selecet Elements


const form = document.querySelector("#empoyee-form")
const nameImput = document.querySelector("#name")
const departmentImput = document.querySelector("#department")
const salaryImput = document.querySelector("#salary")
const employeeList = document.querySelector("#employees")
const updateEmoployeeButton = document.querySelector("#update")

const request = new Request("http://localhost:3000/employees")


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

request.delete(4)
    .then(message => console.log(message))
    .catch((err) => console.log(err))