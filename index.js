class Meeting {
    constructor(name, section, code, password, DT) {
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
        this.DT = DT

        meetings.push(this)
    }
}

class DT {
    constructor(days, hour, minute) {
        this.days = days
        this.hour = hour
        this.minute = minute
    }
}

let today = new Date();

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function createMeetingPage(meeting) {
    
    // console.log(meeting)

    document.write(`<h1 id="meetingname">${meeting.name}</h1>`)
    document.write(`<h2 class="bold" id="section">${meeting.section}</h2>`)
    document.write("<hr>")

    document.write("<h2>Code</h2>")
    document.write(`<h2 class="bold" id="code">${formatCode(meeting.code)}</h2>`)
    document.write("<hr>")

    document.write("<h2>Password</h2>")
    document.write(`<h2 class="bold" id="password">${meeting.password}</h2>`)
    document.write("<hr>")

    document.write(`<h2 id="link"><a href=${meeting.link}>Go To Meeting</a></h2>`)
    document.write("<hr>")

    document.write(`<h3 id="back"><a href="/">Go Back</a></h3>`)
    document.write(`<hr>`)
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };

    return i;
}

function startTime() {
    today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    let amOrPm = h >= 12 ? 'PM' : 'AM';
    h12 = (h % 12) || 12;

    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('clock').innerHTML =
        h12 + ":" + m + ":" + s + " " + amOrPm;
    
    let t = setTimeout(startTime, 500);
}

function happensToday(meeting) {
    // checks if happens today
    if (meeting.DT.days.includes(today.getDay())) {

        // console.log("happens today")
        // get what time it happens

        happenHour = meeting.DT.hour[meeting.DT.days.indexOf(today.getDay())]
        happenMin = checkTime(meeting.DT.minute[meeting.DT.days.indexOf(today.getDay())])

        // console.log(happenHour)
        // console.log(today.getHours())

        // check if it has happened
        if (happenHour < today.getHours()) {
            return false;
        }

        if (happenMin < today.getMinutes() && happenHour <= today.getHours()) {
            return false;
        }

        return true;
    }

    return false;
}

function replaceAtIndex(value, index) {
    return value.substring(0, index) + "-" + value.substring(index);
}

function formatCode(code) {
    let final;

    if (code.length === 10) {
        final = replaceAtIndex(code, 3)
        final = replaceAtIndex(final, 7)
    }
    else if (code.length == 11) {
        final = replaceAtIndex(code, 3)
        final = replaceAtIndex(final, 8)
    }

    return final;
}

let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let meetings = []


new Meeting("Math", "8B", "9217817862", "eVZvcEZTMllYaVMwdFFxdXhwMTNydz09",
    new DT([0, 1, 3, 4], [17, 14, 16, 14], [40, 00, 50, 50]))

new Meeting("English", "8B", "73947229941", "N0FPRWlOajJzem1PWVp4SjFuTUpaUT09",
    new DT([0, 1, 2, 2, 3, 4], [14, 14, 14, 16, 14, 16], [50, 50, 50, 50, 50, 00]))

new Meeting("Science", "8B", "9228364372", "ZDcxeThPWWVPMGdEOWJwV28ybnlyUT09",
    new DT([0, 1, 3, 4], [16, 17, 17, 17], [50, 40, 40, 40]))

new Meeting("Islamic", "8B", "3103149924", "SWRSamhITTQzRzFwajdlRjlucXJBUT09",
    new DT([2], [14], [00]))

let time;

for (i = 0; i < meetings.length; i++) {
    document.write(`<h2 class="meetingname"><a class="redir meetingname" href="?name=${meetings[i].name}${meetings[i].section}">${meetings[i].name}</a></h2>`)
    document.write(`<h3 class="section">${meetings[i].section}</h3>`)

    if (happensToday(meetings[i])) {
        hr = meetings[i].DT.hour[meetings[i].DT.days.indexOf(today.getDay())]
        min = checkTime(meetings[i].DT.minute[meetings[i].DT.days.indexOf(today.getDay())])
        amOrPm = hr >= 12 ? 'PM' : 'AM';

        document.write(`<h2 class="happens">This class happens today at ${((hr % 12) || 12)}:${min} ${amOrPm}</h2>`)
    }
    else {
        document.write(`<h2 class="happens">No ${meetings[i].name} today</h2>`)
    }
        
    document.write("<br>")
    document.write("<hr>")
}

// this code is made by rayan, don't steal

// console.log(getParameterByName("name"))
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