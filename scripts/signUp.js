import {validateUser, signUp } from "../scripts/requests.js"

async function renderSignUp(token){
    
    const userValid = validateUser(token)
    
  
    if (userValid && userValid.is_admin) {
        window.location.replace("../pages/admin.html");
    } else if (userValid && !userValid.is_admin) {
        window.location.replace("../pages/user.html");
    } 
}

function signUpForm() {
    const inputs = document.querySelectorAll(".name, .pass, .email");
    const select = document.querySelector("select")
    const button = document.querySelector(".signUpBtn");
    const newUser = {};
  
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      inputs.forEach((input) => {
        newUser[input.type] = input.value;
      });
      
      const request = await signUp(newUser);
      renderSignUp(request.token)
    });
  
    return newUser;
  }

  signUpForm()

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
    const homeBtn = document.createElement('button')
    const loginBtn = document.createElement('button')
    const imgClose = document.createElement('img')
    const buttonClose = document.createElement('button')
    const linkHome = document.createElement('a')
    const linkLogin = document.createElement('a')

    linkHome.href="/index.html"
    linkLogin.href = "/pages/login.html"

    linkLogin.innerText = "Login"
    linkHome.innerText = "Home"
    imgClose.src = "/assets/Vector (3).png"

    loginBtn.classList.add('wCss', "loginModal")
    homeBtn.classList.add('bCss')
    imgClose.classList.add('imgClose')
    linkHome.classList.add('linkHome')
    buttonClose.classList.add('btnClose')
    modalContainer.classList.add('openMenu')

   
    loginBtn.appendChild(linkLogin)
    homeBtn.appendChild(linkHome)
    buttonClose.appendChild(imgClose)
    modalContainer.append(buttonClose,loginBtn,homeBtn)
    
    return modalContainer
}

function closeModal (){
    const buttonClose = document.querySelector('.btnClose')

    buttonClose.addEventListener('click', () =>{
        const create = createModal()
        create.close() 
    })

}

