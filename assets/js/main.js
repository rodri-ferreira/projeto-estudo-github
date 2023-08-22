const btnMenu = document.querySelector('.menu');
const header = document.querySelector('header');
const navMenu = document.querySelector('.nav-menu');

btnMenu.addEventListener('click',() => {
    const scrollposicao = window.scrollY;
    navMenu.classList.toggle('active')

    if(scrollposicao === 0) {
        navMenu.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.5)"
    }
})

const mudarCorHeader = () => {
    const scrollposicao = window.scrollY;
    if(scrollposicao > 40) {
        header.style.boxShadow = "0 1px 4px 0 rgba(0, 0, 0, 0.5)"
    } else {    
        header.style.boxShadow = "none"
    }
}

document.addEventListener('scroll', mudarCorHeader);

const verificarTamanhoJanela = () => {
    return window.innerWidth;   
}

window.addEventListener("resize", () => {
    const larguraJanela = verificarTamanhoJanela() 
    if(larguraJanela > 992) {
        navMenu.style.boxShadow = "none"
    } else {
        navMenu.style.boxShadow = "0 1px 4px 0 rgba(0, 0, 0, 0.5)";
    }
})





















//header menu nav

//carrossel
document.addEventListener('DOMContentLoaded', function() {
    let stream = document.querySelector('.carrossel-fluxo');
    let items = document.querySelectorAll('.carrossel-card');

    const prev = document.querySelector('.carrossel-anterior');
    prev.addEventListener('click', function() {
        stream.insertBefore(items[items.length - 1], items[0]);
        items = document.querySelectorAll('.carrossel-card');
    });

    const next = document.querySelector('.carrossel-proximo');
    next.addEventListener('click', function() {
        stream.appendChild(items[0]);
        items = document.querySelectorAll('.carrossel-card');
    });
});

const cardProjeto = document.querySelectorAll('.projeto-img');
const btnProjeto = document.querySelectorAll('.btn-projeto');

cardProjeto.forEach((e, i)=> {
    e.addEventListener('mouseover', ()=> {
        e.style.opacity = ".5"
        btnProjeto[i].style.display='block'
    })

    e.addEventListener('mouseout', ()=> {
        e.style.opacity = "1"
        btnProjeto[i].style.display='none'
    })
})

btnProjeto.forEach((e, i)=> {
    e.addEventListener('mouseover', ()=> {
        e.style.display="block"
        cardProjeto[i].style.opacity = ".5"        
    })

    e.addEventListener('mouseout', ()=> {
        e.style.display="none"
        cardProjeto[i].style.opacity = "1"        
    })

    e.addEventListener("click", (evento) => {
        modal.show()
        mostrarInfosDinamicasModal(evento)
    })
})

fecharModal.addEventListener('click', ()=> {
    modal.close()
})