const btnCalcular = document.querySelector('.btn-calcular');
const divResultado = document.querySelector('.resultado');
const salarioBruto = document.querySelector('#salarioBruto');
const valeRefeicao = document.querySelector('#valeRefeicao');
const valeTransporte = document.querySelector('#ValeTransporte');
const planoSaude = document.querySelector('#planoSaude');
const outrosBeneficios = document.querySelector('#beneficios');
const dependentes = document.querySelector('#dependentes');
const btnLimpar = document.querySelector('#limparInputs');
let inssPagar;
let irpjPagar;
let salarioLiquidoGlobal;
let beneficiosGlobal;


// função para converter os valores recebidos no input em number
const converterStringNumber = (valorString) => {
    // let valorCoveter;
    let convertido;

    if(valorString === '') {
        return 0;
    } else {
        convertido = parseFloat(valorString.replace(/\./g, "").replace(",", "."));
        return convertido
    }
    // valorString === ''? valorCoveter = '0' : valorCoveter = valorString;
    // let convertido = valorCoveter.replace(/\./g, "").replace(",", ".");
    // return parseFloat(convertido);
}

// const converterStringNumber2 = (valorString) => {
//     let valorCoveter;
//     valorString === ''? valorCoveter = '0,00' : valorCoveter = valorString;
//     let convertido = valorCoveter.replace(/\./g, "").replace(",", ".");
//     return parseFloat(convertido);
// }

//função para calcular o salario clt







const calcularSalarioClt = () => {
    const salarioConvertido = converterStringNumber(salarioBruto.value);

    const calcularInss = (salarioBruto) => {
        if(salarioBruto >= 1320.01 && salarioBruto <= 2571.29) {
            return inssPagar = ((salarioBruto - 1320) * 0.09) + 99
        } else if(salarioBruto >= 2571.30 && salarioBruto <= 3856.94) {
            return inssPagar = ((salarioBruto - 2571.29 ) * 0.12) + 211.62
        } else if(salarioBruto >= 3856.95 && salarioBruto <= 7507.49) {
            return inssPagar = ((salarioBruto - 3856.94 ) * 0.14) + 365.90
        } else {
            return inssPagar = 876.97 
        }
    }

    const calcularIrpf = (salarioBruto) => {
        let valorInss = calcularInss(salarioConvertido);
        let nDependentes = dependentes.value > 0 ? dependentes.value : 0;
        let valorTotalDependentes = nDependentes * 189.59
        let valorDescontoBase = valorInss + valorTotalDependentes
        let baseCalculo;
        let valorApagar = 0;

        if(valorDescontoBase < 528) {
            baseCalculo = salarioBruto - 528;
            if(baseCalculo <= 2112.00) {
                return 0
            } else if(baseCalculo >= 2112.01 && baseCalculo <= 2826.65) {
                return valorApagar = (baseCalculo * 0.075) - 158.40;
            } else if(baseCalculo >= 2826.66 && baseCalculo <= 3751.06) {
                return valorApagar = (baseCalculo * 0.15) - 370.40;
            } else if(baseCalculo >= 3751.07 && baseCalculo <= 4664.68) {
                return valorApagar = (baseCalculo * 0.225) - 651.73;
            } else {
                return valorApagar = 884.96;
            }

        } else {
            baseCalculo = salarioBruto - valorDescontoBase;
            if(baseCalculo <= 2112.00) {
                return 0
            } else if(baseCalculo >= 2112.01 && baseCalculo <= 2826.65) {
                return valorApagar = (baseCalculo * 0.075) - 158.40;
            } else if(baseCalculo >= 2826.66 && baseCalculo <= 3751.06) {
                return valorApagar = (baseCalculo * 0.15) - 370.40;
            } else if(baseCalculo >= 3751.07 && baseCalculo <= 4664.68) {
                return valorApagar = (baseCalculo * 0.225) - 651.73;
            } else {
                return valorApagar = 884.96;
            }
        }
    }

    inssPagar = calcularInss(salarioConvertido)
    irpjPagar = calcularIrpf(salarioConvertido)

    // setarValoresResultadosClt(calcularInss(salarioConvertido), calcularIrpf(salarioConvertido), salarioConvertido);
    const salarioLiquido = salarioConvertido - calcularInss(salarioConvertido) - calcularIrpf(salarioConvertido).toFixed(2);
    alert(calcularInss(salarioConvertido).toFixed(2) + " inss pagar " + calcularIrpf(salarioConvertido).toFixed(2) + " irpj pagar")

    salarioLiquidoGlobal = salarioLiquido
    console.log(salarioLiquidoGlobal)

    return salarioLiquido
}

// função resposavel por calcular o valor das férias do funcionario
const calcularFerias = (salarioBruto) => {
    const salarioFerias = salarioBruto + (salarioBruto / 3)
    const salarioFeriasLiquido = salarioFerias - inssPagar + irpjPagar;
    return salarioFeriasLiquido
}

// função responsável por setar os valores na seção resultados
const setarValoresResultadosClt = (valorInss, valorIrpj, salarioBruto) => {
    const salarioBrutoResult = document.querySelector('.sBruto');
    const descontoResult = document.querySelector('.desconto');
    const beneficiosResult = document.querySelector('.beneficio');
    const salarioMensalResult = document.querySelector('.sMensal');

    const descontoSet = valorInss + valorIrpj;
    const salarioLiquidoMensalResult = (salarioBruto + beneficiosGlobal) - descontoSet;
    console.log(beneficiosGlobal)

        
    salarioBrutoResult.innerHTML = salarioBruto.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });;
    descontoResult.innerHTML = descontoSet.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });;
   
    beneficiosResult.innerHTML = beneficiosGlobal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });;

      salarioMensalResult.innerHTML = salarioLiquidoMensalResult.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });;;

}

// função responsável por calcular os valores e setar 
const setarBeneficios = () => {

    const valeRefeicaoConvertido = converterStringNumber(valeRefeicao.value);
    const valeTransporteConvertido = converterStringNumber(valeTransporte.value);
    const planoSaudeConvertido = converterStringNumber(planoSaude.value);
    const outrosBeneficiosConvertido = converterStringNumber(outrosBeneficios.value);

    const ferias = calcularFerias(converterStringNumber(salarioBruto.value));
    const decimo13 = parseFloat(salarioLiquidoGlobal);
    const fgts = converterStringNumber(salarioBruto.value) * 0.08;

    const beneficiosObrigatorio = (ferias + decimo13 + fgts) / 12
    
    const somaBeneficios = valeRefeicaoConvertido + valeTransporteConvertido + planoSaudeConvertido + outrosBeneficiosConvertido + beneficiosObrigatorio;
    beneficiosGlobal = String(somaBeneficios);
    console.log(beneficiosGlobal)
    return somaBeneficios
}

// Calcular salario, função que será execultada no click do botão 
const calcularSalario = (e) =>  {
    e.preventDefault()

    const salarioConvertido = converterStringNumber(salarioBruto.value);
    
    if(salarioConvertido >= 1320) {
        divResultado.classList.add('mostrar-resultado')
        calcularSalarioClt()
        setarBeneficios()
        setarValoresResultadosClt(inssPagar, irpjPagar, salarioLiquidoGlobal);
    }
}

// função responsável por limpar os campos de entrada de valores
const limparCampos = () => {
    divResultado.classList.remove('mostrar-resultado')
    salarioBruto.value = ''
    valeRefeicao.value = ''
    valeTransporte.value = ''
    planoSaude.value = ''
    outrosBeneficios.value = ''
    dependentes.value = ''
}

btnCalcular.addEventListener('click', calcularSalario);
btnLimpar.addEventListener('click', limparCampos);