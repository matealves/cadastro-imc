import { PessoaController } from "./api/controllers/PessoaController.js";
import { ModalHelper } from "./api/helpers/ModalHelper.js";

const pessoaController = new PessoaController();

// CONTROLAR ENVIO DO FORMULARIO E EXIBICAO NA TABELA
const formulario = document.querySelector("#formulario");

// escutador de evento no formulario
formulario.addEventListener("submit", (event) => {
  // adicionar pessoa
  pessoaController.adiciona(event);

  ModalHelper.ocultarBotoes();
  ModalHelper.modal("Cadastro", "Pessoa cadastrada ou atualizada!");

  // limpar formulario
  pessoaController._limpaFormulario();
});

////// formulario formApagar
const formApagarEditar = document.querySelector("#formApagarEditar");
const btnApagar = document.querySelector("#btnApagar");
const btnEditar = document.querySelector("#btnEditar");

formApagarEditar.addEventListener("submit", (event) => {
  event.preventDefault();
});

btnApagar.addEventListener("click", () => {
  let id = document.querySelector("#id").value;

  if (id == "") {
    ModalHelper.ocultarBotoes();
    ModalHelper.modal("Tente novamente", "ID não encontrado.");
    return;
  }

  console.log("Apagar registro " + id);
  document.querySelector("#id").value = null;

  ////// INTERACOES COM A JANELA MODAL //////
  ModalHelper.mostrarBotoes();
  // abrir janela modal - titulo, mensagem
  ModalHelper.modal("Apagar registro", `Deseja apagar o registro ${id} ?`);

  // se cliar no botao sim
  document.querySelector("#sim").addEventListener("click", () => {
    pessoaController.apaga(id);
    id = null; // apagar o id IMPORTANTE!!!
    ModalHelper.closeModal();
  });
  ////// INTERACOES COM A JANELA MODAL //////
});

btnEditar.addEventListener("click", () => {
  let id = document.querySelector("#id").value;

  if (id == "") {
    ModalHelper.ocultarBotoes();
    ModalHelper.modal("Tente novamente", "ID não encontrado.");
    return;
  }
  // rolar pagina para cima
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  document.querySelector("#nome").focus();

  console.log("Editar registro " + id);

  document.querySelector("#idPessoa").value = id;
  document.querySelector("#id").value = null;

  let pessoa = pessoaController.buscaPorId(id);

  if (pessoa) {
    let { _nome, _idade, _peso, _altura } = pessoa;
    // preencher o formulario com os dados
    pessoaController.preencheFormulario(_nome, _idade, _peso, _altura);
  }
});

////// formulario formApagar

ModalHelper.fecharJanela();
