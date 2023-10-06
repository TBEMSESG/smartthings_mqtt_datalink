
//selectors
const tokenInput = document.querySelector('.token-input');
const getDevicesBtn = document.querySelector('.secrets button');
const table = document.querySelector('.main_table');
const container = document.getElementById('dataList');
let tr = [];

let token = '';
let details = '';
console.log(table)

//listeners
getDevicesBtn.addEventListener('click', createDeviceList);
table.addEventListener('click', selectItem );

function createDeviceList() {
    token = tokenInput.value;
    let data = {"token":token}
    const headers = {
        method: "POST",
        body : JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
                  },
        mode: "cors",
        cache: "default",
      };
    
    return fetch(`/api/devices`, headers)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            data.forEach((element) => {
             createTable(element)});
            })
        .catch((err)=> console.log(err));
};
function createTable(e){

        const newTr = document.createElement('tr');
        
        const command = document.createElement('td');
        const newTd1 = document.createElement('td');
        const newTd2 = document.createElement('td');
        
        command.innerText= e.deviceId;
        newTd1.innerText= e.label;
        newTd2.innerText= e.name;
        
        newTr.classList.add('table_item');
        command.classList.add('deviceId');
        
        newTr.appendChild(command);
        newTr.appendChild(newTd1);
        newTr.appendChild(newTd2);
        
        table.appendChild(newTr);
        
        // tr = document.querySelectorAll('.table_item')
};
function selectItem(e) {
    let comm ="";
    comm = e.target.parentElement.childNodes[0].innerText;
    //console.log(comm)
    
    fetchDetails(comm);
};
function fetchDetails(val) {
    
    let data = {"token":token}
    const headers = {
        method: "POST",
        body : JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
                  },
        mode: "cors",
        cache: "default",
      };
    return fetch(`/api/devices/${val}`, headers)
    .then((response) => {
        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        //console.log(res)
        return response.json();
    })
    .then((data) => {
        console.log(data.components.main);
        details = data.components.main;
        createList(details,container)
    })
    .catch((error) => {
        console.error('Fetch error!!!:', error);
    });
}

function createList(obj, parentElement) {
    const ul = document.createElement('ul');
    container.innerHTML = "";
    for (let key in obj) {
        const li = document.createElement('li');
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            li.textContent = key;
            createList(obj[key], li);
        } else {
            li.textContent = `${key} is ${obj[key]}`;
        }
        ul.appendChild(li);
    }
    
    parentElement.appendChild(ul);
}

