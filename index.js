// Add your code here
document.addEventListener("DOMContentLoaded", function(){
    

/////////////////////////////////////
// This Section is for the lab
////////////////////////////////////

document.querySelector('#userForm').addEventListener('submit', submitData)

function submitData(e)
{
    e.preventDefault();
    let formData=
    {
        name:document.querySelector("#name").value,
        email: document.querySelector("#email").value
    }
    return fetch("http://localhost:3000/users", 
    {
        method:"POST",
        headers:
        {
            "Content-Type": 'application/json',
            "Accept":"application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res=>res.json())
    .then(user=>
    {
        const li = document.createElement('li');
        li.textContent=`${user.name}'s email address is ${user.email}. Their ID is ${user.id}`
        document.querySelector('#userList').appendChild(li); 
    })
    .catch(function(error)
    {
        const alertMessage=document.createElement('div');
        alertMessage.textContent=error.message;
        document.querySelector("#alertMessage").appendChild(alertMessage);
    })

}

initUsers();
function initUsers()
{
    return fetch('http://localhost:3000/users')
    .then(res=>res.json())
    .then(users=>
    {
        users.forEach(element => 
        {
            const li = document.createElement('li');
            li.textContent=`${element.name}'s email address is ${element.email}. Their ID is ${element.id}`;
            document.querySelector('#userList').appendChild(li);   
        });
    })
}


// /////////////////////////////////
// // This part was for funsies
// ////////////////////////////////

    initDogs();
    function initDogs()
    {
        return fetch('http://localhost:3000/dogs')
        .then(res=>res.json())
        .then(dogs=>
        {
            dogs.forEach(element => 
            {
                const li = document.createElement('li');
                li.textContent=`${element.dogName} is a ${element.dogBreed}.`
                document.querySelector('ul').appendChild(li);   
            });
        })
    }

    const dogSubmitButton=document.querySelector("#dogForm");
    dogSubmitButton.addEventListener('submit', handleDogSubmit);

    function handleDogSubmit(e)
    {
        e.preventDefault();
        const formData=
        {
            dogName:document.querySelector("#dogName").value,
            dogBreed:document.querySelector("#dogBreed").value
        }

        return fetch('http://localhost:3000/dogs', 
        {
            method:"POST",
            headers:
            {
                "Content-Type": 'application/json',
                "Accept":"application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res=>res.json())
        .then(data=>
            {
                const li = document.createElement('li');
                li.textContent=`${data.dogName} is a ${data.dogBreed}.`
                document.querySelector('ul').appendChild(li); 
            })
    }



})