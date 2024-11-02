/*============================== Aqui começa o Js dos Botões do Carrosel de Imagens ===============================*/
document.addEventListener("DOMContentLoaded", () => {
    let currentImageIndex = 0;
    const images = document.querySelectorAll(".carousel-image");
    const totalImages = images.length;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = i === index ? "block" : "none";
        });
    }
    function changeImage(direction) {
        currentImageIndex += direction;

        if (currentImageIndex < 0) {
            currentImageIndex = totalImages - 1;
        }
        else if (currentImageIndex >= totalImages) {
            currentImageIndex = 0;
        }
        showImage(currentImageIndex);
    }
    showImage(currentImageIndex);
    document.querySelector(".prev").addEventListener("click", () => changeImage(-1));
    document.querySelector(".next").addEventListener("click", () => changeImage(1));
});
/*=============================== Aqui acaba o Js dos Botões do Carrosel de Imagens ===============================*/

/*======================== Aqui começa o Js da Tabela de UC's e botões de posicionamento ==========================*/
function addMaterial() {
    const tableBody = document.querySelector("#materialTable tbody");
    const newRow = document.createElement("tr");

    const materialCell = document.createElement("td");
    const materialInput = document.createElement("input");
    materialInput.type = "text";
    materialInput.placeholder = "Nome do Material";
    materialCell.appendChild(materialInput);

    const actionsCell = document.createElement("td");

    const upButton = document.createElement("button");
    upButton.classList.add("action-btn");
    upButton.textContent = "▲";
    upButton.onclick = () => moveRow(newRow, -1);

    const downButton = document.createElement("button");
    downButton.classList.add("action-btn");
    downButton.textContent = "▼";
    downButton.onclick = () => moveRow(newRow, 1);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("action-btn");
    deleteButton.textContent = "Remover";
    deleteButton.onclick = () => removeRow(newRow);

    actionsCell.appendChild(upButton);
    actionsCell.appendChild(downButton);
    actionsCell.appendChild(deleteButton);

    newRow.appendChild(materialCell);
    newRow.appendChild(actionsCell);

    tableBody.appendChild(newRow);
}

function removeRow(row) {
    row.remove();
}

function moveRow(row, direction) {
    const sibling = direction === -1 ? row.previousElementSibling : row.nextElementSibling;
    if (sibling) {
        direction === -1 ? row.parentNode.insertBefore(row, sibling) : row.parentNode.insertBefore(sibling, row);
    }
}
/*========================= Aqui acaba o Js da Tabela de UC's e botões de posicionamento ==========================*/

 // Função para mostrar o popup ao carregar a página
 window.onload = function() {
    document.getElementById("popup").style.display = "block";
};

// Máscara para o CPF
function mascaraCPF(cpfInput) {
    let cpf = cpfInput.value;
    cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    cpfInput.value = cpf;
}

// Função para validar o CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cpf.length !== 11) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
}

// Função para validar o e-mail
function validarEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

// Função para validar o formulário
function validarFormulario() {
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;

    if (!validarCPF(cpf)) {
        alert("CPF inválido!");
        return;
    }
    if (!validarEmail(email)) {
        alert("E-mail inválido!");
        return;
    }

    alert("Dados válidos!");
    document.getElementById("popup").style.display = "none"; // Esconde o popup
}