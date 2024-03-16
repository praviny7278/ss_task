


const newTaskAddBtn = document.getElementById('submit-btn');
let userTaskData = JSON.parse(localStorage.getItem('userTasks')) || [];

let userTaskDealine = document.getElementById('deadline');

userTaskDealine.addEventListener('input', () => {
    const userTask = userTaskDealine.value.trim();
    if (!isNaN(userTask)) {
        userTaskDealine.style.border = 'solid 1px green';
    } else {
        userTaskDealine.style.border = 'solid 1px red';
    }
});

newTaskAddBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let userName = document.getElementById('name').value;
    let userEmail = document.getElementById('email').value;
    let userTask = document.getElementById('t-name').value;
    let userTaskPriorities = document.getElementById('priorities').value;
    let userTaskDealine = document.getElementById('deadline').value; // Get the value of the deadline input

    if (userEmail && userName && userTask && userTaskDealine && userTaskPriorities) {
        let userTaskObj = {
            name: userName,
            email: userEmail,
            task: userTask,
            priorities: userTaskPriorities,
            taskDealine: userTaskDealine,
            status: true,
        };

        // Check if userTaskData is an array
        if (!Array.isArray(userTaskData)) {
            userTaskData = [];
        }

        userTaskData.push(userTaskObj);
        localStorage.setItem('userTasks', JSON.stringify(userTaskData));
        // window.location.reload()
        fetchDisplayData()
    } else {
        alert("Please check your input!");
    }

    // console.log(getFromLocalStorage('userTasks'));
});

function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}


function fetchDisplayData() {
    document.getElementById('tbody').innerHTML = '';

    for (let index = 0; index < userTaskData.length; index++) {
        const data = userTaskData[index];
        // console.log(data);

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');
        let button = document.createElement('button');

        td1.innerHTML = data.name;
        td2.innerHTML = data.email;
        td3.innerHTML = data.task;
        td4.innerHTML = data.priorities;
        td5.innerHTML = `${data.taskDealine} Minutes`;

        if (data.status) {
            button.innerHTML = 'Mark complete';
            button.className = "c-btn";
        } else {
            button.className = "new-btn";
            tr.style.backgroundColor = "rgba(118, 194, 105)";
            button.innerHTML = 'Completed';
        }
        
        button.addEventListener('click', ()=> {
            let newStatus = updateData(data.name);
            if (!newStatus) {
                console.log("change");
                // window.location.reload()
                fetchDisplayData()
            }
        });



        td6.appendChild(button)
        tr.append(td1, td2, td3, td4, td5, td6);

        document.getElementById('tbody').append(tr);

    }
}

fetchDisplayData()

function updateData(name) {
    const indexToUpdate = userTaskData.findIndex(item => item.name == name);
    // console.log(indexToUpdate);
    if (indexToUpdate !== -1) {
        // Update the value associated with the key
        userTaskData[indexToUpdate].status = false;
    
        // Set the updated data back to local storage
        localStorage.setItem('userTasks', JSON.stringify(userTaskData));
        console.log(userTaskData[indexToUpdate]," ", indexToUpdate);
        return false;
    } else {
        // Handle the case where the item to update is not found
        console.error('Item to update not found');
    }
}