
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

function addStudent(e){
    let students = read("students");

    if (idStudent.value == 0 || idStudent.value == null){
        const student = {
            id: (students.length + 1),
            name : nombre.value,
            lastName : apellido.value,
            age : edad.value,
        }
        students.push(student);
    }
    save("students", students);
    show();
}

function show(){

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
                <button type="button" id="edit" class="btn btn-outline-warning">edit</button> 
                <button type="button" id="del" class="btn btn-outline-danger">del</button> 
            </td>
        </tr>
        `;
    });

}

show();

let btnAdd = document.querySelector("#btnAgregar");
btnAdd.addEventListener("click", (e) => {
    addStudent(e);
})