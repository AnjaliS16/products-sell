function handleFormSubmit(event) {
    event.preventDefault();
   
    const am = event.target.am.value
    const name = event.target.name.value
    
  
    const obj = {
      
      am:am,
      name:name,
    }
  
    //post detail on crud
    axios.post("https://crudcrud.com/api/d76a5b69cad94714aefc9c2ceb0f2265/appointmentData", obj)
      .then((response) => {
        showUserOnScreen(response.data)
        console.log(response)
     })
      .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Oops! something went wrong</h4>"
        console.log(err)
     })
  
    
    document.getElementById('am').value = '';
    document.getElementById('name').value = '';
    
  
  }
  
  //retrieve from crud
  window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/d76a5b69cad94714aefc9c2ceb0f2265/appointmentData")
      .then((response) => {
        console.log(response)
  
        for (var i = 0; i < response.data.length; i++) {
          showUserOnScreen(response.data[i])
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })
  
  //print detail on screen
  function showUserOnScreen(obj) {  
  
    const parentNode = document.getElementById('listofitems');
  
    const childnode = `<li id=${obj._id}> ${obj.am} -${obj.name}
                  <button style="color:red"onclick=DeleteUser('${obj._id}') >Delete User</button>
                  <button style="color:green"onclick=editUserDetails('${obj._id}','${obj.am}','${obj.name}')>Edit User</button>
                  
                  </li> `
    parentNode.innerHTML = parentNode.innerHTML + childnode
  }
  
  
  //edit users detail
  function editUserDetails( id,am, name) {
  
   
    document.getElementById('am').value = am;
    document.getElementById('name').value = name;
   
    DeleteUser(id)
   
  }
  
  //delete from crud
  function DeleteUser(id) {
    axios.delete(`https://crudcrud.com/api/d76a5b69cad94714aefc9c2ceb0f2265/appointmentData/${id}`)
  .then((res) => {
      removeUserFromScreen(id)
    })
        .catch((err) => {
          console.log(err)
        })
  }
  
  //delete from screen
  function removeUserFromScreen(id) {
    const parentNode = document.getElementById('listofitems')
    const ChildNodeToBeRemoved = document.getElementById(id)
    if (ChildNodeToBeRemoved) {
  
      parentNode.removeChild(ChildNodeToBeRemoved)
    }
  }
  
