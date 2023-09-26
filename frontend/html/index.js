
//selectors
const tokenInput = document.querySelector('.token-input');
const getDevicesBtn = document.querySelector('.secrets button');
const table = document.querySelector('.main_table');
let tr = [];

let token = '';

console.log(table)

//listeners
getDevicesBtn.addEventListener('click', createDeviceList);


function createDeviceList() {
    token = tokenInput.value;
    let data = {"token":token}
    // console.log('data : ', JSON.stringify(data))
    
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
        
        console.log(newTr)
        table.appendChild(newTr);
        
        // tr = document.querySelectorAll('.table_item')
}