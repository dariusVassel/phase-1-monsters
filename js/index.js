urlMonsters = 'http://localhost:3000/monsters'
limitMonsters = 50
startLimit = 0

document.addEventListener('DOMContentLoaded', (event) => {
    //console.log('DOM fully loaded and parsed');
    getMonsters()
    createForm()
    pageChange()
});

//Each monster's name, age, and description should be shown.
function getMonsters(){
    fetch(urlMonsters)
    .then(resp => resp.json())
    .then(data => monsterSlice(data))
}

function monsterSlice(data){
    let pageContainer = document.querySelector('#monster-container')
    firstLimit = (data.slice(startLimit, limitMonsters))
    for (const elements of firstLimit){
        //console.log(elements)
        let h2 = document.createElement('h2');
        h2.innerText = `${elements.name}`
        let p = document.createElement('p');
        p.innerText = `Age: ${elements.age}`
        let p2 =document.createElement('p')
        p2.innerText = `Description: ${elements.description}`
        
        let individualMonster = document.createElement('div')
        individualMonster.setAttribute('id', `${elements.id}`)
        individualMonster.append(h2, p, p2)
        pageContainer.appendChild(individualMonster);
    }
    //data.slice(limitMonsters-1)
}


//You should have fields for name, age, and description, and a 'Create Monster Button'. 
function createForm(){
    let formContainer =  document.querySelector('#create-monster')
    let newForm = document.createElement('form')
    
    let label = document.createElement('label')
    label.innerText = 'Create your monster:'

    let input1 = document.createElement('input')
    input1.setAttribute ('placeholder', 'Name')

    let input2 = document.createElement('input')
    input2.setAttribute ('placeholder', 'Age')

    let input3 = document.createElement('input')
    input3.setAttribute ('placeholder', 'Description')

    let btn = document.createElement('button')
    btn.setAttribute('id', 'Create Monster')
    btn.innerText = 'Create Monster'
    btn.type = "submit";

    newForm.append(label, input1, input2, input3, btn) 
    formContainer.appendChild(newForm)

    newForm.addEventListener('submit', e => {
        let newMonstObj = {
            name: `${input1.value}`,
            age: `${input2.value}`,
            description: `${input3.value}`
        }
        e.preventDefault();
        createMonster(newMonstObj)  
    })
}

function createMonster(newMonstObj){
    fetch(urlMonsters, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify(newMonstObj)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}

function pageChange(){
    let btnForward = document.querySelector('#forward')
    btnForward.addEventListener('click', ()=> {
        console.log('forward')
        limitMonsters += 50
        startLimit += 50
        //removeMonsters()
        getMonsters()
    })
    
    let btnBackward = document.querySelector('#back')
    btnBackward.addEventListener('click', ()=> console.log('back'))
}






