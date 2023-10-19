
//Validação Formulário
function validarFormulario() {
    var inputs = document.querySelectorAll("#formulario input, #formulario select");
    var isValid = true;
  
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].checkValidity()) {
        isValid = false;
        inputs[i].reportValidity();
        break;
      }
    }
  }

//Validar ISBN
function validarisbn(input) {
    var isbn = input.value.trim();
    var isValido = true;
    input.style.borderColor = "";
  
    if (isbn === "") {
      input.style.borderColor = "red";
      input.style.borderWidth = "2px";
      alert("ISBN inválido. Digite novamente.");
      input.value = "";
      isValido = false;
    } else if (!/^\d{13}$/.test(isbn)) {
      input.style.borderColor = "red";
      input.style.borderWidth = "2px";
      alert("ISBN inválido. Digite exatamente 13 números.");
      input.value = "";
      isValido = false;
    } else {
      input.style.borderColor = "#8AC78A";
      input.style.borderWidth = "2px";
    }
  
    return isValido;
  }
  
// Validação Título
function validarTitulo(input) {
    var titulo = input.value.trim();
    var isValido = true;
    input.style.borderColor = "";
    
    if (titulo === "") {
      input.style.borderColor = "red";
      input.style.borderWidth = "2px";
      alert("Título inválido. Digite novamente.");
      input.value = "";
      isValido = false;
    } else if (titulo.length < 5 || /\d/.test(titulo)) {
      input.style.borderColor = "red";
      input.style.borderWidth = "2px";
      alert("Título inválido. Digite novamente.");
      input.value = "";
      isValido = false;
    } else {
      input.style.borderColor = "#8AC78A";
      input.style.borderWidth = "2px";
    }
    
    return isValido;
  }
  
// Validação Autor
function validarAutor(input) {
    var autor = input.value.trim();
    var isValido = true;
    input.style.borderColor = "";
    
    if (autor === "") {
      input.style.borderColor = "red";
      input.style.borderWidth = "2px";
      alert("Autor inválido. Digite novamente.");
      input.value = "";
      isValido = false;
    } else if (autor.length < 5 || /\d/.test(autor)) {
      input.style.borderColor = "red";
      input.style.borderWidth = "2px";
      alert("Autor inválido. Digite novamente.");
      input.value = "";
      isValido = false;
    } else {
      input.style.borderColor = "#8AC78A";
      input.style.borderWidth = "2px";
    }
    
    return isValido;
  }
  
// Validação Editora
function validarEditora(input) {
    var editora = input.value.trim();
    var isValido = true;
    input.style.borderColor = "";
    
    if (editora === "") {
      input.style.borderColor = "red";
      input.style.borderWidth = "2px";
      alert("Editora inválida. Digite novamente.");
      input.value = "";
      isValido = false;
    } else if (editora.length < 3 || /\d/.test(editora)) {
      input.style.borderColor = "red";
      input.style.borderWidth = "2px";
      alert("Editora inválida. Digite novamente.");
      input.value = "";
      isValido = false;
    } else {
      input.style.borderColor = "#8AC78A";
      input.style.borderWidth = "2px";
    }
    
    return isValido;
}

// Validar informações no formato Select
function validarSelecao(select) {
    var valorSelecionado = select.value;
    if (valorSelecionado === "") {
      alert("Selecione a opção");
      select.style.borderColor = "red";
      select.style.borderWidth = "2px";
      return false;
    }
    select.style.borderColor = "#8AC78A";
    select.style.borderWidth = "2px";
    return true;
  }

// Validação Ano de Publicação
function validarAnoPublicacao(input) {
    var anoPublicacao = input.value.trim();
    var isValido = true;
    input.style.borderColor = "";
    
    if (!/^\d{4}$/.test(anoPublicacao)) {
        input.style.borderColor = "red";
        input.style.borderWidth = "2px";
        alert("Ano de Publicação inválido. Digite um ano com 4 dígitos numéricos.");
        input.value = "";
        isValido = false;
    } else {
        input.style.borderColor = "#8AC78A";
        input.style.borderWidth = "2px";
    }
    
    return isValido;
}

function validarNumPaginas(input) {
    var numPaginas = input.value.trim();
    input.style.borderColor = "";
    
    if (numPaginas === "") {
      input.style.borderColor = "red";
      input.style.borderWidth = "2px";
      alert("Informe o número de páginas do livro.");
      input.value = "";
    } else if (isNaN(numPaginas) || parseInt(numPaginas) <= 0) {
      input.style.borderColor = "red";
      input.style.borderWidth = "2px";
      alert("Número de páginas inválido. O número deve ser maior que zero.");
      input.value = "";
    } else {
      input.style.borderColor = "#8AC78A";
      input.style.borderWidth = "2px";
    }
  }
  
  function validarEdicao(input) {
    var edicao = input.value.trim();
    input.style.borderColor = "";
    
    if (edicao === "") {
      input.style.borderColor = "red";
      input.style.borderWidth = "2px";
      alert("Informe a edição do livro.");
      input.value = "";
    } else if (isNaN(edicao) || parseInt(edicao) <= 0) {
      input.style.borderColor = "red";
      input.style.borderWidth = "2px";
      alert("Edição inválida. A edição deve ser um número maior que zero.");
      input.value = "";
    } else {
      input.style.borderColor = "#8AC78A";
      input.style.borderWidth = "2px";
    }
  }
  