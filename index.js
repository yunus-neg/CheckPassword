
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

function calculatePasswordStrength(password) {
    password = password.value;
    console.log(password.length);
    //total score of password
    let iPasswordScore = 0;



    if (password.length < 8) {
        PasswordStrength.textContent = "Password Strength: " + 0;
        return;
    }
    else if (password.length >= 10)
        iPasswordScore += 2;
    else
        iPasswordScore += 1;

    if (AdvancedMode.checked) {
        if (CommonPassword(password)) {
            PasswordStrength.textContent = "Password Strength: " + 0;
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

    PasswordStrength.textContent = "Password Strength: " + iPasswordScore;

}


function CommonPassword(Password) {

    let CommonPasswords = require('./CommonPasswords.json'); //(with path)
    let count =0
    for (const index in CommonPasswords) {
        console.log(CommonPasswords[index].length);
        if(CommonPasswords[index].length<8){
            console.log(CommonPasswords[index]+"---"+CommonPasswords[index].length);
            count++;
        }
        if (CommonPasswords[index] == Password) {
            console.log("matches");
            return true;
        }
        // console.log(CommonPasswords[index]);
    }
    console.log("less than 8 letters"+count);
    return false;
   
}