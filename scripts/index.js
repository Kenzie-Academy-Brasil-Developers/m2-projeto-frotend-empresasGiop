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
    const modalContainer = document.querySelector('#hLg')

    buttonMenu.addEventListener('click', (event) => {
        event.preventDefault()
        
        modalContainer.showModal()
        closeModal()
    })
   
}

renderModalMenu()

function createModal(){
    const modalContainer = document.querySelector('#hLg')
   
    return modalContainer
}

function closeModal (){
    const buttonClose = document.querySelector('.closeBtnHPg')

    buttonClose.addEventListener('click', () =>{
        const create = createModal()
        create.close() 
    })

}



