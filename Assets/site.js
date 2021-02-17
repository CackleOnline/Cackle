if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
}

let contents = ""

function load(){
fetch('/api/posts').then(res => res.json()).then(res => {
    for (let i = 0; i < res.length; i++) {
        const post = res[i];
        contents += `<div class="post"><div class="posthead"> ${post.title} </div><p> ${post.content} </p> </div>`
    }
    document.getElementById("posts").innerHTML = contents
})
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Strict;";
}

function login() {
    var data = { username: document.getElementById('username').value, password: document.getElementById('password').value }
    console.log(data)
    fetch('/cauth/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(res => { setCookie('token', res.token, 7); window.location = '/' })
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

console.log(getCookie('token'))

document.getElementById('submitPost').onclick = function () { postMessage() }

document.getElementById('submitLogin').onclick = function () { login() }