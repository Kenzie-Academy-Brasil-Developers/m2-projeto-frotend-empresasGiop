import {login, validateUser} from "../scripts/requests.js"
  
 async function loginForm() {
    const inputs = document.querySelectorAll(".email, .senha");
    const button = document.querySelector(".loginBtn");
    const loginUser = {};
  
    button.addEventListener("click", async (event) => {
      event.preventDefault();
  
      inputs.forEach((input) => {
        loginUser[input.name] = input.value;
      });
     
      const request = await login(loginUser);
  
      localStorage.setItem("@kenzieEmpresas:user", JSON.stringify(request));
      renderDashboards(request.token)
    });

  }

  loginForm()

  async function renderDashboards(token) {
    
    const userValid = await validateUser(token)
    
      if(!userValid){
        window.location.replace("../pages/login.html")
      }else if ( userValid.is_admin) {
        window.location.replace("../pages/admin.html");
      } else if (userValid && !userValid.is_admin) {
        window.location.replace("../pages/user.html");
    }
  }
  
  

  function renderModalMenu (){
    const buttonMenu = document.querySelector('.menu')
    const modalContainer = document.querySelector('#dLg')

    buttonMenu.addEventListener('click', (event) => {
        event.preventDefault()
        
        modalContainer.showModal()
        closeModal()
    })
   
}

renderModalMenu()

function createModal(){
    const modalContainer = document.querySelector('#dLg')
   
    return modalContainer
}

function closeModal (){
    const buttonClose = document.querySelector('.closeBtnLgPg')

    buttonClose.addEventListener('click', () =>{
        const create = createModal()
        create.close() 
    })

}