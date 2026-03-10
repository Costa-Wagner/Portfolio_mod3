console.log("JS carregou");

// ===== SAUDAÇÃO AUTOMÁTICA =====
// ① Estrutura de decisão - exibe saudação conforme horário do dia
let agora = new Date();
let hora = agora.getHours();
let mensagem = "";

if (hora < 12) {
  mensagem = "Bom dia! Seja bem-vindo ao meu portfólio.";
} else if (hora < 18) {
  mensagem = "Boa tarde! Seja bem-vindo ao meu portfólio.";
} else {
  mensagem = "Boa noite! Seja bem-vindo ao meu portfólio.";
}

document.getElementById("saudacao").innerText = mensagem;

// ===== ANO AUTOMÁTICO NO FOOTER =====
document.getElementById("ano").textContent = new Date().getFullYear();

// ===== DADOS — CURSOS =====
const cursos = [
  {
    nome: "Escola de Inovadores",
    horas: "40h",
    instituicao: "FATEC",
    ano: 2025
  },
  {
    nome: "Python Básico",
    horas: "18h",
    instituicao: "Fundação Bradesco",
    ano: 2025
  }
];

// ===== GERAR LISTA DE CURSOS =====
// ② Repetição - percorre o array e cria um item para cada curso
const listaCursos = document.getElementById("lista-cursos");

for (let i = 0; i < cursos.length; i++) {
  listaCursos.innerHTML += `
    <li>
      <strong>${cursos[i].nome} (${cursos[i].horas})</strong>
      <span>${cursos[i].instituicao} · ${cursos[i].ano}</span>
    </li>
  `;
}

// ===== DADOS — SKILLS =====
// ② Repetição - array com as habilidades técnicas
const skills = [
  { nome: "HTML5",      icone: "🌐", nivel: 60 },
  { nome: "CSS3",       icone: "🎨", nivel: 55 },
  { nome: "JavaScript", icone: "⚡", nivel: 45 },
  { nome: "Python",     icone: "🐍", nivel: 35 },
  { nome: "GitHub",     icone: "🐙", nivel: 50 },
  { nome: "Vercel",     icone: "▲",  nivel: 45 }
];

// ===== GERAR CARDS DE SKILLS =====
// ② Repetição - cria um card para cada habilidade do array
const listaSkills = document.getElementById("lista-skills");

for (let i = 0; i < skills.length; i++) {
  listaSkills.innerHTML += `
    <div class="skill-card">
      <span>${skills[i].icone}</span>
      <p>${skills[i].nome}</p>
      <p>${skills[i].nivel}%</p>
    </div>
  `;
}

// ===== DADOS — PROJETOS =====
const projetos = [
  {
    nome: "Projeto Portfólio",
    data: "dez/2025",
    descricao: "Projeto acadêmico (1º sem. FATEC) voltado ao desenvolvimento de um portfólio pessoal, integrando HTML, CSS, JavaScript e Python (Flask).",
    categoria: "academico",
    link: "https://portfolio-wagner-nu.vercel.app/",
    github: "https://github.com/Costa-Wagner/portfolio"
  },
  {
    nome: "Projeto API — JanoSys",
    data: "dez/2025",
    descricao: "Projeto acadêmico (1º sem. FATEC) onde atuei como Product Owner da equipe JanoSys, desenvolvendo solução para visualização dos dados do CENSO 2010/2022.",
    categoria: "api",
    link: "https://janosysapi1.vercel.app/",
    github: "https://github.com/janosystime/Janosys-Project"
  },
  {
    nome: "Site Pessoal",
    data: "out/2025",
    descricao: "Projeto acadêmico (1º sem. FATEC) explorando conceitos de desenvolvimento web, experiência do usuário e design digital.",
    categoria: "academico",
    link: "https://ws-start-ten.vercel.app/",
    github: "https://github.com/Costa-Wagner/WS.start"
  }
];

// ===== GERAR CARDS DE PROJETOS =====
// ③ Função - renderiza os cards de projetos
function renderProjetos(filtro) {

  const container = document.getElementById("lista-projetos");
  container.innerHTML = "";

  for (let i = 0; i < projetos.length; i++) {

    // ① Estrutura de decisão - exibe só os projetos da categoria selecionada
    if (filtro === "todos" || projetos[i].categoria === filtro) {

      container.innerHTML += `
        <article class="projeto-card" data-categoria="${projetos[i].categoria}">
          <h3>${projetos[i].nome}</h3>
          <h4>${projetos[i].data}</h4>
          <p>${projetos[i].descricao}</p>
          <div class="proj-actions">
            <a href="${projetos[i].link}" target="_blank" class="btn-proj">► Ver projeto</a>
            <a href="${projetos[i].github}" target="_blank" class="btn-proj">► GitHub</a>
          </div>
        </article>
      `;
    }
  }
}

// ===== FILTRO DE PROJETOS =====
// ③ Função - filtra projetos por categoria ao clicar nos botões
function filtrarProjetos(categoria, btn) {

  // ① Estrutura de decisão - ativa o botão clicado
  const botoes = document.querySelectorAll(".filtros-projetos button");

  botoes.forEach(function(b) {
    if (b === btn) {
      b.classList.add("ativo");
    } else {
      b.classList.remove("ativo");
    }
  });

  renderProjetos(categoria);
}

// ===== VALIDAÇÃO DO FORMULÁRIO =====
// ③ Função - valida os campos antes de enviar para o Formspree
async function validarFormulario(event) {
  event.preventDefault();

  const nome     = document.getElementById("form-nome");
  const email    = document.getElementById("form-email");
  const mensagem = document.getElementById("form-mensagem");
  const feedback = document.getElementById("form-feedback");

  feedback.innerHTML = "";
  let erros = [];

  // ① Estrutura de decisão - verifica se os campos estão preenchidos
  if (nome.value.trim() === "") {
    erros.push("Preencha o campo Nome.");
  }

  if (email.value.trim() === "") {
    erros.push("Preencha o campo E-mail.");
  } else if (!email.value.includes("@")) {
    erros.push("Informe um e-mail válido.");
  }

  if (mensagem.value.trim() === "") {
    erros.push("Preencha o campo Mensagem.");
  }

  // ① if/else - exibe erros ou envia para o Formspree
  if (erros.length > 0) {

    feedback.style.color = "#ff4466";
    for (let i = 0; i < erros.length; i++) {
      feedback.innerHTML += "<p>" + erros[i] + "</p>";
    }

  } else {

    const resposta = await fetch("https://formspree.io/f/xdawaqnn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nome.value,
        email: email.value,
        mensagem: mensagem.value
      })
    });

    if (resposta.ok) {
      feedback.style.color = "#00ff9c";
      feedback.innerHTML = "<p>✔ Mensagem enviada! Em breve entrarei em contato.</p>";
      nome.value     = "";
      email.value    = "";
      mensagem.value = "";
    } else {
      feedback.style.color = "#ff4466";
      feedback.innerHTML = "<p>Erro ao enviar. Tente pelo WhatsApp.</p>";
    }
  }

  return false;
}

// ===== INICIALIZAÇÃO =====
renderProjetos("todos");