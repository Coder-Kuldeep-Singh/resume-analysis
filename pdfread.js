var pdf = require('pdf-text-extract');
var filePath = "../../../Downloads/Kuldeep-Singh (1).pdf"; //Kuldeep-Singh.pdf
// COPY+OF+COPY+OF+Resume-Kuldeep-Singh.pdf


var myTrim = (x) => {
    return x.replace(/^\s+|\s+$/gm, '');
};

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

var resumeString = (text) => {
    var resume = '';
    for (var idx = 0; idx < text.length; idx++) {
        resume += text[idx];
    }
    return resume;
};

var MatchedCases = (text,match) => {
    if (text.includes(match)) {
        return myTrim(text);
    } else {
        return "";
    }
};


pdf(filePath, {
    splitPages: false
}, function (err, text) {
    if (err) {
        console.dir(err);
        return;
    }
    var resume = resumeString(text);

    var regex = new RegExp(
        "\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+",
        "g"
    );

    var skills = [];
    var Linkedin = '';
    var github = [];
    var PhoneNumber = [];
    var Emails = [];
    var nextNode = 1;
    var checkNextNode = false;

    // var rm = text[0].replace(" ", "").split("\n");
    var rm = resume.split("\n");
    for (var idx = 0; idx < rm.length; idx++) {

        var values = MatchedCases(rm[idx],'linkedin.com');
        if (values != ''){
            Linkedin = values;
        }

        var emails = MatchedCases(rm[idx],'@gmail.com');
        if(emails != ''){
            var emailOnly = emails.split('.com');
            Emails.push(emailOnly[0]+'.com');
        }

        // Method 2 to extract phone number and successful
        var number = getNumbers(rm[idx]);
        if (number.length >= 10) {
            if (!number.includes('.')) {
                PhoneNumber.push(myTrim(number));
            }
        }

        // new method to extract the skills from the pdf with the next node method
        // I made a logic to check the the next node are blank or have values if line is blank so program will gonna end that
        if (rm[idx].toLowerCase().includes('skills') || rm[idx].toLowerCase().includes('technical skills') || rm[idx].toLowerCase().includes('it skills')) {

            while (checkNextNode == false) {
                // checking the 1 next node and 2 next node if they satisfied the condition to append skills then leave it
                if (rm[idx + 1] == '' && rm[idx + 2] == '') {
                    if (rm[idx + nextNode] != '') {
                        skills.push(rm[idx + nextNode]);
                    }
                    nextNode++;
                }

                if (rm[idx + nextNode] == '' && rm[idx + nextNode + 1] == '') {
                    checkNextNode = true;
                    break;
                }

                skills.push(rm[idx + nextNode]);
                nextNode++;
            }

            // older way to extract the skills from the pdf(resume) inefficient not accurate
            // if (rm[idx + 1].includes('•')) {
            //     // skills += myTrim(rm[idx]);
            //     skills.push(myTrim(rm[idx]));
            // }
        }

        var git = MatchedCases(rm[idx],'https://github.com');
        if(git != ''){
            github.push(git);
        }
    }

    var Resume = {
        Name: myTrim(rm[0]),
        Email: Emails,
        Phone: PhoneNumber,
        Linkedin: Linkedin,
        Github: github,
        Skills: skills,
    };
    console.log(Resume);
});