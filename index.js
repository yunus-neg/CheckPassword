let FoundInCommonpassword=false;

let PasswordStrength = document.getElementById("PasswordStrength");
let PasswordField = document.getElementById("PasswordField");
let AdvancedMode = document.getElementById("AdvancedMode");
let progressBar = document.getElementById("progressBar");

let Digit = document.getElementById("Digit");
let LowerCaseLetter = document.getElementById("LowerCaseLetter");
let UpperCaseLetter = document.getElementById("UpperCaseLetter");
let SpecialCharacter = document.getElementById("SpecialCharacter");

let WarningBox=document.getElementById("WarningBox");
let Warning = document.getElementById("Warning");
let CommonPasswordText = document.getElementById("CommonPassword");

function calculatePasswordStrength(password) {
    CommonPasswordText.innerHTML = "";
    //total score of password
    let PasswordScore = 1;



    CountPassword(password);

    if (password.length < 8) {
        PasswordStrength.innerHTML = "Password Strength: " + 0;
        progressBar.style.width = "0%";
        return;
    }
    else if (password.length >= 10)
        PasswordScore += 1;
    


    if (FoundInCommonpassword) {
        PasswordScore--;
    }


    //if it contains one digit, add 2 to total score
    if (password.match("(?=.*[0-9]).*"))
        PasswordScore += 2;

    //if it contains one lower case letter, add 2 to total score
    if (password.match("(?=.*[a-z]).*"))
        PasswordScore += 2;

    //if it contains one upper case letter, add 2 to total score
    if (password.match("(?=.*[A-Z]).*"))
        PasswordScore += 2;

    //if it contains one special character, add 2 to total score
    if (password.match("(?=.*[~!@#$%^&*()_-]).*"))
        PasswordScore += 2;

    PasswordStrength.innerHTML = "Password Strength: " + PasswordScore;
    progressBar.style.width = PasswordScore * 10 + "%";
    progressBar.style.backgroundColor="rgb(0, "+Math.floor(2.55*(10*PasswordScore))+", 0)";

}


function CommonPassword(Password) {

    let CommonPasswords = require('./CommonPasswords.json');
    for (const index in CommonPasswords) {
        if (CommonPasswords[index] == Password) {
            console.log("matches");
            FoundInCommonpassword=true;
            return;
        }
    }
    FoundInCommonpassword=false;

}

function CountPassword(Password) {
    let DigitCount = 0;
    let LowerCaseLetterCount = 0;
    let UpperCaseLetterCount = 0;
    let SpecialCharacterCount = 0;

    for (const index in Password) {
        if (Password[index].match("(?=.*[0-9]).*"))
            DigitCount++;

        else if (Password[index].match("(?=.*[a-z]).*"))
            LowerCaseLetterCount++;

        else if (Password[index].match("(?=.*[A-Z]).*"))
            UpperCaseLetterCount++;

        else if (Password[index].match("(?=.*[~!@#$%^&*()_-]).*"))
            SpecialCharacterCount++;
    }

    Digit.innerHTML = "Digits: " + DigitCount;
    LowerCaseLetter.innerHTML = "lower case letteres: " + LowerCaseLetterCount;
    UpperCaseLetter.innerHTML = "Upper case letteres: " + UpperCaseLetterCount;
    SpecialCharacter.innerHTML = "Special Characteres: " + SpecialCharacterCount;

    CommonPassword(Password);

    if (DigitCount < 1 || LowerCaseLetterCount < 1 || UpperCaseLetterCount < 1 || SpecialCharacterCount < 1 || Password.length<8)
        WarningCheck(DigitCount, LowerCaseLetterCount, UpperCaseLetterCount, SpecialCharacterCount,Password);
    else{
        WarningBox.hidden=true;
    }
}

function WarningCheck(DigitCount, LowerCaseLetterCount, UpperCaseLetterCount, SpecialCharacterCount,Password) {
    WarningBox.hidden=false;
    let NewWarning = "Warning<br>";

    Password.length <8 ?NewWarning+="Less than 8 charcters<br>":"";
    FoundInCommonpassword ? NewWarning+="Common Passwrod<br>" :"";
    DigitCount < 1 ? NewWarning += "digits<br>" : "";
    LowerCaseLetterCount < 1 ? NewWarning += "Lower Case Letter<br>" : "";
    UpperCaseLetterCount < 1 ? NewWarning += "Upper Case Letter<br>" : "";
    SpecialCharacterCount < 1 ? NewWarning += "Special Character<br>" : "";

    Warning.innerHTML = NewWarning;
}
