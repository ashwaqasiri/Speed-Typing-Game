const random_API='https://api.quotable.io/random'
const dispalyElement=document.getElementById('displayText')
const inputElement=document.getElementById('inputText')
var timer = document.getElementById('timer_1');
let hour = 0;
let min = 0;
let sec = 0;
let count=0;
//Fetch API
function getRandomText(){
  return fetch(random_API)  
  //Return a promise
  .then(response=> response.json())
  .then(data=>data.content)
}

async function getNewText(){
const text=await getRandomText()
//console.log(text)
dispalyElement.innerText=''
text.split('').forEach(element => {
    const charspan=document.createElement('span')
    // charspan.classList.add('correct')
    charspan.innerText=element
    //console.log(element)
    dispalyElement.appendChild(charspan)
});
inputElement.value=null

}

getNewText()

inputElement.addEventListener('input',()=>{
    count++;
    if(count==1){
        displayTimer()
    }
    // var input = document.getElementById("myInput");
    const arrayDisplayText=dispalyElement.querySelectorAll('span')
    const arrayInputText=inputElement.value.split('')
    arrayDisplayText.forEach((char,index)=>{
        const character=arrayInputText[index]
        if(character==null){  
           char.classList.remove('incorrect')}
        else if (character===char.innerText){
          char.classList.add('correct')
          char.classList.remove('incorrect')
        }else{
            char.classList.add('incorrect')
            char.classList.remove('correct')
        }
    })
})
inputElement.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     getNewText()
    }
  });

function displayTimer() {
    startTimer = setInterval(function () {
        timer.innerHTML = hour + ":" + min + ": " + sec ;
        sec++;
        if (sec == 60) {
            sec = 0;
            min++;
        }
        if (min == 60) {
            min = 0;
            hour++;
        }
    }, 1000);
}