
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

function calculatePasswordStrength(password) {

    //total score of password
    let iPasswordScore = 0;

    if (password.length < 8)
        return 0;
    else if (password.length >= 10)
        iPasswordScore += 2;
    else
        iPasswordScore += 1;

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

    return iPasswordScore;

}
PasswordCheck();