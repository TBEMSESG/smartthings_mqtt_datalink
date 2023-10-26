
//selectors
const tokenInput = document.querySelector('.token-input');
const getDevicesBtn = document.querySelector('.secrets button');
const table = document.querySelector('.main_table');
const servicesTable = document.querySelector('.services_table');
const container = document.getElementById('dataList');
const h3Name = document.querySelector('.h3-name');
let detail = document.querySelector('.table_item_deep');
const selectedPath = document.querySelector('.selected-path');
const selectedDevice = document.querySelector('.selected-device');
const createServiceBtn = document.querySelector('.create-btn');
const smartthingsSection = document.querySelector('.smartthings');
const smartthingsBtn = document.querySelector('.smartthings-btn');
const shellyBtn = document.querySelector('.shelly-btn');
const infoBtn = document.querySelector('.information-btn');
const instructionsBlock = document.querySelector('.instructions');
const newDeviceNameInput = document.querySelector('#newDeviceNameInput');
const newDeviceIdInput = document.querySelector('#newDeviceIdInput');
const newTokenInput = document.querySelector('#newTokenInput');
const serviceName = document.querySelector('#serviceName');
const serviceId = document.querySelector('#serviceId');
const saveButton = document.querySelector('.save-btn');

//Modal
const modal = document.querySelector(".modal-services");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

//get the Host for link generation
const host = document.location.host;
const hostUrl = host.split(':');

let tr = [];
let deviceName = "";
let deviceIdGlobal ="";
let token = '';
let details = '';

//listeners
getDevicesBtn.addEventListener('click', createDeviceList);
table.addEventListener('click', selectItem );
//detail.addEventListener('click', showSelection );
document.addEventListener('DOMContentLoaded', getServicesList)
smartthingsBtn.addEventListener('click', ()=> smartthingsSection.classList.toggle('hidden'))
infoBtn.addEventListener('click', ()=> instructionsBlock.classList.toggle('hidden'))
servicesTable.addEventListener('click', selectOpenModal)
saveButton.addEventListener('click', updateServiceDetail)


//functions

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
    selectedPath.innerText = path.join(' > ')    
    
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
        const btn = document.createElement('button')
        
        command.innerText= e.deviceId;
        newTd1.innerText= e.label;
        newTd2.innerText= e.name;
        btn.textContent= 'create';
        newTr.classList.add('table_item');
        command.classList.add('deviceId');
        btn.classList.add('create-btn')
        
        newTr.appendChild(command);
        newTr.appendChild(newTd1);
        newTr.appendChild(newTd2);
        newTr.appendChild(btn);
        
        table.appendChild(newTr);
        
        // tr = document.querySelectorAll('.table_item')
};
// smartthings select Item to create
function selectItem(e) {
    let comm ="";
    let name ="";
    let item = e.target;
    comm = item.parentElement.childNodes[0].innerText;
    name = item.parentElement.childNodes[1].innerText;
    deviceIdGlobal = comm;
    deviceName = name;
    //console.log(comm)
    // selectedDevice.innerHTML = deviceIdGlobal + ' ' + deviceName;
    fetchDetails(comm, name);

    if (item.classList[0]==='create-btn') createService(deviceName,deviceIdGlobal,token, 'smartthings');

};
function fetchDetails(val, name) {
    //console.log('clicked element',val, deviceIdGlobal)
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
        //console.log(data);
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
function getServicesList() {
    let serviceList = [];
    const headers = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
                  },
        mode: "cors",
        cache: "default",
      };
    
    return fetch(`/api/services`, headers)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            serviceList = data;
            servicesTable.innerHTML = '';
            //  serviceList.forEach( (element) => {
            //     createServicestable(element)});
            return Promise.all(serviceList.map(element => createServicestable(element)));
            ;
            })
        .catch((err)=> console.log(err));
};
function getServiceDetail(id) {
    let service = [];
    const headers = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
                  },
        mode: "cors",
        cache: "default",
      };
    
    return fetch(`/api/details/${id}`, headers)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            console.log(data)
            serviceId.innerText= data[0].serviceId;
            newDeviceIdInput.value = data[0].deviceId;
            newDeviceNameInput.value = data[0].deviceName;
            serviceName.innerText = data[0].deviceName;
            newTokenInput.value = "";
            }).then(openModal)
        .catch((err)=> console.log(err));
};
function delService(id) {
    const headers = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
                  },
        mode: "cors",
        cache: "default",
      };
    
    return fetch(`/api/details/${id}`, headers)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            console.log( 'Deleted: -> ', data);
            getServicesList()
            return data;
            })
        .catch((err)=> console.log(err));
};
function updateServiceDetail() {
    
    //check if token has been modified. only then update the token
    let data = {}
    
    if (newTokenInput.value ==="") {
        data = {
            serviceId : serviceId.innerText,
            deviceName : newDeviceNameInput.value,
            deviceId : newDeviceIdInput.value
        }
    }
    else {
        data = {
            serviceId : serviceId.innerText,
            deviceName : newDeviceNameInput.value,
            deviceId : newDeviceIdInput.value,
            token : newTokenInput.value
        }
    }

    const headers = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
                  },
        body: JSON.stringify(data),
        mode: "cors",
        cache: "default",
      };
    
    return fetch(`/api/details/${serviceId.innerText}`, headers)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            console.log('Data has been updated')
            }).then(() => {
                closeModal(); 
                getServicesList()})
            .catch((err)=> console.log(err));
};
function createServicestable(e){
    // to be modified, not yet ready
        
        const newTr = document.createElement('tr');
        
        const name = document.createElement('td');
        const url = document.createElement('td');
        const sid = document.createElement('td');
        const del_btn = document.createElement('td')
        const edit_btn = document.createElement('td')
        
        name.innerText= e.deviceName;
        url.innerText= `http://${hostUrl[0]}:3000/services/${e.serviceId}/xml`;
        sid.innerText= e.serviceId;
        del_btn.innerHTML= '<i class="fa-solid fa-trash"></i>';
        edit_btn.innerHTML= '<i class="fa-solid fa-pen-to-square"></i>';
        
        //Add Classes
        newTr.classList.add('table_item');
        del_btn.classList.add('del-btn');
        edit_btn.classList.add('edit-btn');
        sid.classList.add('hidden');
        
        newTr.appendChild(name);
        newTr.appendChild(url);
        newTr.appendChild(edit_btn);
        newTr.appendChild(del_btn);
        newTr.appendChild(sid);
                
        servicesTable.appendChild(newTr);
        
};
function createService(name, id, token, type){

    let data = new Service(name,id,token, type);

    const headers = {
        method: "POST",
        body : JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
                  },
        mode: "cors",
        cache: "default",
      };
    return fetch(`/api/services`, headers)
        .then((response) => {
        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error(`HTTP error (services)! Status: ${response.status}`);
        }
        //console.log(res)
        // console.log('Response is ok -> ', response)
        // response.json();
        return response;
    })
    .then((data) => {
        getServicesList();
    })
    .catch((error) => {
        console.error('Fetch error!!!:', error);
    });
}

//classes
class Service {
    constructor(name, deviceid, token, type) {
        this.deviceName = name
        this.deviceId = deviceid
        this.token = token
        this.type = type
    }
}

// Open and close Modals
const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };
function selectOpenModal(e){
      const item = e.target
      const sid = item.parentElement.childNodes[4].innerText
        //    console.log(item.classList)
      if (item.classList[0] === 'edit-btn') {
        getServiceDetail(sid);}
      if (item.classList[0] === 'del-btn') {
        delService(sid);    
    } 
};

closeModalBtn.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

 