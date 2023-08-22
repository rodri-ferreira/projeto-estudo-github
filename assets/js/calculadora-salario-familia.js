const salarioBase = 1754.18;
const valorPorDependente = 59.82;

const inputSalario = document.querySelector('#valor');
const inputDependentes = document.querySelector('#dependentes');
const btnCalcular = document.querySelector('.calcular');
const btnLimpar = document.querySelector('.limpar');
const inputMostarSalario = document.querySelector('#valorSalarioFamilia')
const mensagemTeto = document.querySelector('#mensagem')

const calcularSalarioFamilia = (e) => {
    e.preventDefault();
    let salarioString = inputSalario.value;
    let salarioNumber = salarioString.replace(/\./g, "").replace(",", ".");
    parseFloat(salarioNumber);

    if(salarioBase >= salarioNumber) {
        let salarioReceber = valorPorDependente * inputDependentes.value
        let valorExibir = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'} ).format(salarioReceber)
        inputMostarSalario.value =  valorExibir
        mensagemTeto.textContent = ''
        mensagemTeto.style.padding = '0'
    } else {
        mensagemTeto.textContent = 'Você não tem direito ao salário família por receber mais que o teto de R$ 1.754,18.'
        mensagemTeto.style.padding = '10px'
        inputMostarSalario.value = 0 
    }
}

const limparCampos = (e) => {
    e.preventDefault()
    inputSalario.value = ''
    inputDependentes.value = ''
    inputMostarSalario.value = ''
    mensagemTeto.textContent = ''
    mensagemTeto.style.padding = '0'
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === 13) {
        btnCalcular.click();
    }
})

btnCalcular.addEventListener('click', calcularSalarioFamilia);
btnLimpar.addEventListener('click', limparCampos);