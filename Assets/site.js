if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
}

function timetampToTime(timestamp){
    var yeet1 = new Date()
    var yeet2 = new Date(timestamp)
    let isPM = 0
    if(yeet1.getDate() === yeet2.getDate() && yeet1.getMonth() === yeet2.getMonth() && yeet1.getFullYear() === yeet2.getFullYear()){
        if(yeet2.getHours() > 12){
            isPM = 1
            if(yeet2.getMinutes() < 10){
                return "Today at " + (yeet2.getHours() - 12) + ":0" + yeet2.getMinutes() + " PM"
            }else{
                return "Today at " + (yeet2.getHours() - 12) + ":" + yeet2.getMinutes() + " PM"
            }
        }else {
            if(yeet2.getHours() === 12){
                if(yeet2.getMinutes() < 10){
                return "Today at " + yeet2.getHours() + ":0" + yeet2.getMinutes() + " PM"
            }else{
                return "Today at " + yeet2.getHours() + ":" + yeet2.getMinutes() + " PM"
            }
            }else{
            isPM = 0
            if(yeet2.getMinutes() < 10){
                return "Today at " + yeet2.getHours() + ":0" + yeet2.getMinutes() + " AM"
            }else{
                return "Today at " + yeet2.getHours() + ":" + yeet2.getMinutes() + " AM"
            }}
        }
    }else if((yeet1.getDate() - 1) === yeet2.getDate() && yeet1.getMonth() === yeet2.getMonth() && yeet1.getFullYear() === yeet2.getFullYear()){
        if(yeet2.getHours() > 12){
            isPM = 1
            if(yeet2.getMinutes() < 10){
                return "Yesterday at " + (yeet2.getHours() - 12) + ":0" + yeet2.getMinutes() + " PM"
            }else{
                return "Yesterday at " + (yeet2.getHours() - 12) + ":" + yeet2.getMinutes() + " PM"
            }
            }else{
                if(yeet2.getHours() === 12){
                if(yeet2.getMinutes() < 10){
                return "Today at " + yeet2.getHours() + ":0" + yeet2.getMinutes() + " PM"
            }else{
                return "Today at " + yeet2.getHours() + ":" + yeet2.getMinutes() + " PM"
            }
            }else{
            isPM = 0
            if(yeet2.getMinutes() < 10){
                return "Today at " + yeet2.getHours() + ":0" + yeet2.getMinutes() + " AM"
            }else{
                return "Today at " + yeet2.getHours() + ":" + yeet2.getMinutes() + " AM"
            }}
        }
    }else if((yeet1.getDate() + 1) === yeet2.getDate() && yeet1.getMonth() === yeet2.getMonth() && yeet1.getFullYear() === yeet2.getFullYear()){
        if(yeet2.getHours() > 12){
            isPM = 1
            if(yeet2.getMinutes() < 10){
                return "Tomorrow at " + (yeet2.getHours() - 12) + ":0" + yeet2.getMinutes() + " PM"
            }else{
                return "Tomorrow at " + (yeet2.getHours() - 12) + ":" + yeet2.getMinutes() + " PM"
            }
            }else{
                if(yeet2.getHours() === 12){
                if(yeet2.getMinutes() < 10){
                return "Today at " + yeet2.getHours() + ":0" + yeet2.getMinutes() + " PM"
            }else{
                return "Today at " + yeet2.getHours() + ":" + yeet2.getMinutes() + " PM"
            }
            }else{
            isPM = 0
            if(yeet2.getMinutes() < 10){
                return "Today at " + yeet2.getHours() + ":0" + yeet2.getMinutes() + " AM"
            }else{
                return "Today at " + yeet2.getHours() + ":" + yeet2.getMinutes() + " AM"
            }}
        }}
    else{
        return (yeet2.getMonth() + 1) + "/" + yeet2.getDate() + "/" + yeet2.getFullYear()
    }
}


//this fetch request is for caching purposes
fetch('/assets/danger.svg')

let contents = ""

function load(){
    if(navigator.onLine){
        fetch('/api/posts').then(res => res.json()).then(res => {
            for (let i = 0; i < res.length; i++) {
                const post = res[i];
                contents += `<div class="post"><div class="posthead"> ${post.title}  •  ${post.author} •  ${timetampToTime(post.timestamp)} </div><p> ${post.content} </p> </div>`
            }
            document.getElementById("posts").innerHTML = contents
        })
    }else{
        document.getElementById("posts").innerHTML = `<div class="post error"> <img src="/assets/danger.svg" alt="alert"/> <br/> It appears that you are offline, try again later of refresh the page </div>`
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Strict;";
}

function login() {
    var data = { username: document.getElementById('username').value, password: document.getElementById('password').value }
    fetch('/cauth/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(res => { setCookie('token', res.token, 7); window.location = '/' })
}

function register() {
    var data = { username: document.getElementById('username').value, email: document.getElementById('email').value, password: document.getElementById('password').value }
    fetch('/cauth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(res => { console.log(res)})
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getUserInfo() {
    fetch('/cauth/token', {
        method: 'GET',
        headers: {
            'Authentication': getCookie('token')
        }
    }).then(res => res.json()).then(res => { document.getElementById('userdiv').innerHTML = `<h2>Logged in as ${res.account}</h2>`})
}

function postMessage() {
    var data = { title: document.getElementById('title').value, content: document.getElementById('message').value }
    fetch('/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': getCookie('token')
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(res => { contents = ""; console.log(res); load() })
}

load()

document.getElementById('submitPost').onclick = postMessage

document.getElementById('submitLogin').onclick = login

document.getElementById('submitRegister').onclick = register