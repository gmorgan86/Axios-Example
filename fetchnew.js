"use strict";

const getOutput = document.querySelector("#getOutput");

//delete
document.querySelector("#deleteform").addEventListener("submit", function (event) {
    event.preventDefault();


    const form = this;
    const userID = form.userID.value;

    axios
        .delete("https://reqres.in/api/users/${userID}")
        .then(res => {
            console.log(res);
            form.reset();
            form.userID.focus();
            getUser();

        })

        .catch(err => console.log(err));

});

//create 
document.querySelector("#userForm").addEventListener("submit", function (event) {
    event.preventDefault(); //disables page refreshing

    console.log("This: ", this);

    const form = this;

    // console.log("userID", form.id);

    const data = {
        userID: form.id.value,
        first_name: form.first_name.value,
        last_name: form.last_name.value,
        email: form.email.value,
        avatar: form.avatar.value,

        // id: "1",
        // first_name: "bill",
        // last_name: "will",
        // email: "gill@gmail.com",
        // avatar: form.avatar.value,
    };

    axios
        .post("https://reqres.in/api/users", data)
        .then(res => {
            // getUser();
            // form.reset();
            // form.name.focus(); //puts cursor in name field
            console.log(res)
        })
        .catch(err => console.error(err));

});


//read

// const getUser = () => {
axios
    .get("https://reqres.in/api/users?page=2")
    .then(res => {
        console.log(res);

        const users = res.data.data;

        getOutput.innerHTML = "";       //blanks the output field

        for (let user of users) {
            const userContainer = document.createElement("div");

            const userID = document.createElement("p");
            userID.innerText = `ID: ${user.id}`;
            userContainer.appendChild(userID);

            const First_Name = document.createElement("p");
            First_Name.innerText = `First Name: ${user.first_name}`;
            userContainer.appendChild(First_Name);

            const Last_Name = document.createElement("p");
            Last_Name.innerText = `Last Name: ${user.last_name}`;
            userContainer.appendChild(Last_Name);

            const Email = document.createElement("p");
            Email.innerText = `Email: ${user.email}`;
            userContainer.appendChild(Email);

            const Avatar = document.createElement("img");
            Avatar.src = user.avatar;
            userContainer.appendChild(Avatar);

            const userDelete = document.createElement("button");  //delete button
            userDelete.innerText = "DELETE";
            userDelete.addEventListener("click", function () {

                axios
                    .delete("https://reqres.in/api/users/${userID}")
                    .then(res => {
                        console.log(res);
                        getUser();

                    })

                    .catch(err => console.log(err));


            })
            userContainer.appendChild(userDelete);

            getOutput.appendChild(userContainer);
        }
    })
    .catch(err => console.error(err));

