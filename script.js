// Banco de Dados Mockado
const dbAlunos = [
    { matricula: "202401", nome: "Isadora", curso: "Ciência da Computação", turma: "CC2025", totalAulas: 400, faltas: 12, justificadas: 4, injustificadas: 8, faltasPorDia: [2, 1, 3, 2, 4], faltasPorMes: [1, 1, 2, 0, 1, 1, 2, 0, 1, 1, 1, 1] },
    { matricula: "202402", nome: "Carlos", curso: "Ciência da Computação", turma: "CC2025", totalAulas: 400, faltas: 5, justificadas: 5, injustificadas: 0, faltasPorDia: [1, 1, 1, 1, 1], faltasPorMes: [0, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1, 0] },
    { matricula: "202403", nome: "Beatriz", curso: "Ciência da Computação", turma: "CC2025", totalAulas: 400, faltas: 20, justificadas: 2, injustificadas: 18, faltasPorDia: [5, 2, 2, 3, 8], faltasPorMes: [2, 3, 2, 1, 2, 0, 3, 2, 2, 1, 1, 1] },
    { matricula: "202404", nome: "Ana", curso: "Ciência da Computação", turma: "CC2024", totalAulas: 400, faltas: 30, justificadas: 10, injustificadas: 20, faltasPorDia: [8, 5, 2, 5, 10], faltasPorMes: [2, 4, 3, 2, 5, 1, 2, 2, 3, 2, 2, 2] },
    { matricula: "202405", nome: "Lucas", curso: "Ciência da Computação", turma: "CC2024", totalAulas: 400, faltas: 8, justificadas: 8, injustificadas: 0, faltasPorDia: [0, 0, 4, 4, 0], faltasPorMes: [0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0] },
    { matricula: "202406", nome: "Mariana", curso: "Engenharia Elétrica", turma: "EE2024", totalAulas: 350, faltas: 25, justificadas: 15, injustificadas: 10, faltasPorDia: [10, 2, 2, 1, 10], faltasPorMes: [5, 0, 0, 2, 3, 5, 0, 2, 3, 1, 2, 2] },
    { matricula: "202407", nome: "Rafael", curso: "Engenharia Elétrica", turma: "EE2024", totalAulas: 350, faltas: 15, justificadas: 0, injustificadas: 15, faltasPorDia: [3, 3, 3, 3, 3], faltasPorMes: [1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1] },
    { matricula: "202408", nome: "Fernanda", curso: "Engenharia Elétrica", turma: "EE2024", totalAulas: 350, faltas: 2, justificadas: 2, injustificadas: 0, faltasPorDia: [0, 1, 0, 1, 0], faltasPorMes: [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
    { matricula: "202409", nome: "João Pedro", curso: "Eletroeletrônica", turma: "ELT2026", totalAulas: 300, faltas: 18, justificadas: 6, injustificadas: 12, faltasPorDia: [2, 6, 6, 2, 2], faltasPorMes: [0, 2, 4, 2, 2, 0, 2, 2, 0, 4, 0, 0] },
    { matricula: "202410", nome: "Sofia", curso: "Eletroeletrônica", turma: "ELT2026", totalAulas: 300, faltas: 0, justificadas: 0, injustificadas: 0, faltasPorDia: [1, 2, 3, 4, 0], faltasPorMes: [0, 2, 0, 0, 0, 4, 0, 0, 1, 0, 3, 0] }
];

let charts = []; 
let rotaAtual = 'home';

function navegar(rota) {
    rotaAtual = rota;
    const content = document.getElementById('dynamic-content');
    limparGraficos();

    if (rota === 'home') {
        // H2: Ícones do mundo real adicionados. H4: Padrão visual mantido.
        content.innerHTML = `
            <h2 class="welcome-title">Bem-vindo ao Dashboard!</h2>
            <nav class="cards-nav">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
                <div class="card"><div class="card-icon"><i class="fa-regular fa-book"></i></div><h3>Panorama Geral</h3><button class="btn-orange" onclick="navegar('geral')">Acessar →</button></div>
                <div class="card"><div class="card-icon">🎓</div><h3>Panorama por Curso</h3><button class="btn-orange" onclick="navegar('curso')">Acessar →</button></div>
                <div class="card"><div class="card-icon">🏫</div><h3>Panorama por Turma</h3><button class="btn-orange" onclick="navegar('turma')">Acessar →</button></div>
                <div class="card"><div class="card-icon">🧑‍🎓</div><h3>Panorama por Aluno</h3><button class="btn-orange" onclick="navegar('aluno')">Acessar →</button></div>
            </nav>
            <div class="chart-box chart-box-large">
                <h4 class="chart-title">Quadro Geral - Frequência Institucional Mensal</h4>
                <canvas id="chartGeralHome"></canvas>
            </div>
        `;
        const statsGlobais = calcularEstatisticas(dbAlunos);
        criarGrafico('chartGeralHome', 'bar', ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], statsGlobais.meses);
    } 
    else {
        let titulo = rota === 'geral' ? 'Panorama Geral' : 
                     rota === 'curso' ? 'Panorama por Curso' : 
                     rota === 'turma' ? 'Panorama por Turma' : 'Panorama por Aluno';

        let inputArea = gerarFiltros(rota);

        // H3: Botão Voltar adicionado. H10: Tooltip de ajuda adicionado. H6: Div de Resumo Numérico preparada.
        content.innerHTML = `
            <div class="page-header">
                <div class="header-top">
                    <h2 class="page-title">${titulo}</h2>
                    <button class="btn-voltar" onclick="navegar('home')">← Voltar ao Início</button>
                </div>
                <div id="status-pesquisa" class="page-subtitle">Exibindo todos os dados. Use os filtros para refinar.</div>
                
                <div class="search-container" onkeypress="verificarEnter(event)">
                    <div class="search-bar">${inputArea}</div>
                    <span id="erro-msg" class="erro-msg" style="display:none;"></span>
                </div>
            </div>

            <div id="resumo-numerico" class="resumo-numerico" style="display:none;"></div>
            
            <div class="dashboard-grid">
                <div class="chart-box">
                    <h4 class="chart-title">Status de Frequência</h4>
                    <canvas id="chartPequeno1"></canvas>
                </div>
                <div class="chart-box">
                    <h4 class="chart-title" title="Classificação segundo regimento interno da instituição.">
                        Tipos de Ausência <span class="tooltip-icon">?</span>
                    </h4>
                    <canvas id="chartPequeno2"></canvas>
                </div>
                <div class="chart-box">
                    <h4 class="chart-title">Curva de Faltas na Semana</h4>
                    <canvas id="chartMedio"></canvas>
                </div>
            </div>
            <div class="chart-box chart-box-large">
                <h4 class="chart-title">Histórico Mensal Detalhado</h4>
                <canvas id="chartGrande"></canvas>
            </div>
        `;

        if(rota !== 'geral') inicializarDropdowns(rota);
        renderizarGraficosInternos(dbAlunos);
        verificarFiltros(rota); // Inicia verificando se o botão deve nascer bloqueado
    }
}

// === LÓGICA DE CÁLCULO ===
function calcularEstatisticas(listaAlunos) {
    let totalAulas = 0, totalFaltas = 0, just = 0, injust = 0;
    let dias = [0, 0, 0, 0, 0]; let meses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    listaAlunos.forEach(aluno => {
        totalAulas += aluno.totalAulas; totalFaltas += aluno.faltas;
        just += aluno.justificadas; injust += aluno.injustificadas;
        for(let i=0; i<5; i++) dias[i] += aluno.faltasPorDia[i];
        for(let i=0; i<12; i++) meses[i] += aluno.faltasPorMes[i];
    });

    return { presenca: [totalAulas - totalFaltas, totalFaltas], justificativas: [just, injust], dias: dias, meses: meses, totalAulas: totalAulas, totalFaltas: totalFaltas };
}

// === LÓGICA DOS FILTROS ===
function gerarFiltros(rota) {
    if (rota === 'geral') return `<span>Dados consolidados da instituição</span>`;
    
    // H5: Validações onchange adicionadas para travar o botão
    let html = `<select id="filtroCurso" onchange="atualizarTurmas('${rota}'); verificarFiltros('${rota}')"><option value="">1. Selecione o Curso</option></select>`;
    
    if (rota === 'turma' || rota === 'aluno') {
        html += `<select id="filtroTurma" onchange="atualizarAlunos('${rota}'); verificarFiltros('${rota}')" disabled><option value="">2. Selecione a Turma</option></select>`;
    }
    if (rota === 'aluno') {
        html += `<select id="filtroAluno" onchange="verificarFiltros('${rota}')" disabled><option value="">3. Selecione o Aluno</option></select>`;
    }
    
    // H4: Ícone no botão. Botão nasce disabled até passar na verificação.
    html += `<button id="btnPesquisar" class="btn-orange" onclick="executarFiltro()" disabled>🔍 Pesquisar</button>`;
    return html;
}

// H7: Flexibilidade de uso - Permite buscar com a tecla Enter
function verificarEnter(event) {
    if (event.key === 'Enter') {
        const btn = document.getElementById('btnPesquisar');
        if (btn && !btn.disabled) executarFiltro();
    }
}

// H5: Prevenção de Erros - Só libera o botão de pesquisa quando a rota for satisfeita
function verificarFiltros(rota) {
    if (rota === 'geral') return;
    const btn = document.getElementById('btnPesquisar');
    const curso = document.getElementById('filtroCurso')?.value;
    const turma = document.getElementById('filtroTurma')?.value;
    const aluno = document.getElementById('filtroAluno')?.value;

    let formValido = false;
    if (rota === 'curso' && curso) formValido = true;
    if (rota === 'turma' && curso && turma) formValido = true;
    if (rota === 'aluno' && curso && turma && aluno) formValido = true;

    btn.disabled = !formValido;
    // Oculta mensagem de erro assim que o usuário interage
    document.getElementById('erro-msg').style.display = 'none'; 
}

function inicializarDropdowns(rota) {
    const cursos = [...new Set(dbAlunos.map(a => a.curso))];
    const selectCurso = document.getElementById('filtroCurso');
    cursos.forEach(c => selectCurso.innerHTML += `<option value="${c}">${c}</option>`);
}

function atualizarTurmas(rota) {
    if(rota === 'curso') return; 
    const cursoSelecionado = document.getElementById('filtroCurso').value;
    const selectTurma = document.getElementById('filtroTurma');
    const selectAluno = document.getElementById('filtroAluno');

    selectTurma.innerHTML = '<option value="">2. Selecione a Turma</option>';
    selectTurma.disabled = true;
    if(selectAluno) { selectAluno.innerHTML = '<option value="">3. Selecione o Aluno</option>'; selectAluno.disabled = true; }

    if (cursoSelecionado) {
        selectTurma.disabled = false;
        const turmas = [...new Set(dbAlunos.filter(a => a.curso === cursoSelecionado).map(a => a.turma))];
        turmas.forEach(t => selectTurma.innerHTML += `<option value="${t}">${t}</option>`);
    }
}

function atualizarAlunos(rota) {
    if(rota !== 'aluno') return; 
    const turmaSelecionada = document.getElementById('filtroTurma').value;
    const selectAluno = document.getElementById('filtroAluno');

    selectAluno.innerHTML = '<option value="">3. Selecione o Aluno</option>';
    selectAluno.disabled = true;

    if (turmaSelecionada) {
        selectAluno.disabled = false;
        const alunos = dbAlunos.filter(a => a.turma === turmaSelecionada);
        alunos.forEach(a => selectAluno.innerHTML += `<option value="${a.nome}">${a.nome}</option>`);
    }
}

function executarFiltro() {
    let alunosFiltrados = dbAlunos;
    const curso = document.getElementById('filtroCurso')?.value;
    const turma = document.getElementById('filtroTurma')?.value;
    const aluno = document.getElementById('filtroAluno')?.value;
    const erroMsg = document.getElementById('erro-msg');

    // H9: Recuperação de erros suave, sem alert() travando a tela
    if ((rotaAtual === 'curso' && !curso) || 
        (rotaAtual === 'turma' && !turma) || 
        (rotaAtual === 'aluno' && !aluno)) {
        erroMsg.innerText = "Por favor, preencha todos os campos obrigatórios antes de pesquisar.";
        erroMsg.style.display = 'block';
        return;
    }

    if (curso) alunosFiltrados = alunosFiltrados.filter(a => a.curso === curso);
    if (turma) alunosFiltrados = alunosFiltrados.filter(a => a.turma === turma);
    if (aluno) alunosFiltrados = alunosFiltrados.filter(a => a.nome === aluno);

    // H1: Visibilidade do status - Atualiza o subtítulo para mostrar o que está sendo exibido
    let statusText = "Filtro ativo: ";
    if (aluno) statusText += `Aluno(a) ${aluno} (${turma} - ${curso})`;
    else if (turma) statusText += `Turma ${turma} (${curso})`;
    else if (curso) statusText += `Curso de ${curso}`;
    document.getElementById('status-pesquisa').innerText = statusText;

    limparGraficos();
    renderizarGraficosInternos(alunosFiltrados);
}

// === RENDERIZAÇÃO DOS GRÁFICOS E RESUMO ===
function renderizarGraficosInternos(dadosAlunos) {
    const stats = calcularEstatisticas(dadosAlunos);

    // H6: Reconhecimento invés de memorização (Cards de Resumo)
    const resumoDiv = document.getElementById('resumo-numerico');
    if (resumoDiv) {
        resumoDiv.style.display = 'flex';
        resumoDiv.innerHTML = `
            <div class="resumo-card"><h5>Aulas Ministradas</h5><span>${stats.totalAulas}</span></div>
            <div class="resumo-card"><h5>Total de Presenças</h5><span>${stats.presenca[0]}</span></div>
            <div class="resumo-card alert"><h5>Total de Faltas Registradas</h5><span style="color:#d63031">${stats.totalFaltas}</span></div>
        `;
    }

    criarGrafico('chartPequeno1', 'doughnut', ['Presenças', 'Faltas'], stats.presenca);
    if (stats.justificativas[0] === 0 && stats.justificativas[1] === 0) {
        criarGrafico('chartPequeno2', 'pie', ['Nenhuma Falta'], [1]);
    } else {
        criarGrafico('chartPequeno2', 'pie', ['Justificadas', 'Não Justificadas'], stats.justificativas);
    }
    criarGrafico('chartMedio', 'line', ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'], stats.dias);
    criarGrafico('chartGrande', 'bar', ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], stats.meses);
}

function criarGrafico(id, tipo, labels, dados) {
    const canvas = document.getElementById(id);
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const novoGrafico = new Chart(ctx, {
        type: tipo,
        data: {
            labels: labels,
            datasets: [{
                label: 'Ocorrências', data: dados,
                backgroundColor: ['#25665b', '#fa8231', '#0f3d36', '#aebfaa', '#c5dcc5', '#88a688'],
                borderWidth: 1, tension: 0.3 
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });
    charts.push(novoGrafico);
}

function limparGraficos() {
    charts.forEach(chart => chart.destroy());
    charts = [];
}

window.onload = () => { navegar('home'); };
