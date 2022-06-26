let inputElement=document.querySelector("#tweet-txt");
let submitBtnElement=document.querySelector(".submit");
let ulListElement=document.querySelector(".list-group");
let txtCountElement=document.querySelector(".txt-count");
let searchElement=document.querySelector("#search");
let divBtnElement=document.querySelector(".tweet-button")

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
    let liElement=`<li class="list-group-item overflow-hidden collection-item tweet-${id}">
    <strong class="text-info">◉ Tweet ${id}</strong> - <span class="tweet-txt text-info">${txt}</span>
    <span class="date-item border bg-opacity-25 border-info bg-info">${date}</span>
    <i class="fa fa-trash float-end delete-tweet"></i>
    <i class="fa fa-pencil float-end edit-tweet pe-4"></i>    
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
    
    //sort by id list to UI
    tArr.sort((a, b) => a.id-b.id);

    tArr.forEach(element => {
        //console.log(element.id)
        let liElement=`<li class="list-group-item overflow-hidden collection-item tweet-${element.id}">
        <strong class="text-info">◉ Tweet ${element.id}</strong> - <span class="tweet-txt text-info">${element.txt}</span>
        <span class="date-item border bg-opacity-25 border-info bg-info">${element.date}</span>
        <i class="fa fa-trash float-end delete-tweet"></i>
        <i class="fa fa-pencil float-end edit-tweet pe-4"></i>    
        </li>`

        ulListElement.insertAdjacentHTML('afterbegin', liElement);
    });
}

function getTweetId(target){
    return Number(target.parentElement.classList[3].split("-")[1]);
}

function deleteTweetFromUI(id){
    document.querySelector(`.tweet-${id}`).remove();
}

function deleteTweetFromDataStore(id){
    tweetArr=tweetArr.filter(t=>t.id!==id);
}

function deleteTweetFromLocalStore(id){
    //pick from local store
    let getTweet=JSON.parse(localStorage.getItem("localTweetKey"))
    //filter data
    let fArr=getTweet.filter(t=>t.id!==id);
    //update LocalStore Array
    localStorage.setItem("localTweetKey", JSON.stringify(fArr));
    //update localStorage ID
    y.unshift(id);
    y.sort((a,b)=>a-b);
    localStorage.setItem("localIDKey", y)
}

function showUpdateButton(){
    let updateButton=`<button class="btn mt-3 btn-warning update-button" type="button">Update</button>`;
    submitBtnElement.style.display='none';
    divBtnElement.insertAdjacentHTML("beforeend", updateButton);
}

function updateTweetToLocalStorage(tweetArr){
    if(localStorage.getItem("localTweetKey")){
        localStorage.setItem("localTweetKey", JSON.stringify(tweetArr));
    }
}

submitBtnElement.addEventListener("click", e=>{
    let inputTxt=inputElement.value;
    let inputDate=new Date().toString().substring(4,24);
    
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

        //(Reset-Input) Tweet Input area & Counter blank after submit
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

//Delete Tweet
let tweetEditId;

ulListElement.addEventListener("click", e=>{
    if(e.target.classList.contains('delete-tweet')){
        let tId=getTweetId(e.target);

        //delete from UI
        deleteTweetFromUI(tId);
        //delete from DataStore
        deleteTweetFromDataStore(tId);
        //delete from LocalStore
        deleteTweetFromLocalStore(tId);
    }
//Edit Tweet
    else if(e.target.classList.contains('edit-tweet')){
        //pick the id
        tweetEditId=getTweetId(e.target);
        //find the tweet
        let fTweet=tweetArr.find(f=>f.id===tweetEditId);
        //populate/set Tweet to UI for edit
        inputElement.value=fTweet.txt;
        fTweet.date=new Date().toString().substring(4,24);
        //show update button
        if(!document.querySelector(".update-button")){
            showUpdateButton();
        }
    }
})

//Update tweet
divBtnElement.addEventListener("click", e=>{
    if(e.target.classList.contains("update-button")){
        //pick the data from the text field
        let inputTxt=inputElement.value;
        let inputDate=new Date().toString().substring(4,24);
        //updated data should be update to data store
        tweetArr=tweetArr.map(t=>{
            if(t.id===tweetEditId){
                //text should be updated
                return {
                    id: t.id,
                    txt: inputTxt,
                    date: inputDate
                }                
            }
            else{
                return t;
            }
        })
        //reset input
        inputElement.value="";
        txtCountElement.textContent=0;
        //show submit button
        submitBtnElement.style.display='block';
        //hide update button
        document.querySelector(".update-button").remove();
        //update data should be update to UI
        showTweetToUI(tweetArr);
        //update data should be update to Local Storage
        updateTweetToLocalStorage(tweetArr);
    }
})



