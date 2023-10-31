// Select the HTML elements
const form = document.getElementById('form');
const input = document.getElementById('input');
const submitBtn = document.getElementById('submitBtn');
const taskList = document.querySelector('.tasks');
const checkList = document.querySelector('.checked');
const deleteList = document.querySelector('.delete');
const editList = document.querySelector('.edit');
const deleteAllBtn=document.getElementById('deleteBtn')
const editBtn=document.getElementById('editBtn')
let arr = [];
let memoElement

const parsedArr=getLocalStorage("todo")


if (parsedArr) {
    arr = parsedArr
    arr.forEach(element => newTask(element));
}

function newTask(task) {

        //creating elements
        const taskLi = document.createElement('li')
        const checkBoxInput = document.createElement('input')
        checkBoxInput.setAttribute("type",'checkbox');
        const checkLi=document.createElement('li')
        const deleteLi=document.createElement('li')
        const editLi=document.createElement('li')

        taskLi.textContent = task;

        deleteLi.innerHTML=`<i class="fa-solid fa-trash"></i>`
        editLi.innerHTML=`<i class="fa-regular fa-pen-to-square"></i>`

        //adding classes        
        checkBoxInput.onclick=()=> (checkBoxInput.checked) ?  taskLi.classList.add('xett') :  taskLi.classList.remove('xett')


        editLi.addEventListener("click",()=>{
            memoElement=taskLi
            input.value=taskLi.textContent

            input.focus()
        })

        deleteLi.addEventListener("click",()=>{
           const completedTask=taskLi.textContent
            
           const index=arr.indexOf(completedTask)

            // console.log(index);
            if (index > -1) {
                arr.splice(index,1)
                taskLi.textContent=''
                editLi.textContent=''
                checkLi.textContent=''
                deleteLi.textContent=''
                setLocalStorage("todo", arr);
                
            }
            
            
        })


        //appending elements
        taskList.appendChild(taskLi)
        checkList.appendChild(checkLi)
        checkLi.appendChild(checkBoxInput)
        deleteList.appendChild(deleteLi)
        editList.appendChild(editLi)
}

editBtn.addEventListener("click",()=>{
    setLocalStorage("todo", arr)
    
})

submitBtn.addEventListener("click",(e)=>{
    e.preventDefault()

    if (input.value==='') {
        return
    }
    
    arr.push(input.value)
    setLocalStorage("todo", arr)
    
    newTask(input.value)
    // Reset the form
    form.reset()
})


deleteAllBtn.addEventListener("click",()=>{
    localStorage.clear()
    arr= []
})  

editBtn.addEventListener("click", () => {
    if (memoElement) {
        const index = arr.indexOf(memoElement.textContent);
        if (index > -1) {
            arr[index] = input.value;
            memoElement.textContent = input.value;
            setLocalStorage("todo", arr);
        }
    }
});



function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
