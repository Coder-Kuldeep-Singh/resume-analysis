var pdf = require('pdf-text-extract');
let filePath = "../../../Downloads/COPY+OF+COPY+OF+Resume-Kuldeep-Singh.pdf" //Kuldeep-Singh.pdf
// COPY+OF+COPY+OF+Resume-Kuldeep-Singh.pdf


let myTrim = (x) => {
    return x.replace(/^\s+|\s+$/gm, '');
}

function getNumbers(string) {
    string = string.split(" ");
    var int = "";
    for (var i = 0; i < string.length; i++) {
        if (isNaN(string[i]) == false) {
            int += string[i];
        }
    }
    return int;
}

pdf(filePath, {
    splitPages: false
}, (err, text) => {
    if (err) {
        console.dir(err);
        return
    }

    let Resume = {};

    let rm = text[0].replace(" ", "").split("\n");
    Resume['Name'] = myTrim(rm[0]);
    // let Numbers = [];
    var regex = new RegExp(
        // "\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]\\d{2,})+",
        "\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+",
        "g"
    );

    let skills = ""
    for (let idx = 0; idx < rm.length; idx++) {

        if (rm[idx].includes('linkedin.com')) {
            Resume['linkedin'] = myTrim(rm[idx]);
        }

        if (rm[idx].includes('@gmail.com')) {
            let emailOnly = rm[idx].split(".com");
            // console.log();
            Resume['email'] = myTrim(emailOnly[0]);
        }

        // Method 2 to extract phone number and successful
        let number = getNumbers(rm[idx])
        if (number.length >= 10) {
            Resume['number'] = myTrim(number);
        };

        // (rm[idx].includes('Skills') ||
        if (rm[idx].includes('•')) {
            skills += myTrim(rm[idx]);
        }



        // Method 1 to extract phone number but failed
        // if (regex.exec(rm[idx])) {
        //     console.log(rm[idx]);
        //     Resume['number'] = myTrim(rm[idx]);
        // }

        if (rm[idx].includes('https://github.com')) {
            Resume['github'] = myTrim(rm[idx]);
        }



    }
    Resume['skills'] = skills;
    console.log(Resume);
});