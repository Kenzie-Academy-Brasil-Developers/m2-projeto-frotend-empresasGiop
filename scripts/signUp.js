import {validateUser, signUp } from "../scripts/requests.js"


    
function signUpForm() {
    const inputs = document.querySelectorAll("#inSU");
    const select = document.querySelector("#profLvlSel")
    const button = document.querySelector(".signUpBtn");
    const newUser = {};
    console.log(inputs)
  
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      inputs.forEach((input) => {
        newUser[input.name] = input.value;
      });
      newUser.professional_level = select.value
      console.log(newUser)
      const request = await signUp(newUser);
      
    });
  
    return newUser;
  }

  signUpForm()

  function renderModalMenu (){
    const buttonMenu = document.querySelector('.homePGMenu')
    const modalContainer = document.querySelector('#dSg')

    buttonMenu.addEventListener('click', (event) => {
        event.preventDefault()
        
        modalContainer.showModal()
        closeModal()
    })
   
}

renderModalMenu()

function createModal(){
    const modalContainer = document.querySelector('#dSg')
   
    return modalContainer
}

function closeModal (){
    const buttonClose = document.querySelector('.closeBtnSGPg')

    buttonClose.addEventListener('click', () =>{
        const create = createModal()
        create.close() 
    })

}

