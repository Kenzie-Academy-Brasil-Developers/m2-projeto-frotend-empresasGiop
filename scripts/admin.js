import{getUser,validateUser, empresasAPI, allDepartments,allUsers, companyDepartments,registerDepartment,editDepartment,deleteDepartment,updateEmployee,deleteUser} from "../scripts/requests.js"

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
        <p>${departamento.description}</p>
        <p>${departamento.companies.name}</p>
        <div class="functionsBtns">
        <button class="${departamento.uuid}" id="visualizar">
            <img src="/assets/Vector (4).png" alt="">
        </button>
        <button class="${departamento.uuid}" id ="editar" >
            <img src="/assets/Vector (2).png" alt="">
        </button>
        <button class="${departamento.uuid}" id="delete">
            <img src="/assets/Vector (5).png" alt="">
        </button>
        </div>
        </div>
        `)
    })
    
    showModaltoEditDep() 
    showModaltoDelete()
}

allDepartmentsByAdmin()

async function departmentByCompany(){
    const list = document.querySelector('#departmentsList')
    const select = document.querySelector('#selectEmpresa' )

    select.addEventListener('click', async (event) =>{
       
        
        const departmentsByCompany = await companyDepartments(select.value)
       
    
       departmentsByCompany.forEach(department=>{
        list.innerHTML=''
        list.insertAdjacentHTML('beforeend',`
        <div class="depByComp">
            <h1>${department.name}</h1>
            <p>${department.description}</p>
            <p>${department.companies.name}</p>
            <div class="functionsBtns">
            <button class="${department.uuid}" id="visualizar">
                <img src="/assets/Vector (4).png" alt="">
            </button>
            <button class="${department.uuid}" id="editar">
                <img src="/assets/Vector (2).png" alt="">
            </button>
            <button class="${department.uuid}" id="delete" >
                <img src="/assets/Vector (5).png" alt="">
            </button>
            </div>
            </div>
           
        `)
        showModaltoEditDep() 
        showModaltoDelete()
     
       })
    })
   

}

departmentByCompany()

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
    

    modalBtn.forEach(btn=> btn.addEventListener("click", () => {
      console.log(modalBtn)
    modalContainer.showModal();
      
     editarDepartamento();
     
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
  
function editarDepartamento() {

    const inputs = document.querySelectorAll("form > input");
    
    const button = document.querySelector("#submitBtn");
    const modalContainer = document.querySelector("#editDepartment");
    const editDep = {};
    
    /*
  function renderDescription(){
    const placeholder = document.querySelector('input>placeholder')

    const description = await 
  } */

    button.addEventListener("click", async (event) => {
      event.preventDefault();
      inputs.forEach((input) => {
          editDep[input.name] = input.value;
        });
  
      const request = await editDepartment(editDep);
      modalContainer.close();
    });
  
    return editDep;
  }



function showModaltoDelete() {
    const modalBtn = [...document.querySelectorAll("#delete")]
    const modalContainer = document.querySelector("#deleteDepartment");
  
    modalBtn.forEach(btn=> btn.addEventListener("click", () => {
        modalContainer.showModal();
          
         deletarDepartamento();
         
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
  
function deletarDepartamento() {
    const deleta = [...document.querySelectorAll("button>class")]
    console.log(deleta)
    const button = document.querySelector("#submitBtn");
    const modalContainer = document.querySelector("#deleteDepartment");
    const deleteDep = {};
    
  
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      inputs.forEach((input) => {
          deleteDep[input.name] = input.value;
        });
  
      const request = await deleteDepartment(deleteDep);
      modalContainer.close();
    });
  
    return deleteDep;
  }

async function allUserByAdmin(){
    const list = document.querySelector('#usersSignedsList')

    const listaDeUsuarios = await allUsers()

    listaDeUsuarios.forEach(usuario=>{
        list.insertAdjacentHTML('beforeend',`
        <div class="users">
        <h1>${usuario.username}</h1>
    <p>${usuario.kind_of_work}</p>
    <p>${usuario.deparment_uuid}</p>
    <div class="functionsBtns">
    <button id="editUserBtn">
        <img src="/assets/Vector (2).png" alt="">
    </button>
    <button id="deleteUser">
        <img src="/assets/Vector (5).png" alt="">
    </button>
    </div>
    </div>
        `)
       
        showModaltoEditUser()
        showModaltoDeleteUser()
    })
}

allUserByAdmin()

function showModaltoEditUser() {
  const modalBtn = [...document.querySelectorAll("#editUserBtn")]
  const modalContainer = document.querySelector("#editUser");
  

  modalBtn.forEach(btn=> btn.addEventListener("click", () => {
  modalContainer.showModal();
    
   editarUsuario(modalBtn.value);
   console.log(modalBtn.value)
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

function editarUsuario() {
  const inputs = document.querySelectorAll("form > input");
  
  const button = document.querySelector("#submitBtn");
  const modalContainer = document.querySelector("#editUser");
  const editUser = {};
  

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    inputs.forEach((input) => {
        editUser[input.name] = input.value;
      });

    const request = await updateEmployee(editUser);
    modalContainer.close();
  });

  return editUser;
}

function showModaltoDeleteUser() {
  const modalBtn = [...document.querySelectorAll("#deleteUser")]
  const modalContainer = document.querySelector("#deleteUserDialog");

  modalBtn.forEach(btn=> btn.addEventListener("click", () => {
      modalContainer.showModal();
        
       deletarUser();
       
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

function deletarUser() {
 
  const button = document.querySelector("#submitBtn");
  const modalContainer = document.querySelector("#deleteUserDialog");
  const deleteDep = {};
  

  button.addEventListener("click", async (event) => {
    event.preventDefault();
  
    const request = await deleteUser(deleteDep);
    modalContainer.close();
  });

  return deleteDep;
}



function logout() {
    const logoutBtn = document.querySelector('#logoutBtn')
  
    logoutBtn.addEventListener('click', () => {
      localStorage.clear()
      window.location.replace('/')
    })
  }
  logout()