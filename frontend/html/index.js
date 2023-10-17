
//selectors
const tokenInput = document.querySelector('.token-input');
const getDevicesBtn = document.querySelector('.secrets button');
const table = document.querySelector('.main_table');
const container = document.getElementById('dataList');
const h3Name = document.querySelector('.h3-name');
let detail = document.querySelector('.table_item_deep');
let tr = [];
let deviceName = "";
let deviceIdGlobal ="";
let token = '';
let details = '';
console.log(detail)

//listeners
getDevicesBtn.addEventListener('click', createDeviceList);
table.addEventListener('click', selectItem );
detail.addEventListener('click', showSelection );

function showSelection(event) {
    
    let path = [];
    let currentNode = event.currentTarget;
    // console.log(currentNode);

    while (currentNode && currentNode !== container) {
        const text = currentNode.childNodes[0].nodeValue.trim();
        if (text) { 
            path.unshift(text); 
        }
        //path.unshift(currentNode.innerText); // Add to the start of the array to keep the order
        //console.log(path)
        //console.log(currentNode);
        currentNode = currentNode.parentNode.closest('li'); // Find the closest parent <li>
    }
    path.unshift(deviceIdGlobal,deviceName)

    //let objPath = {}
    
    //console.log(path);
    alert( path.join(' > '));  // Display the path
    
    //console.log(e)
    
    
};

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
    let name ="";
    comm = e.target.parentElement.childNodes[0].innerText;
    name = e.target.parentElement.childNodes[1].innerText;
    deviceIdGlobal = comm;
    //console.log(comm)
    
    fetchDetails(comm, name);
};
function fetchDetails(val, name) {
    console.log('clicked element',val, deviceIdGlobal)
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
        console.log(data);
        details = data.components.main;
        createList(details,container, name)
    })
    .catch((error) => {
        console.error('Fetch error!!!:', error);
    });
}

function createList(obj, parentElement, name) {
    //creates list of details about the selected device.
    const ul = document.createElement('ul');
    container.innerHTML = "";
    h3Name.textContent = name;
    deviceName = name;
    for (let key in obj) {
        const li = document.createElement('li');
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            li.textContent = key;
            createList(obj[key], li, name);
        } else {
            li.textContent = obj[key];
            li.classList.add('table_item_deep');

            // Add event listener to the .deepest element
            li.addEventListener('click', showSelection);

        }

        li.classList.add('table_item');
        
        ul.appendChild(li);
    }
    
    parentElement.appendChild(ul);
}

