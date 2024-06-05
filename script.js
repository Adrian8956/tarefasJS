const frm = document.querySelector("form");
const dvQuadro = document.querySelector("#divQuadro");

frm.addEventListener("submit", (e) =>{
    e.preventDefault();

    const tarefa = frm.inTarefa.value;

    const h5 = document.createElement("h5");
    const texto = document.createTextNode(tarefa);
    h5.appendChild(texto);
    dvQuadro.appendChild(h5);

    frm.inTarefa.value = "";
    frm.inTarefa.focus();
});

frm.btSelecionar.addEventListener("click", () =>{
    const tarefas = document.querySelectorAll("h5");

    if(tarefas.length == 0){
        alert("Não há tarefas para selecionar");
        return;
    }

    let aux = -1;

    for(let i = 0; i < tarefas.length; i++){
        // se a tag é da class tarefa-selecionada (esta selecionada)
        if(tarefas[i].className == "tarefa-selecionada"){
            tarefas[i].className = "tarefa-normal";
            aux = i;
            break;
        }
    }

    if(aux == tarefas.length - 1){
        aux = -1;
    }

    tarefas[aux + 1].className = "tarefa-selecionada";
});

frm.btRetirar.addEventListener("click", () =>{
    const tarefas = document.querySelectorAll("h5");

    let aux = -1;

    //percorre a lista das tarefas inseridas na página (elementos h5)
    tarefas.forEach((tarefa, i) =>{
        if(tarefa.className == "tarefa-selecionada"){
            aux = i;
        }
    })

    if(aux == -1){
        alert("Selecione uma tarefa para removê-la...");
        return;
    }

    // solicita confirmação(exibindo o conteúdo da tag h5 selecionada)
    if(confirm(`Confirma Exclusão de "${tarefas[aux].innerText}"?`)){
        dvQuadro.removeChild(tarefas[aux]);
    }
})

frm.btGravar.addEventListener("click", () =>{
    const tarefas = document.querySelectorAll("h5");

    if(tarefas.length == 0){
        alert("Não há tarefas para serem salvas");
        return;
    }

    let dados = "";
    tarefas.forEach(tarefa =>{
        dados += tarefa.innerText + ";";
    })

    //grava os dados em localstorage, removendo o ultimo ";"
    localStorage.setItem("tarefasDia", dados.slice(0, -1));

    //confere se dados foram armazenados em localstorage
    if(localStorage.getItem("tarefasDia")){
        alert("ok! tarefas Salvas");
    }
})

window.addEventListener("load", () =>{
    // verifica se há tarefas salvas no navegador do usuário 
    if(localStorage.getItem("tarefasDia")){
        const dados = localStorage.getItem("tarefasDia").split(";");
        
        dados.forEach(dado => {
            const h5 = document.createElement("h5");
            const texto = document.createTextNode(dado);
            h5.appendChild(texto);
            dvQuadro.appendChild(h5);
        })
    }
})