class Meeting {
    constructor(name, section, code, password) {
        this.name = name;
        this.section = section;
        this.code = code;
        this.password = password;
        if (this.password == null || this.password == "") {
            this.link = `https://us04web.zoom.us/j/${this.code}`
        }
        else {
            this.link = `https://us04web.zoom.us/j/${this.code}?pwd=${this.password}`
        }

        meetings.push(this)
    }
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function createMeetingPage(meeting) {
    console.log(meeting)

    document.write(`<h1 id="meetingname">${meeting.name}</h1>`)
    document.write(`<h2 class="bold" id="section">${meeting.section}</h2>`)
    document.write("<hr>")

    document.write("<h2>Code</h2>")
    document.write(`<h2 class="bold" id="code">${meeting.code}</h2>`)
    document.write("<hr>")

    document.write("<h2>Password</h2>")
    document.write(`<h2 class="bold" id="password">${meeting.password}</h2>`)
    document.write("<hr>")

    document.write(`<h2 id="link"><a href=${meeting.link}>Go To Meeting</a></h2>`)
    document.write("<hr>")

    document.write(`<h3 id="back"><a href="/">Go Back</a></h3>`)
}

let meetings = []

let math8B = new Meeting("Math", "8B", "9217817862", "eVZvcEZTMllYaVMwdFFxdXhwMTNydz09")
let english8B = new Meeting("English", "8B", "73947229941", "N0FPRWlOajJzem1PWVp4SjFuTUpaUT09")
let science8B = new Meeting("Science", "8B\\9B", "9228364372", "ZDcxeThPWWVPMGdEOWJwV28ybnlyUT09")


for (i = 0; i < meetings.length; i++) {
    document.write(`<h2 class="meetingname"><a class="redir meetingname" href="?name=${meetings[i].name}${meetings[i].section}">${meetings[i].name}</a></h2>`)
    document.write(`<h3 class="section">${meetings[i].section}</h3>`)
    document.write("<br>")
    document.write("<hr>")
}

console.log(getParameterByName("name"))
if (getParameterByName("name") != null) {

    for (let i = 0; i < meetings.length; i++) {
        let meeting = meetings[i];

        if (meeting.name + meeting.section == getParameterByName("name")) {
            document.body.innerHTML = ""
            createMeetingPage(meeting)
            break
        }
        
    }
}