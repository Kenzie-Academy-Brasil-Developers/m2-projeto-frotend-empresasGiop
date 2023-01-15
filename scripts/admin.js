import{getUser,validateUser, empresasAPI, allDepartments,allUsers, companyDepartments,registerDepartment,editDepartment,deleteDepartment,updateEmployee,deleteUser} from "../scripts/requests.js"
import { hireEmployee,dismissEmployee,usersOut } from "../scripts/requests.js"

async function renderAdmin(){
    const user = await getUser()
    
    const userValid = await validateUser(user.token)
    
    if(user && !userValid) {
        window.location.replace('../index.html')
    } else if (user &&!userValid.is_admin) {
        window.location.replace('../pages/user.html')
    } 
}

renderAdmin()

async function renderizaEmpresas() {
    const select = document.querySelector('#selectEmpresa')

    const listaDeEmpresas = await empresasAPI()
    
    listaDeEmpresas.forEach(empresa => {
        
        select.insertAdjacentHTML('beforeend', `
        <option value="${empresa.uuid}"> ${empresa.name}</option>
        `)
    })
    
}

renderizaEmpresas()

async function allDepartmentsByAdmin(){
    const list = document.querySelector('#departmentsList')
    
    const listaDeDepartamentos = await allDepartments()

    listaDeDepartamentos.forEach(departamento =>{
        list.insertAdjacentHTML('beforeend',`
        <div class="dep">
        <h1>${departamento.name}</h1>
        <p id="pDesc">${departamento.description}</p>
        <p>${departamento.companies.name}</p>
        <div class="functionsBtns">
        <button class="${departamento.uuid}" id="visualizar">
            <img src="/assets/Vector (4).png" alt="">
        </button>
        <button class="${departamento.uuid}" value="${departamento.description}" id ="editar" >
            <img src="/assets/Vector (2).png" alt="">
        </button>
        <button class="${departamento.uuid}" value="${departamento.name}" id="delete">
            <img src="/assets/Vector (5).png" alt="">
        </button>
        </div>
        </div>
        `)
        
    })
    showModalToViewDep()
    showModaltoEditDep() 
    showModaltoDelete()
}

allDepartmentsByAdmin()

async function departmentByCompany(){
    const list = document.querySelector('#departmentsList')
    const select = document.querySelector('#selectEmpresa' )

    select.addEventListener('click', async (event) =>{
       
        const departmentsByCompany = await companyDepartments(select.value)
       
        list.innerHTML=''
       departmentsByCompany.forEach(department=>{
        list.insertAdjacentHTML('beforeend',`
        <div class="depByComp">
            <h1>${department.name}</h1>
            <p id="pDesc">${department.description}</p>
            <p>${department.companies.name}</p>
            <div class="functionsBtns">
            <button class="${department.uuid}" id="visualizar">
                <img src="/assets/Vector (4).png" alt="">
            </button>
            <button class="${department.uuid}" value="${department.description}" id="editar">
                <img src="/assets/Vector (2).png" alt="">
            </button>
            <button class="${department.uuid}" value="${department.name}" id="delete" >
                <img src="/assets/Vector (5).png" alt="">
            </button>
            </div>
            </div>
           
        `)
        showModalToViewDep()
        showModaltoEditDep() 
        showModaltoDelete()
       
       })
    })
}

departmentByCompany()

function showModalToViewDep() {
  const modalBtn = [...document.querySelectorAll("#visualizar")]
  const modalContainer = document.querySelector("#toViewDepartment");
 

  modalBtn.forEach(btn=> btn.addEventListener("click", () => {
      modalContainer.showModal();
       const uid = btn.className
      
       renderusersOutOfWork()
       renderDepToHire(uid)
       renderUserOfDep(uid)
       hire(uid)
       dismiss(uid)
       closeModalToView();
       
      }))
}

function closeModalToView() {
  const closeBtn = document.querySelector("#closeModalToViewBtn");
  const modalContainer = document.querySelector("#toViewDepartment");

  closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    modalContainer.close();
  });
}

async function renderusersOutOfWork () {
  const listOut = document.querySelector('#selUserToHire')

  const users = await usersOut()

  users.forEach(user =>{
    listOut.insertAdjacentHTML('beforeend',`
    <option value="${user.uuid}" > ${user.username}</option>
    `)
  })
}

async function renderDepToHire(uid){
  
  const divtoView = document.querySelector('#depToView')

  const depart = await allDepartments()
 
  depart.forEach(departamento => {
    if(departamento.uuid==uid){
      divtoView.innerHTML=''
      divtoView.insertAdjacentHTML('beforeend',`
      <h1>${departamento.name}</h1>
      <h2>${departamento.description}</h2>
      <p>${departamento.companies.name}</p>
      `)
    } 
  })

} 

async function renderUserOfDep(uid){
  const divDismiss = document.querySelector('#dissmissDiv')

  const employees = await allUsers()

  divDismiss.innerHTML=''
  employees.forEach(employee=>{
    if(employee.department_uuid == uid){
      
      divDismiss.insertAdjacentHTML('beforeend',`
      <h1>${employee.username}</h1>
      <p>${employee.professional_level}</p>
      <p>${employee.company_uuid}</p>
      <button class="rCss"> Desligar </button>
      `)
    } 
  })
}

function hire(uid) {
 
  const button = document.querySelector("#submitBtnToHire");
  const modalContainer = document.querySelector("#toViewDepartment");
  const select = document.querySelector('#selUserToHire')
  
  
  button.addEventListener("click", async (event) => {
    event.preventDefault();
  
    let userId = {}
    userId.uuid = select.value
    
    const request = await hireEmployee(userId.uuid , uid);
   
    modalContainer.close();
  });
}

  function dismiss() {
 
      const button = document.querySelector("#submitBtnDelUser");
      const modalContainer = document.querySelector("#deleteUserDialog");
      
      button.addEventListener("click", async (event) => {
        event.preventDefault();
      
        const request = await dismissEmployee();
        modalContainer.close();
      });

  return ;
}

function showModaltoCreate() {
    const modalBtn = document.querySelector("#create");
    const modalContainer = document.querySelector("#createDepartment");
  
    modalBtn.addEventListener("click", () => {
      modalContainer.showModal();
      createDepartment();
      async function renderizaEmpresas() {
        const select = document.querySelector('#selEmpresa')
    
        const listaDeEmpresas = await empresasAPI()
       
        
        listaDeEmpresas.forEach(empresa => {
            
            select.insertAdjacentHTML('beforeend', `
            <option value="${empresa.uuid}"> ${empresa.name}</option>
            `)
        })
        
    }
      renderizaEmpresas()
      closeModal();
    });
  }
  
function closeModal() {
    const closeBtn = document.querySelector("#closeModal");
    const modalContainer = document.querySelector("#createDepartment");
  
    closeBtn.addEventListener("click", (event) => {
      event.preventDefault();
      modalContainer.close();
    });
  }
  
  function createDepartment() {
    const inputs = document.querySelectorAll(".createDepartmentForm > input");
    const sel = document.querySelector('#selEmpresa')
    const button = document.querySelector("#submitBtn");
    const modalContainer = document.querySelector("#createDepartment");
    const registerDep = {};
    
  
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      inputs.forEach((input) => {
          registerDep[input.name] = input.value;

        });
        registerDep.company_uuid = sel.value

    
     const request = await registerDepartment(registerDep);
      modalContainer.close();
    });
  
    return registerDep;
  }

 showModaltoCreate() 

function showModaltoEditDep() {
    const modalBtn = [...document.querySelectorAll("#editar")]
    const modalContainer = document.querySelector("#editDepartment");
    

    modalBtn.forEach(btn=> btn.addEventListener("click", (event) => {
      event.preventDefault()
      const uuid = btn.className
      let descricao = document.getElementsByClassName('descToEdit')[0].placeholder = btn.value;
      
     
    modalContainer.showModal();
    
     editarDepartamento(uuid);
     
     closeModalEdit();
    }))
  }
  
function closeModalEdit() {
    const closeBtn = document.querySelector("#closeModalEdit");
    const modalContainer = document.querySelector("#editDepartment");
  
    closeBtn.addEventListener("click", (event) => {
      event.preventDefault();

     
    
      modalContainer.close();

    });
  }
  
function editarDepartamento(uuid) {
  
    const inputs = document.querySelector(".descToEdit");
    
    const button = document.querySelector("#submitBtnEdit");
    const modalContainer = document.querySelector("#editDepartment");
    const editDep = {};
    
    
  

    button.addEventListener("click", async (event) => {
      event.preventDefault();
      
          editDep[inputs.name] = inputs.value
          
        console.log(editDep)

        
         
       
  
      const request = await editDepartment(editDep , uuid);
     
      modalContainer.close();
    });
  
    return editDep;
  }

function showModaltoDelete() {
    const modalBtn = [...document.querySelectorAll("#delete")]
    const modalContainer = document.querySelector("#deleteDepartment");
    let span = document.querySelector('.dD')
  
    modalBtn.forEach(btn=> btn.addEventListener("click", () => {
        modalContainer.showModal();
          let uuid = btn.className
         span.innerHTML = btn.value 
      
         deletarDepartamento(uuid);
         
         closeModalDelete();
         
        }))
  }
  
function closeModalDelete() {
    const closeBtn = document.querySelector("#closeModalDel");
    const modalContainer = document.querySelector("#deleteDepartment");
  
    closeBtn.addEventListener("click", (event) => {
      event.preventDefault();
      modalContainer.close();
    });
  }
  
function deletarDepartamento(uuid) {
    const button = document.querySelector("#submitBtnToDel");
    const modalContainer = document.querySelector("#deleteDepartment");
    
    button.addEventListener("click", async (event) => {
      event.preventDefault();
     
      
      const request = await deleteDepartment(uuid);
      modalContainer.close();
    });
  
    return 
  }

async function allUserByAdmin(){
    const list = document.querySelector('#usersSignedsList')

    const listaDeUsuarios = await allUsers()

    listaDeUsuarios.forEach(usuario=>{
      if(usuario.username=="ADMIN"){ 
      }else{
        list.insertAdjacentHTML('beforeend',`
        <div class="users">
        <h1>${usuario.username}</h1>
    <p>${usuario.professional_level}</p>
    <p>${usuario.company_uuid}</p>
    <div class="functionsBtns">
    <button id="editUserBtn" class="${usuario.uuid}">
        <img src="/assets/Vector (2).png" alt="">
    </button>
    <button id="deleteUser" value="${usuario.username}" class="${usuario.uuid}" >
        <img src="/assets/Vector (5).png" alt="">
    </button>
    </div>
    </div>
        `)
       
          
      }
       
      })
      showModaltoEditUser()
      showModaltoDeleteUser()
}

allUserByAdmin()

function showModaltoEditUser() {
  const modalBtn = [...document.querySelectorAll("#editUserBtn")]
  const modalContainer = document.querySelector("#editUser");
  

  modalBtn.forEach(btn=> btn.addEventListener("click", (event) => {
    event.preventDefault()
  modalContainer.showModal();
    const uuid = btn.className
   editarUsuario(uuid);
   
   closeModalEditUser();
 
  }))
}

function closeModalEditUser() {
  const closeBtn = document.querySelector("#closeModalEditUser");
  const modalContainer = document.querySelector("#editUser");

  closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    modalContainer.close();
  });
}

function editarUsuario(uuid) {
  const selKind = document.querySelector('#selKind')
  const selProf = document.querySelector('#selProf')
  
  const button = document.querySelector("#submitBtnEditUser");
  const modalContainer = document.querySelector("#editUser");
  const editUser = {};
  

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    editUser.kind_of_work = selKind.value
    editUser.professional_level = selProf.value

    const request = await updateEmployee(editUser,uuid);
    modalContainer.close();
  });

  return editUser;
}

function showModaltoDeleteUser() {
  const modalBtn = [...document.querySelectorAll("#deleteUser")]
  const modalContainer = document.querySelector("#deleteUserDialog");
  let span = document.querySelector('.dU')

  modalBtn.forEach(btn=> btn.addEventListener("click", () => {
      modalContainer.showModal();
       const uuid = btn.className
       const userName = btn.value
       span.innerHTML = userName
       deletarUser(uuid);
       
       closeModalDeleteUser();
       
      }))
}

function closeModalDeleteUser() {
  const closeBtn = document.querySelector("#closeModalDeleteUser");
  const modalContainer = document.querySelector("#deleteUserDialog");

  closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    modalContainer.close();
  });
}

function deletarUser(uuid) {
 
  const button = document.querySelector("#submitBtnDelUser");
  const modalContainer = document.querySelector("#deleteUserDialog");
  
  

  button.addEventListener("click", async (event) => {
    event.preventDefault();
  
    const request = await deleteUser(uuid);
    modalContainer.close();
  });

  return ;
}

function logout() {
    const logoutBtn = document.querySelector('#logoutBtn')
  
    logoutBtn.addEventListener('click', () => {
      localStorage.clear()
      window.location.replace('/')
    })
  }
  logout()