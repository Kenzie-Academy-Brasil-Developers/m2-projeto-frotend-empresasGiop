import {getUser,validateUser, updateData,findEmployee, departmentsOf, employeesApi} from "../scripts/requests.js"

async function renderUser(){
    const user = getUser();
    const userValid = validateUser(user.token)

    if(user&&userValid.is_admin){
        window.location.replace("../pages/admin.html");
    } else if (!user && !userValid) {
      window.location.replace("../index.html");
    } 
  }
  
  renderUser()
  
  async function renderEmployee(){
    const divData = document.querySelector('.data')
  
    const employee = await findEmployee()
    
    if(employee.kind_of_work ==null){
      employee.kind_of_work = 'não especificado'
    }
    if(employee.professional_level ==null){
      employee.professional_level ='não especificado'
    }

      divData.insertAdjacentHTML('beforeend', `
      <div>
      <div>
          <h2>Nome:${employee.username}</h2>
      </div>
      <div class="othersDatas">
          <p>Email:${employee.email}</p>
          <p>Nível Profissional:${employee.professional_level}</p>
          <p>Tipo de trabalho:${employee.kind_of_work}</p>
          <button type="submit" id="editProfile">
              <img src="/assets/Vector (2).png" alt="imgModProf">
          </button>
      </div>
      </div>
      `
      )
      showModal() 
     
  }

  renderEmployee()

function showModal() {
    const modalBtn = document.querySelector("#editProfile");
    const modalContainer = document.querySelector("dialog");
  
    modalBtn.addEventListener("click", () => {
      modalContainer.showModal();
      editProfileForm();
      closeModal();
    });
  }
  
  function closeModal() {
    const closeBtn = document.querySelector("#closeModal");
    const modalContainer = document.querySelector("dialog");
  
    closeBtn.addEventListener("click", (event) => {
      event.preventDefault();
      modalContainer.close();
    });
  }
  
  function editProfileForm() {
    const inputs = document.querySelectorAll("form > input");
    const button = document.querySelector("#submitBtn");
    const modalContainer = document.querySelector("dialog");
    const editUser = {};
    console.log(button);
  
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      inputs.forEach((input) => {
        editUser[input.name] = input.value;
      });
  
      const request = await updateData(editUser);
      modalContainer.close();
    });
  
    return editUser;
  }

async function renderDepartmentOfEmployee(){
  const employeed = document.querySelector('.employeed')

  const depOfEmployee = await departmentsOf()
  
  const depName = depOfEmployee.departments.find(name => name)

    employeed.innerHTML=''
    employeed.insertAdjacentHTML('beforeend',`
    <div class="depStyle">
    <h1>${depOfEmployee.name}</h1>
    <h1>${depName.name}</h1>
    </div>
    `)
  
 }

 renderDepartmentOfEmployee()

async function renderCoWorkers(){
  const coWorkers = document.querySelector('.coWorkers')

  let listCoWorkers = await employeesApi()

  let lc = listCoWorkers.find(users=>users)
    lc.users.forEach(username=>{
      console.log(username)
    coWorkers.insertAdjacentHTML('beforeend',`
    <div class="foiDificil">
    <p>${username.username}</p>
    <p>${username.professional_level}</p>
    </div>
    `)
  })
  
 
  

}  renderCoWorkers()


function logout() {
    const logoutBtn = document.querySelector('#logoutBtn')
  
    logoutBtn.addEventListener('click', () => {
      localStorage.clear()
      window.location.replace('/index.html')
    })
  }
  logout()