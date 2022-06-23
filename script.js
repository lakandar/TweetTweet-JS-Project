let inputElement=document.querySelector("#tweet-txt");
let submitBtnElement=document.querySelector(".submit");
let ulListElement=document.querySelector(".list-group");
let txtCountElement=document.querySelector(".txt-count");

let tweetArr=[];
let idArr=[];

function generateID(){
    let id=0;
    for(let i=1; i<=100; i++){
        idArr.push(i)
    }
    return idArr
}

function addTweetToUI(id, txt){
    let liElement=`<li class="list-group-item collection-item tweet-id">
    <strong class="text-info">Tweet ${id}</strong> - <span class="tweet-txt text-info">${txt}</span>
    <i class="fa fa-trash float-end delete-item"></i>
    <i class="fa fa-pencil-alt float-end edit-item pe-4"></i>
    </li>`

    ulListElement.insertAdjacentHTML('beforeend', liElement);
}

submitBtnElement.addEventListener("click", e=>{
    let inputTxt=inputElement.value;
    generateID();
    let inputID=idArr.shift();
    
    let tweetEleArr={
        id: inputID,
            txt: inputTxt
        }
        tweetArr.push(tweetEleArr);
        //Add Tweet to UI
        addTweetToUI(inputID, inputTxt);
        //Tweet Input area & Counter blank after submit
        inputElement.value="";
        txtCountElement.textContent=0;
})

//input counter
inputElement.addEventListener("input", ()=>{
    let inputTexCount=inputElement.value.length
    txtCountElement.textContent=inputTexCount;
    if(inputTexCount===250){
        alert("Please Tweet within 250 Characters!!!")
        //block the input......
    }
})

