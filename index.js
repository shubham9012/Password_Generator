const inputSlider =document.querySelector("[data-length_slider]");
const lengthDisplay=document.querySelector('[data-lenth_no]');
const passwordDisplay =document.querySelector('.display');
const uppercaseCheck=document.querySelector('#uppercase');
const lowercaseCheck=document.querySelector('#lowercase');
const numberCheck=document.querySelector('#numbers');
const symbolCheck=document.querySelector('#symbols');
const colorStrength=document.querySelector('[data-indicator]');
const copyMsg = document.querySelector('[data-copy]');
const copybtn=document.querySelector('[data-copybtn]');
const generateBtn=document.querySelector('.generate');
const allCheckBox=document.querySelectorAll('input[type=checkbox]');
const symbols= '~`!@#$%^&*()_-=+}]{[|\";:<,>.?/';

let password= "";
let passwordLength =10;
let checkCount= 0;
handleSlider();

setstrength("#ccc");



function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerHTML=passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}



function setstrength(color){
    colorStrength.style.backgroundColor=color;
    colorStrength.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getrandomint(min ,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function generateint(){
    return getrandomint(0,9);

}

function generateLowercase(){
   return String.fromCharCode( getrandomint(97,123));
}

function generateUppercase(){
    return String.fromCharCode( getrandomint(65,91));
 }

 function generateSymbol(){
    const rannum=getrandomint(0,symbols.length);
    return symbols.charAt(rannum);
 }

 function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

 function calcStrength(){
    let hasNum=false;
    let hasupp=false;
    let hasLow=false;
    let hassym=false;
    if (uppercaseCheck.checked) hasupp=true;
    if (lowercaseCheck.checked) hasLow=true;
    if (symbolCheck.checked) hassym=true;
    if (numberCheck.checked) hasNum=true;

    if (hasupp && hasNum && (hasLow || hassym)&& passwordLength >=6){
        setstrength("#0f0");
       
    }
    else if ((hasupp ||hasLow) &&(hasNum || hassym)&& passwordLength>=5){
        setstrength('#ff0');
    }
    else {
        setstrength('#f00');
    }
 }
 
 async function copiedmsg(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch(e){

        copyMsg.innerHTML="failed";

    }

    copyMsg.classList.add('active')
    setTimeout(()=>{
        copyMsg.classList.remove('active')
    },3000);
 }

 function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
       if (checkbox.checked)
        checkCount++;
       
    });

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

 };

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
 });

 inputSlider.addEventListener( 'input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
 });

 copybtn.addEventListener('click', ()=>{
    if(passwordDisplay.value)
    copiedmsg();
 });


 generateBtn.addEventListener('click', () => {

    console.log('started');
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

        console.log('cover');

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    console.log("Starting the Journey");
    //remove old password
    password = "";

   
    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUppercase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowercase);

    if(numberCheck.checked)
        funcArr.push(generateint);

    if(symbolCheck.checked)
        funcArr.push(generateSymbol);

        console.log('checked');

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {

        let randIndex = getrandomint(0 , funcArr.length);

        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }

    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});

