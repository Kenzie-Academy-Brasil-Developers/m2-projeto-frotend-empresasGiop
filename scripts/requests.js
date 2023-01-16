import { toast } from "../scripts/toast.js";

export async function login(data){
  const loginData = await fetch('http://localhost:6278/auth/login',{
  method: "POST",
    headers: {
      "Content-Type": "application/json",
     
    },
    body: JSON.stringify(data)
  })

  const loginDataJson = await loginData.json()

  if (!loginData.ok) {
    toast(loginDataJson.message, red);
    window.location.replace("../pages/login.html")
  } else {
    toast("Login realizado com sucesso", green);
    
      return loginDataJson;
  }

}
const user = getUser() || {};
const { token } = user;
const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
const red = "#C20803";
const green = "#08C203";

export function getUser (){
  const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:user'))

  return user
}
export async function validateUser(token) {
  const validateUser = await fetch(`http://localhost:6278/auth/validate_user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const validateUserJson = await validateUser.json();

  if (!validateUser.ok) {
    toast("Usuário não permitido", red);
  } else {
    toast("Usuário permitido", green);
  }

  return validateUserJson;
}

export async function empresasAPI (){
  const empresasdaAPI = await fetch ('http://localhost:6278/companies',{
    method:"GET",
    headers:requestHeaders
  })

  const empresasdaAPIJson = await empresasdaAPI.json()

  return empresasdaAPIJson
}

export async function setoresAPI(){
  const setoresAPI = await fetch ('http://localhost:6278/sectors',{
    method:"GET",
    headers:requestHeaders
  })

  const setoresAPIJson = await setoresAPI.json()
  
  return setoresAPIJson
}

export async function empresasPorSetor (setor){
  const empresasPorSetor = await fetch (`http://localhost:6278/companies/${setor}`,{
    method:"GET",
    headers:requestHeaders
  })

  const empresasPorSetorJson = await empresasPorSetor.json()
  
  return empresasPorSetorJson
}

export async function signUp (data){
  const signUpData = await fetch ('http://localhost:6278/auth/register',{
  method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(data)
  })

  const signUpDataJson = await signUpData.json()

  if (!signUpData.ok) {
    toast(signUpDataJson.message, red);
  } else {
    toast("Usuário criado com sucesso", green);
    window.location.replace("/pages/login.html");
  }

  return signUpDataJson;
}

export async function findEmployee (){
  const findEmployee = await fetch ('http://localhost:6278/users/profile',{
    method: "GET",
    headers: requestHeaders,
  })

  const findEmployeeJson = await findEmployee.json()

  if(!findEmployee.ok){
    toast("Empregado não encontrado", red);
  }else{
    toast( "Empregado encontrado", green);
  }
  return findEmployeeJson
}

export async function employeesApi (){
  const employeeApi = await fetch('http://localhost:6278/users/departments/coworkers',{
    method: "GET",
    headers: requestHeaders,
  })

  const employeeApiJson = await employeeApi.json()
  
   return employeeApiJson
} 

export async function departmentsOf (){
  const departmentsOf = await fetch('http://localhost:6278/users/departments',{
    method: "GET",
    headers: requestHeaders,
  })

  const departmentsOfJson = await departmentsOf.json()
  
  return departmentsOfJson
} 

export async function updateData (data){
  const updateData = await fetch ('http://localhost:6278/users',{
  method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(data)
  })

  const updateDataJson = await updateData.json()

  if (!updateData.ok) {
    toast(updateDataJson.message, red);
  } else {
    toast("Usuário atualizado com sucesso", green);
  }

  return updateDataJson;
}

export async function registerCompany (data){
  const registerCompanyData = await fetch ('http://localhost:6278/companies',{
    method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(data)
    })
  
    const registerCompanyDataJson = await registerCompanyData.json()
  
    if (!registerCompanyData.ok) {
      toast(registerCompanyDataJson.message, red);
    } else {
      toast("Empresa criada com sucesso", green);
    }
  
    return registerCompanyDataJson;
}
  
export async function allDepartments (){
  const allDepartments = await fetch (`http://localhost:6278/departments`,{
    method: "GET",
      headers: requestHeaders,
    })
  
    const allDepartmentsJson = await allDepartments.json()
  
    return allDepartmentsJson
}

export async function companyDepartments(companyById){
  const companyDepartments = await fetch (`http://localhost:6278/departments/${companyById}`,{
    method: "GET",
      headers: requestHeaders,
    })
  
    const companyDepartmentsJson = await companyDepartments.json()
  
    return companyDepartmentsJson
}

export async function registerDepartment (data){
  console.log(token)
  console.log(data)
  const registerDepartmentData = await fetch ('http://localhost:6278/departments',{
    method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
 
    const registerDepartmentDataJson = await registerDepartmentData.json()
  
    if (!registerDepartmentData.ok) {
      toast(registerDepartmentDataJson.message, red);
    } else {
      toast("Departamento criado com sucesso", green);
    }
  
}

export async function hireEmployee (data){
  const hireEmployeeData = await fetch ('http://localhost:6278/departments/hire/',{
  method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(data)
  })

  const hireEmployeeDataJson = await hireEmployeeData.json()

  if (!hireEmployeeData.ok) {
    toast(hireEmployeeDataJson.message, red);
  } else {
    toast("Empregado contratado com sucesso", green);
  }

  return hireEmployeeDataJson;
}

export async function dismissEmployee(funcionarioById){
  const dismissEmployeeData = await fetch (`http://localhost:6278/departments/dismiss/${funcionarioById}`,{
    method: "PATCH",
      headers:requestHeaders,
  })

  const dismissEmployeeDataJson = await dismissEmployeeData.json()

  if(!dismissEmployeeData.ok){
    toast(dismissEmployeeDataJson.message,red);
  } else {
    toast("Empregado demitido", green)
  }
  return dismissEmployeeDataJson
}

export async function editDepartment(data,departamentoById){
 
  const editDepartment = await fetch (`http://localhost:6278/departments/${departamentoById}`,{
    method: "PATCH",
      headers:requestHeaders,
      body: JSON.stringify(data)
  })

  const editDepartmentJson = await editDepartment.json()
 
  if(!editDepartment.ok){
    toast(editDepartmentJson.message,red);
  } else {
    toast("Departamento editado com sucesso", green)
  }
  return editDepartmentJson
}

export async function deleteDepartment(departamentoById) {
  const department = await fetch(`http://localhost:6278/departments/${departamentoById}`, {
    method: "DELETE",
    headers: requestHeaders,
  });

  //const departmentJson = await department.json();

  if (!department.ok) {
    toast("Departamento não deletado", red);
  } else {
    toast("Departamento deletado", green);
  }


}

export async function allUsers (){
  const allUsers = await fetch ('http://localhost:6278/users',{
    method:"GET",
      headers:requestHeaders,
  });

  const allUsersJson = await allUsers.json()

  return allUsersJson
}

export async function usersOut (){
  const usersOut = await fetch ('http://localhost:6278/admin/out_of_work',{
    method:"GET",
      headers:requestHeaders,
  });

  const usersOutJson = await usersOut.json()

  return usersOutJson
}

export async function updateEmployee (data, employeeById){
  const updateEmployeeData = await fetch (`http://localhost:6278/admin/update_user/${employeeById}`,{
    method:"PATCH",
    headers:requestHeaders,
    body:JSON.stringify(data)
  })

  const updateEmployeeDataJson = await updateEmployeeData.json()

  if (!updateEmployeeData.ok) {
    toast(updateEmployeeDataJson.message, red);
  } else {
    toast("Funcionário Atualizado com sucesso", green);
  }

  return updateEmployeeDataJson;
}

export async function deleteUser(usuarioById) {
  const deleteUser = await fetch(`http://localhost:6278/admin/delete_user/${usuarioById}`, {
    method: "DELETE",
    headers: requestHeaders,
  });

  if (!deleteUser.ok) {
    toast("Perfil não deletado", red);
  } else {
    toast("Perfil deletado", green);
  }

 return
}












