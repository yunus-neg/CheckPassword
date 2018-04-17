const { clipboard } = require('electron')

// var elem  = document.querySelector('.tooltipped');
// var instance =  M.Tooltip.init(elem)

$('#PasswordField').bind('input propertychange', function () {
    calculatePasswordStrength(this.value);

})

let FoundInCommonpassword = false;
let FoundSequence = false;
let FoundDuplicated = false;

let PasswordStrength = document.getElementById("PasswordStrength");
let PasswordField = document.getElementById("PasswordField");
let AdvancedMode = document.getElementById("AdvancedMode");
let progressBar = document.getElementById("progressBar");

let Digit = document.getElementById("Digit");
let LowerCaseLetter = document.getElementById("LowerCaseLetter");
let UpperCaseLetter = document.getElementById("UpperCaseLetter");
let SpecialCharacter = document.getElementById("SpecialCharacter");
let PasswordLength = document.getElementById("PasswordLength");

let WarningBox = document.getElementById("WarningBox");
let ClappingImg = document.getElementById("ClappingImg");
let Warning = document.getElementById("Warning");

let suggestedPassword = document.getElementById("suggestedPassword");
let suggestedPasswordBox = document.getElementById("suggestedPasswordBox");

function calculatePasswordStrength(password) {
    //total score of password
    let PasswordScore = 0;



    CountPassword(password);

    if (password.length < 8) {
        PasswordStrength.innerHTML = "Password Strength: " + 0;
        progressBar.style.width = "0%";
        ClappingFunc(PasswordScore);

        return;
    }
    if (FoundInCommonpassword) {
        PasswordStrength.innerHTML = "Password Strength: " + 0;
        progressBar.style.width = "0%";
        ClappingFunc(PasswordScore);

        return;
    }

    if (!FoundSequence)
        PasswordScore++;

    if (!FoundDuplicated)
        PasswordScore++;

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
    progressBarColor(PasswordScore);
    progressBar.style.width = PasswordScore * 10 + "%";

    ClappingFunc(PasswordScore);

}


function CommonPassword(Password) {

    let CommonPasswords = require('./assets/json/CommonPasswords.json');

    if (CommonPasswords.includes(Password)) {
        console.log("matches");
        FoundInCommonpassword = true;
        return;
    }

    FoundInCommonpassword = false;

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
    PasswordLength.innerHTML = "Password length: " + Password.length;

    CommonPassword(Password);
    duplicated(Password);
    HaveSequence(Password);

    if (DigitCount < 1 || LowerCaseLetterCount < 1 || UpperCaseLetterCount < 1 || SpecialCharacterCount < 1 || Password.length < 8 || FoundInCommonpassword || FoundDuplicated || FoundSequence)
        WarningCheck(DigitCount, LowerCaseLetterCount, UpperCaseLetterCount, SpecialCharacterCount, Password);
    else {
        WarningBox.hidden = true;
    }

    if (WarningBox.hidden) {
        suggestedPasswordBox.className = "cyan col m4 push-m4 card small";
    }
    else {
        suggestedPasswordBox.className = "cyan col m4  card small";
    }
}

function WarningCheck(DigitCount, LowerCaseLetterCount, UpperCaseLetterCount, SpecialCharacterCount, Password) {
    WarningBox.hidden = false;
    let NewWarning = "Warning<br>";
    if (Password == "") {
        WarningBox.hidden = true;
    }
    if (Password.length < 8) {
        NewWarning += "Less than 8 charcters<br>";
        Warning.innerHTML = NewWarning;
        return;
    }
    if (FoundInCommonpassword) {
        NewWarning += "Common Passwrod<br>";
        Warning.innerHTML = NewWarning;
        return;
    }
    FoundDuplicated ? NewWarning += "Duplicated<br>" : "";
    FoundSequence ? NewWarning += "Have Sequence<br>" : "";
    DigitCount < 1 ? NewWarning += "digits<br>" : "";
    LowerCaseLetterCount < 1 ? NewWarning += "Lower Case Letter<br>" : "";
    UpperCaseLetterCount < 1 ? NewWarning += "Upper Case Letter<br>" : "";
    SpecialCharacterCount < 1 ? NewWarning += "Special Character<br>" : "";

    Warning.innerHTML = NewWarning;
}

function progressBarColor(PasswordScore) {
    progressBar.className = 'determinate';
    switch (PasswordScore) {
        case 1:
            progressBar.className += ' red darken-4';
            break;
        case 2:
            progressBar.className += ' red darken-3';
            break;
        case 3:
            progressBar.className += ' red darken-2';
            break;
        case 4:
            progressBar.className += ' orange darken-3';
            break;
        case 5:
            progressBar.className += ' orange darken-2';
            break;
        case 6:
            progressBar.className += ' orange darken-1';
            break;
        case 7:
            progressBar.className += ' green lighten-2';
            break;
        case 8:
            progressBar.className += ' green';
            break;
        case 9:
            progressBar.className += ' green darken-1';
            break;
        case 10:
            progressBar.className += ' green darken-3';
            break;
        default:

    };
}

function duplicated(Password) {
    for (let i = 0; i < Password.length; i++) {
        for (let j = i + 1; j < Password.length; j++) {
            if (Password[i] == Password[j]) {
                FoundDuplicated = true;
                return;
            }
        }
    }
    FoundDuplicated = false;

}

function HaveSequence(Password) {
    for (let i = 0; i < Password.length - 1; i++) {
        let next = String.fromCharCode(Password[i].charCodeAt(0) + 1);
        let prev = String.fromCharCode(Password[i].charCodeAt(0) - 1);
        if (Password[i + 1] == next || Password[i + 1] == prev) {
            FoundSequence = true;
            return;
        }

    }
    FoundSequence = false;
}

function suggestingPassword() {

    let BestPasswords = require("./assets/json/BestPasswords.json");
    let NewSuggestedPasswords = "";

    for (let i = 0; i < 5; i++) {
        let ChoosenPassword = BestPasswords[Math.floor((Math.random() * 999999) + 0)];
        NewSuggestedPasswords += ChoosenPassword + '<a href="#"><i class="material-icons right tooltipped" onclick="CopyPassword(this)" Password=' + ChoosenPassword + ' style="color: black" data-position="right" data-tooltip="copy me">content_copya</i> </a>' + "<br><br>";
    }
    suggestedPassword.innerHTML = NewSuggestedPasswords;

    UpdateToolTip();
}

suggestingPassword();


function CopyPassword(Password) {
    clipboard.writeText(Password.getAttribute("Password"));
    Password.setAttribute("data-tooltip", "copied!");

    let pass = M.Tooltip.getInstance(Password, { outDuration: 1599 });

    pass.close();
    pass.open();

    Password.setAttribute("data-tooltip", "copy me");
}



function UpdateToolTip() {

    var elem = document.querySelectorAll('.tooltipped');
    var instance = M.Tooltip.init(elem);
}

function ClappingFunc(PasswordScore) {
    if (PasswordScore == 10) {
        ClappingImg.style.display = "";
        suggestedPasswordBox.className = "cyan col m4  card small";
        console.log("show" + "||" + ClappingImg.style.display);

    }
    else {

        ClappingImg.style.display = "none";
        console.log("hidden" + "||" + ClappingImg.style.display);

    }
}