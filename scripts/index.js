import {getUser,validateUser, setoresAPI , empresasAPI,empresasPorSetor } from "../scripts/requests.js"

function renderDashboards() {
    const user = getUser();
    
    const userValid = validateUser()
   
    if (user && userValid && userValid.is_admin) {
      window.location.replace("../pages/admin.html");
    } else if (user && userValid && !userValid.is_admin) {
      window.location.replace("../pages/user.html");
    } 
  }
renderDashboards()

async function renderizaSetores(){
    const selTag =document.querySelector('select')

    const listaDeSetores = await setoresAPI()
    
    listaDeSetores.forEach(setor => {
        
        selTag.insertAdjacentHTML('beforeend', `
          <option value ="${setor.description}">${setor.description}</option>
                `)
            })
    
        }
        
renderizaSetores()

async function renderizaEmpresas() {
    const ulTag = document.querySelector('ul')

    const listaDeEmpresas = await empresasAPI()
    
    listaDeEmpresas.forEach(empresa => {
        
        ulTag.insertAdjacentHTML('beforeend', `
            <li>
                <h3>${empresa.name}</h3>
                <div class="dadosEmpresa">
                <p>${empresa.opening_hours}</p>
                <p class ="setor">${empresa.sectors.description}</p>
                </div>
                </li>
                `)
            })
    
        }
        
        renderizaEmpresas()

    
async function renderizaEmpresasPorSetor (){
    const ulTag = document.querySelector('ul')

    const sectors = document.querySelector('#sectors')

    sectors.addEventListener('click', async(event) => {

        if(sectors.value == "start"){
            renderizaEmpresas()
        }else{
        const listadeEmpresasPorSetor = await empresasPorSetor(sectors.value)
    
        listadeEmpresasPorSetor.forEach(empresa => {
        ulTag.innerHTML=''
        ulTag.insertAdjacentHTML('beforeend', `
        <li>
            <h3>${empresa.name}</h3>
            <div class="dadosEmpresa">
            <p>${empresa.opening_hours}</p>
            <p class ="setor">${empresa.sectors.description}</p>
            </div>
            </li>
            `)
            
        })
    }
    })
    
    
} 
renderizaEmpresasPorSetor()


function renderModalMenu (){
    const buttonMenu = document.querySelector('.homePGMenu')
    const body = document.querySelector('body')

    buttonMenu.addEventListener('click', (event) => {
        
        const modal = createModal()
        
        body.appendChild(modal) 
        closeModal()
    })
   
}

renderModalMenu()

function createModal(){
    const modalContainer = document.createElement('dialog')
    const loginBtn = document.createElement('button')
    const signUpBtn = document.createElement('button')
    const imgClose = document.createElement('img')
    const buttonClose = document.createElement('button')
    const linkLogin = document.createElement('a')
    const linkSignUp = document.createElement('a')

    linkLogin.href = "/pages/login.html"
    linkSignUp.href="/pages/signUp.html"

    linkLogin.innerText = "Login"
    linkSignUp.innerText = "Cadastro"
    imgClose.src = "/assets/Vector (3).png"

    loginBtn.classList.add('wCss', "loginModal")
    signUpBtn.classList.add('bCss')
    imgClose.classList.add('imgClose')
    linkSignUp.classList.add('linkSignUp')
    buttonClose.classList.add('btnClose')
    modalContainer.classList.add('openMenu')

   
    loginBtn.appendChild(linkLogin)
    signUpBtn.appendChild(linkSignUp)
    buttonClose.appendChild(imgClose)
    modalContainer.append(buttonClose,loginBtn,signUpBtn)
    
    return modalContainer
}

function closeModal (){
    const buttonClose = document.querySelector('.btnClose')

    buttonClose.addEventListener('click', () =>{
        const create = createModal()
        create.close() 
    })

}



