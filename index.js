
function PasswordCheck() {

    //test password strings
    let strPasswords = [
        "password",
        "password1a",
        "password01",
        "Password01",
        "P@ssword01",
        "abcd",
        "mypassword",
        "00000000",
        "AlphaRomeo4c",
        "fiatlinea2014",
        "F@rd1co",
        "F@rd1coSports",
        "Suzuki@lpha2016",
        "!vwvento2015",
        "!@#$%^&*Aa1",
        "myDream1@$$",
        "HelloWorld@001!"
    ];

    console.log("Java check password strength example passwords");
    for (let index in strPasswords)
        console.log(strPasswords[index] + ": " + calculatePasswordStrength(strPasswords[index]));

}

let PasswordStrength = document.getElementById("PasswordStrength");
let PasswordField = document.getElementById("PasswordField");
let AdvancedMode = document.getElementById("AdvancedMode");

let Digit = document.getElementById("Digit");
let LowerCaseLetter = document.getElementById("LowerCaseLetter");
let UpperCaseLetter = document.getElementById("UpperCaseLetter");
let SpecialCharacter = document.getElementById("SpecialCharacter");

let Warning = document.getElementById("Warning");
let CommonPasswordText=document.getElementById("CommonPassword");

function calculatePasswordStrength(password) {
    CommonPasswordText.innerHTML="";
    //total score of password
    let iPasswordScore = 0;

    CountPassword(password);

    if (password.length < 8) {
        PasswordStrength.innerHTML = "Password Strength: " + 0;
        return;
    }
    else if (password.length >= 10)
        iPasswordScore += 2;
    else
        iPasswordScore += 1;

    if (AdvancedMode.checked) {
        if (CommonPassword(password)) {
            PasswordStrength.innerHTML = "Password Strength: " + 0;
            CommonPasswordText.innerHTML="Common Password";
            return;
        }
    }

    //if it contains one digit, add 2 to total score
    if (password.match("(?=.*[0-9]).*"))
        iPasswordScore += 2;

    //if it contains one lower case letter, add 2 to total score
    if (password.match("(?=.*[a-z]).*"))
        iPasswordScore += 2;

    //if it contains one upper case letter, add 2 to total score
    if (password.match("(?=.*[A-Z]).*"))
        iPasswordScore += 2;

    //if it contains one special character, add 2 to total score
    if (password.match("(?=.*[~!@#$%^&*()_-]).*"))
        iPasswordScore += 2;

    PasswordStrength.innerHTML = "Password Strength: " + iPasswordScore;

}


function CommonPassword(Password) {

    let CommonPasswords = require('./CommonPasswords.json'); 
    for (const index in CommonPasswords) {
        if (CommonPasswords[index] == Password) {
            console.log("matches");
            return true;
        }
    }
    return false;

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

    if (DigitCount < 1 || LowerCaseLetterCount < 1 || UpperCaseLetterCount < 1 || SpecialCharacterCount < 1)
        WarningCheck(DigitCount, LowerCaseLetterCount, UpperCaseLetterCount, SpecialCharacterCount);
    else
        Warning.innerHTML = "Warning<br>None";
}

function WarningCheck(DigitCount, LowerCaseLetterCount, UpperCaseLetterCount, SpecialCharacterCount) {

    let NewWarning = "Warning<br>";

    DigitCount < 1 ? NewWarning+="digits<br>":"";
    LowerCaseLetterCount <1 ? NewWarning+="Lower Case Letter<br>":"";
    UpperCaseLetterCount <1 ? NewWarning+="Upper Case Letter<br>":"";
    SpecialCharacterCount <1 ? NewWarning+="Special Character<br>":"";

    Warning.innerHTML=NewWarning;
}