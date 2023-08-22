const btnCalcular = document.querySelector('.calcular');
const btnLimpar = document.querySelector('.limpar')
const salario = document.querySelector('#salario'); 

const converterStringNumber = (valorString) => {
    let valorCoveter;
    valorString === ''? valorCoveter = '0,00' : valorCoveter = valorString;
    let convertido = valorCoveter.replace(/\./g, "").replace(",", ".");
    return parseFloat(convertido);
}

const calcularInss = (salarioBruto) => {
    if(salarioBruto <= 1319.99) {
        return inssPagar = salarioBruto * 0.075
    }else if(salarioBruto >= 1320.01 && salarioBruto <= 2571.29) {
        return inssPagar = ((salarioBruto - 1320) * 0.09) + 99
    } else if(salarioBruto >= 2571.30 && salarioBruto <= 3856.94) {
        return inssPagar = ((salarioBruto - 2571.29 ) * 0.12) + 211.62
    } else if(salarioBruto >= 3856.95 && salarioBruto <= 7507.49) {
        return inssPagar = ((salarioBruto - 3856.94 ) * 0.14) + 365.90
    } else {
        return inssPagar = 876.97 
    }
}

const mostrarCalculoInss = (e) => {
    e.preventDefault()
    const exibirValor = document.querySelector('#valorInss');
    const salarioConvertido = converterStringNumber(salario.value)
    const parteResultado = document.querySelector('.resultado');
    
    if(salarioConvertido === 0) {
        salario.style.focus = "1px solid red"
        salario.style.borderColor = "red"
        salario.placeholder = 'digite um valor válido!'
        exibirValor.innerHTML = ''
        parteResultado.style.display = 'none'
    } else {
        salario.style.borderColor = "initial"
        const valorInssString = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'} ).format(calcularInss(salarioConvertido))
        exibirValor.value = valorInssString
    }
}

const limparCampos = (e) => {
    e.preventDefault()

    const exibirValor = document.querySelector('#valorInss')
    salario.value = ''
    exibirValor.value = ''
}

btnCalcular.addEventListener('click', mostrarCalculoInss);
btnLimpar.addEventListener('click', limparCampos)

