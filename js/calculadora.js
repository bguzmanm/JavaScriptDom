let botones = document.getElementsByClassName("btn");

for (let i = 0; i < botones.length; i++){
    const element = botones[i];
    element.addEventListener('click', ()=> {
        add_value(element.innerText);
    });
}

function add_value(value){

    let resultado = document.getElementById("txtResultado");

    if (value=="="){
        try {
            if (resultado.value != ""){
                resultado.value = eval(resultado.value);
            }            
        } catch (e){
            console.log(e);
        }
        
    } else if (value=="clean"){
        resultado.value = "";
    } else {
        if (!isNaN(value) || value == '+' || value == '-' || value == '*'|| value == '/' ){
            resultado.value += value;
        }
    }
 
}