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
    
  
      if ( userValid && userValid.is_admin) {
        window.location.replace("../pages/admin.html");
      } else if (userValid && !userValid.is_admin) {
        window.location.replace("../pages/user.html");
      } 
    }
  
  

  function renderModalMenu (){
    const buttonMenu = document.querySelector('.menu')
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
    const linkHome = document.createElement('a')

    linkLogin.href = "/pages/login.html"
    linkHome.href="/index.html"

    linkLogin.innerText = "Login"
    linkHome.innerText = "Home"
    imgClose.src = "/assets/Vector (3).png"

    loginBtn.classList.add('wCss', "loginModal")
    signUpBtn.classList.add('bCss')
    imgClose.classList.add('imgClose')
    linkHome.classList.add('linkHome')
    buttonClose.id = 'btnClose'
    modalContainer.classList.add('openMenu')

   
    loginBtn.appendChild(linkLogin)
    signUpBtn.appendChild(linkHome)
    buttonClose.appendChild(imgClose)
    modalContainer.append(buttonClose,loginBtn,signUpBtn)
    
    return modalContainer
}

function closeModal (){
    const buttonClose = document.querySelector('#btnClose')

    buttonClose.addEventListener('click', () =>{
        const create = createModal()
        create.close() 
    })

}