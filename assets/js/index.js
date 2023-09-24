let characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

console.log(characters.length)

const firstPassEl = document.getElementById('firstPass')
const secondPassEl = document.getElementById('secondPass')
const dialogEl = document.getElementById('dialog')
const resultEl = document.getElementById("result");
const symbolsEl = document.querySelector("#symbols");
const numbersEl = document.querySelector("#numbers");

let minPasswordLength = 10;

resultEl.textContent = minPasswordLength;

symbolsEl.addEventListener("change", removeSymbols);
numbersEl.addEventListener("change", removeNumbers);

function addSymbols() {
    characters = characters.concat(["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"]);
}

function addNumbers() {
    characters = characters.concat(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
}

function removeSymbols() {
     if (!symbolsEl.checked) {
    // Remove the symbols from the characters array.
    characters = characters.filter(element => !element.match(/[~`|@#$%^&*()_+\-=\[\]{};:'"\\,./<>?]/g));
    } else {
        // Add the symbols back to the characters array.
        characters = characters.concat(["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"]);
    }

    // If the numbers checkbox is checked, add the numbers back to the characters array.
    if (numbersEl.checked) {
        characters = characters.concat(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    }
}

function removeNumbers() {
    if (!numbersEl.checked) {
        characters.splice(52)
    } else {
        addNumbers()
    }
    
    if (symbolsEl.checked) {
        addSymbols();
    }
}

function randomizeCharacters() {
    let firstRandomPass = "";
    let secondRandomPass = "";
    let firstPass = [];
    let secondPass = [];
    
    for(let i = 0; i < characters.length; i++) {
        firstRandomPass = Math.floor((Math.random() * characters.length))
        secondRandomPass = Math.floor((Math.random() * characters.length))
    
        firstPass += characters[firstRandomPass];
        if (firstPass.length === minPasswordLength) {
            firstPassEl.textContent = firstPass;
        }
        
        secondPass += characters[secondRandomPass];
        if (secondPass.length === minPasswordLength) {
            secondPassEl.textContent = secondPass
        }          
    }
}

function copyClipboard(element) {
    if (element.textContent.length > 0) {   
        let text = element.innerText;
        let elem = document.createElement("textarea")
        document.body.appendChild(elem);
        elem.value = text;
        elem.select();
        document.execCommand("copy");
        document.body.removeChild(elem);
        
        dialogEl.showModal();
    }
}

function copyFirstPassToClipboard() {
    copyClipboard(firstPassEl);
}

function copySecondPassToClipboard() {
    copyClipboard(secondPassEl);
}

function generatePassword() {
    randomizeCharacters()
    selectLength()    
}

function selectLength() {
    let passwordLengthEl = document.getElementById("password-length").value;
    resultEl.textContent = passwordLengthEl;
    
    minPasswordLength = Number(resultEl.textContent);  
}