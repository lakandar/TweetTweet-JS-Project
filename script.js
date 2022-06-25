let inputElement=document.querySelector("#tweet-txt");
let submitBtnElement=document.querySelector(".submit");
let ulListElement=document.querySelector(".list-group");
let txtCountElement=document.querySelector(".txt-count");
let searchElement=document.querySelector("#search");

let tweetArr=[];

let t=[];
for(let i=4; i<=100; i++){
    t.push(i);
}

let localIdArr=[1, 2, 3, ...t];    

if(!localStorage.getItem("localIDKey")){
    let tempArr=[];
    tempArr.push(localIdArr)
    localStorage.setItem("localIDKey", tempArr);
}
let getIdFromLocalStorage=localStorage.getItem("localIDKey");
let x=getIdFromLocalStorage.split(",").map(str=>Number(str));
let y=localIdArr.filter(id=>(x).includes(id));

// console.log(y);

function addTweetToUI(id, txt, date){
    let liElement=`<li class="list-group-item collection-item tweet-id">
    <strong class="text-info">◉ Tweet ${id}</strong> - <span class="tweet-txt text-info">${txt}</span>
    <span class="date-item border bg-opacity-25 border-info bg-info">${date}</span>
    <i class="fa fa-trash float-end delete-item"></i>
    <i class="fa fa-pencil-alt float-end edit-item pe-4"></i>    
    </li>`

    ulListElement.insertAdjacentHTML('afterbegin', liElement);
}

function addTweetToLocalStore(tArr){
    let localArr=[];
    
    if(localStorage.getItem("localTweetKey")){
        localArr=JSON.parse(localStorage.getItem("localTweetKey"))
        localArr.push(tArr);
        //update to local storage
        localStorage.setItem("localTweetKey", JSON.stringify(localArr));
        
    }
    else{
        //let localArr=[];
        localArr.push(tArr);
        //update to local storage
        localStorage.setItem("localTweetKey", JSON.stringify(localArr));
    }
}


//localStorage to UI
function showTweetToUI(tArr){
    ulListElement.innerHTML="";
    
    tArr.forEach(element => {
        //console.log(element.id)
        let liElement=`<li class="list-group-item collection-item tweet-id">
        <strong class="text-info">◉ Tweet ${element.id}</strong> - <span class="tweet-txt text-info">${element.txt}</span>
        <span class="date-item border bg-opacity-25 border-info bg-info">${element.date}</span>
        <i class="fa fa-trash float-end delete-item"></i>
        <i class="fa fa-pencil-alt float-end edit-item pe-4"></i>    
        </li>`

        ulListElement.insertAdjacentHTML('afterbegin', liElement);
    });
}


submitBtnElement.addEventListener("click", e=>{
    let inputTxt=inputElement.value;
    let inputDate=new Date().toString().substring(4,21);
    
    // generateID();
    
    let inputID;
    if(localStorage.getItem("localIDKey")){
        
        inputID=y.shift();
        //update localStorage ID
        localStorage.setItem("localIDKey", y);
    } 
    
    let tweetEleArr={
        id: inputID,
        txt: inputTxt,
        date: inputDate
        }
        //add Tweet to Data Store
        tweetArr.push(tweetEleArr);        
        //Add Tweet to UI
        addTweetToUI(inputID, inputTxt, inputDate);
        //add Tweet to Local Store
        addTweetToLocalStore(tweetEleArr);

        //tweetId(idArr);
        
        //console.log(x);

        //Tweet Input area & Counter blank after submit
        inputElement.value="";
        txtCountElement.textContent=0;
})


//input counter
inputElement.addEventListener("input", (e)=>{
    let inputTexCount=inputElement.value.length
    txtCountElement.textContent=inputTexCount;   
})

//LocalStorage Tweet to UI
document.addEventListener("DOMContentLoaded", e=>{
    if(localStorage.getItem("localTweetKey")){
        tweetArr = JSON.parse(localStorage.getItem("localTweetKey"));
        //show Tweet to UI
        showTweetToUI(tweetArr);
    }
})

//Search
searchElement.addEventListener("keyup", e=>{
    let searchValue=e.target.value;
    let searchArr=tweetArr.filter(tweet=>
        tweet.txt.includes(searchValue));
    //show to UI
    showTweetToUI(searchArr);
})

