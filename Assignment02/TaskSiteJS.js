const title = [];
const description = [];
const priority = []
const task_status = [];
const due_date = [];
const due_time = [];
var tasks = 0;
var used = false;



document.addEventListener('DOMContentLoaded', function() {
        //document.querySelector("form").onsubmit = getTaskInfo, loadList;
    }
    
)

function getTaskInfo() {
    
    title[tasks] = document.getElementById("title_input").value;
    description[tasks] = document.getElementById("description_input").value;
    var priority_select = document.getElementById('pririty_input');
    priority[tasks] = priority_select.options[priority_select.selectedIndex].value;
    task_status[tasks] = document.querySelector('input[name="status_input"]:checked').value;
    due_date[tasks] = document.getElementById("date_input").value;
    due_time[tasks] = document.getElementById("time_input").value;
    
    tasks = tasks+1;
    
    appendList();
    if(used==false){
        used = true;
        siteUsed();
    }
}



function appendList() {
    var listNode = document.createElement("li");
    listNode.className = "list-group-item list-group-item-action";
    listNode.id = "task"+tasks;
    document.getElementById("list").appendChild(listNode);
    
    addTaskTitle(tasks-1);
    addTaskDesc(tasks-1);
    addTaskDate(tasks-1);
    addTaskTime(tasks-1);
    addTaskStatus(tasks-1);
    addTaskPriority(tasks-1);
    addButtons(tasks-1);
    
}

function addTaskTitle(taskNum){
    var titleNode = document.createElement("h5");
    if(title[taskNum]==""){
        titleNode.innerHTML = "Task "+(taskNum+1);
    }
    else{
        titleNode.innerHTML = title[taskNum];
    }
    
    document.getElementById("task"+(taskNum+1)).appendChild(titleNode);
}

function addTaskDesc(taskNum){
    var descNode = document.createElement("p");
    
    if(description[taskNum]==""){
        descNode.innerHTML = "No description given";
    }
    else{
        descNode.innerHTML = description[taskNum];
    }
    
    document.getElementById("task"+(taskNum+1)).appendChild(descNode);
}

function addTaskPriority(taskNum){
    
    
    var priorNode = document.createElement("span");
    
    switch(+priority[taskNum]){
        case 2:
            priorNode.className = "badge badge-danger badge-pill";
            priorNode.innerHTML = "Urgent";
            break;
        case 1:
            priorNode.className = "badge badge-warning badge-pill";
            priorNode.innerHTML = "Important";
            break;
        case 0:
            priorNode.className = "badge badge-dark badge-pill";
            priorNode.innerHTML = "Normal";
            break;
        case -1:
            priorNode.className = "badge badge-info badge-pill";
            priorNode.innerHTML = "Lax";
            break;
        case -2:
            priorNode.className = "badge badge-secondary badge-pill";
            priorNode.innerHTML = "Optional";
            break;
        default:
            priorNode.className = "badge badge-dark badge-pill";
            priorNode.innerHTML = (priority[taskNum]);
            break;
    }
    priorNode.innerHTML = priorNode.innerHTML+" Task";
    var space = document.createTextNode("     ");
    document.getElementById("metadata"+(taskNum+1)).appendChild(space);
    document.getElementById("metadata"+(taskNum+1)).appendChild(priorNode);
}

function addTaskStatus(taskNum){
    var metaNode = document.createElement("span");
    var statusNode = document.createElement("span");
    statusNode.innerHTML = task_status[taskNum];
    
    switch(task_status[taskNum]) {
        case "Incomplete":
            statusNode.className = "badge badge-dark badge-pill";
            document.getElementById("task"+(taskNum+1)).className = "list-group-item list-group-item-action";
            break;
        case "Pending":
            statusNode.className = "badge badge-secondary badge-pill";
            document.getElementById("task"+(taskNum+1)).className = "list-group-item list-group-item-action list-group-item-dark";
            break;
        case "Complete":
            statusNode.className = "badge badge-success badge-pill";
            document.getElementById("task"+(taskNum+1)).className = "list-group-item list-group-item-action list-group-item-success";
            break;
        case "Late":
            statusNode.className = "badge badge-warning badge-pill";
            document.getElementById("task"+(taskNum+1)).className = "list-group-item list-group-item-action list-group-item-warning";
            break;
        case "Failed":
            statusNode.className = "badge badge-danger badge-pill";
            document.getElementById("task"+(taskNum+1)).className = "list-group-item list-group-item-action list-group-item-danger";
            break;
    }
    statusNode.id = "statbg"+(taskNum+1);
    metaNode.id = "metadata"+(taskNum+1);
    metaNode.className = "rightSide"
    document.getElementById("due"+(taskNum+1)).appendChild(metaNode);
    document.getElementById("metadata"+(taskNum+1)).appendChild(statusNode);
}

function addButtons(taskNum) {
    var buttonlist = document.createElement("div");
    buttonlist.className = "btn-group btn-group-sm";
    buttonlist.id = "btns"+(taskNum+1);
    document.getElementById("task"+(taskNum+1)).appendChild(buttonlist);

    var btn = document.createElement("button");
    btn.className = "btn btn-light";
    btn.innerHTML = "Start";
    btn.onclick = function() { updateStatus(taskNum, 'Pending')};
    btn.title = "Mark Task as Pending";
    document.getElementById("btns"+(taskNum+1)).appendChild(btn);

    var btn1 = document.createElement("button");
    btn1.className = "btn btn-light";
    btn1.innerHTML = "Done";
    btn1.onclick = function() { updateStatus(taskNum, 'Complete')};
    btn1.title = "Mark Task as Complete";
    document.getElementById("btns"+(taskNum+1)).appendChild(btn1);

    var btn2 = document.createElement("button");
    btn2.className = "btn btn-light";
    btn2.innerHTML = "Failed";
    btn2.onclick = function() {updateStatus(taskNum, 'Failed')};
    btn2.title = "Mark Task as Failed";
    document.getElementById("btns"+(taskNum+1)).appendChild(btn2);

    var btn3 = document.createElement("button");
    btn3.className = "btn btn-light";
    btn3.innerHTML = "Remove";
    btn3.onclick = function() {removeTask(taskNum)};
    btn3.title = "Remove Task from List";
    document.getElementById("btns"+(taskNum+1)).appendChild(btn3);
}

function updateStatus(taskNum, newStat){
    
    document.getElementById("statbg"+(taskNum+1)).innerHTML = newStat;
    task_status[taskNum] = newStat;
    switch(newStat) {
        case "Incomplete":
            document.getElementById("statbg"+(taskNum+1)).className = "badge badge-dark badge-pill";
            document.getElementById("task"+(taskNum+1)).className = "list-group-item list-group-item-action";
            break;
        case "Pending":
            document.getElementById("statbg"+(taskNum+1)).className = "badge badge-secondary badge-pill";
            document.getElementById("task"+(taskNum+1)).className = "list-group-item list-group-item-action list-group-item-dark";
            break;
        case "Complete":
            document.getElementById("statbg"+(taskNum+1)).className = "badge badge-success badge-pill";
            document.getElementById("task"+(taskNum+1)).className = "list-group-item list-group-item-action list-group-item-success";
            break;
        case "Late":
            document.getElementById("statbg"+(taskNum+1)).className = "badge badge-warning badge-pill";
            document.getElementById("task"+(taskNum+1)).className = "list-group-item list-group-item-action list-group-item-warning";
            break;
        case "Failed":
            document.getElementById("statbg"+(taskNum+1)).className = "badge badge-danger badge-pill";
            document.getElementById("task"+(taskNum+1)).className = "list-group-item list-group-item-action list-group-item-danger";
            break;
    }
}

function addTaskDate(taskNum){
    var dateNode = document.createElement("p");
    if(due_date[taskNum]==""){
        dateNode.innerHTML = "No Set Due Date";
    }
    else{
        dateNode.innerHTML = due_date[taskNum];
    }
    dateNode.id = "due"+(taskNum+1);
    dateNode.className = "flex";
    document.getElementById("task"+(taskNum+1)).appendChild(dateNode);
}

function addTaskTime(taskNum){
    
    var timeNode = document.getElementById("due"+(taskNum+1));
   
    var existingText = timeNode.innerHTML
    if(due_time[taskNum]==""){
        timeNode.innerHTML = existingText+"       No Set Due Time";
    }
    else{
        timeNode.innerHTML = existingText+"  "+due_time[taskNum];
    }
    
    document.getElementById("task"+(taskNum+1)).appendChild(timeNode);
}

function prependList(taskNum){
    
    
    for(var pos = taskNum; pos<tasks; pos++){
        title[pos] = title[pos+1];
        description[pos] = description[pos+1];
        priority[pos] = priority[pos+1];
        task_status[pos] = task_status[pos+1];
        due_date[pos] = due_date[pos+1];
        due_time[pos] = due_time[pos+1];
        
        document.getElementById("task"+(pos+2)).id = "task"+(pos+1);
        document.getElementById("due"+(pos+2)).id = "due"+(pos+1);
        document.getElementById("statbg"+(pos+2)).id = "statbg"+(pos+1);
        document.getElementById("btns"+(pos+2)).id = "btns"+(pos+1);
        document.getElementById("metadata"+(pos+2)).id = "metadata"+(pos+1);
        
    }
    title.splice(tasks-1, 1);
    description.splice(tasks-1, 1);
    priority.splice(tasks-1, 1);
    task_status.splice(tasks-1, 1);
    due_date.splice(tasks-1, 1);
    due_time.splice(tasks-1, 1);
    tasks--;
    
}

function removeTask(taskNum) {
    
    document.getElementById('list').removeChild(document.getElementById("task"+(taskNum+1)));
    
    prependList(taskNum);
}

function loadList(){
    
    for(var n = 0; n<tasks; n++){
        var listNode = document.createElement("li");
        var textNode = document.createTextNode(title[n]);
        listNode.appendChild(textNode);
        listNode.className = "list-group-item";
        document.getElementById("list").appendChild(listNode);
    }
}

function siteUsed() {
    document.getElementById("start_button").innerHTML = "Add to Your List";
    document.getElementById("hidden_text").id = null;
}

const d = new Date;
let counter = 0

/*var x = 1;
    var node = document.createElement("li");
    var textnode = document.createTextNode("Water");
    node.appendChild(textnode);
    node.className = "list-group-item";
    node.id = "task"+x;
    x++;
    document.getElementById("list").appendChild(node);
}*/
