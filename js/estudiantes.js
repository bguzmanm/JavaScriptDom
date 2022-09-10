
// Funciones para leer y escribir en el local storage
function read(key){
    return JSON.parse(window.localStorage.getItem(key)) || [];
}
function save(key, data){
    window.localStorage.setItem(key, JSON.stringify(data));
}

//obtengo los elementos del formulario
let idStudent = document.querySelector("#id");
let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");
let edad = document.querySelector("#edad");


/* 
C -> Create
R -> Read
U -> Update
D -> Delete

*/

// crea y actualiza un estudiante.
// es decir, hace el CREATE y el UPDATE
function createStudent(e){
    let students = read("students");

    // hace el CREATE
    if (idStudent.value == 0 || idStudent.value == null){
        const student = {
            id: (students.length + 1),
            name : nombre.value,
            lastName : apellido.value,
            age : edad.value,
        }
        students.push(student);

    // hace el UPDATE
    } else {
        // const student = students[idStudent.id-1];
        let pos = students.findIndex(student => student.id == idStudent.value);
        if (pos >= 0){
            students[pos].name = nombre.value;
            students[pos].lastName = apellido.value;
            students[pos].age = edad.value;
        }
    }

    save("students", students);
    clearForm();
    readAll();
}

function clearForm(){
    idStudent.value = 0;
    nombre.value = '';
    apellido.value = '';
    edad.value = null;
}

function readAll(){

    let tbody = document.querySelector("#estudiantes");
    tbody.innerHTML = "";
    let students = read("students");
    
    students.forEach(element => {
        tbody.innerHTML += `<tr>
            <th>${element.id}</th>
            <td>${element.name}</td>
            <td>${element.lastName}</td>
            <td>${element.age}</td>
            <td>
                <button type="button" id="edit${element.id}" class="btn btn-outline-warning">edit</button> 
                <button type="button" id="del${element.id}" class="btn btn-outline-danger">del</button> 
            </td>
        </tr>
        `;
    });
}

function readOne(id){
    let students = read("students");
    let student = students[id - 1];
    
    idStudent.value = student.id;
    nombre.value = student.name;
    apellido.value = student.lastName;
    edad.value = student.age;
}

function delStudent(id){
    let students = read("students");
    let filtrado = students.filter(student => student.id != id);
    save("students", filtrado);
    readAll();
}

readAll();

let btnAdd = document.querySelector("#btnAgregar");
btnAdd.addEventListener("click", (e) => {
    createStudent(e);
});

let editList = document.querySelectorAll(".btn-outline-warning");
editList.forEach(element => {
    element.addEventListener('click', (e) => {
        readOne(element.id.match(/(\d+)/)[0]);
    })
});

let delList = document.querySelectorAll(".btn-outline-danger");
delList.forEach(element => {
    element.addEventListener('click', (e) => {
        delStudent(element.id.match(/(\d+)/)[0]);
    })
});

