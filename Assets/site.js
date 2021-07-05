//if ('serviceWorker' in navigator) {
//    window.addEventListener('load', () => {
//      navigator.serviceWorker.register('/sw.js');
//    });
//}

function thingy(message) {
    var x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function () {
    console.logs.push(Array.from(arguments));
    console.stdlog.apply(console, arguments);
    document.getElementById('console').innerHTML = console.logs.join('<br>')
}
window.onerror =
    function (msg, source, lineNo, columnNo, error) {
        console.logs.push("<br/><span style='color:red'>Error: " + msg +
            "<br> Script: " + source +
            "<br> Line: " + lineNo +
            "<br> Column: " + columnNo +
            "<br> StackTrace: " + error + "</span>");
        document.getElementById('console').innerHTML = console.logs.join('<br>')
        return true;
    };

function timetampToTime(timestamp) {
    var yeet1 = new Date()
    var yeet2 = new Date(timestamp)
    let isPM = 0
    if (yeet1.getDate() === yeet2.getDate() && yeet1.getMonth() === yeet2.getMonth() && yeet1.getFullYear() === yeet2.getFullYear()) {

        if (yeet2.getHours() === 0) {
            isPM = 1
            if (yeet2.getMinutes() < 10) {
                return "Today at " + (12) + ":0" + yeet2.getMinutes() + " PM"
            } else {
                return "Today at " + (12) + ":" + yeet2.getMinutes() + " PM"
            }
        } else if (yeet2.getHours() > 12) {
            isPM = 1
            if (yeet2.getMinutes() < 10) {
                return "Today at " + (yeet2.getHours() - 12) + ":0" + yeet2.getMinutes() + " PM"
            } else {
                return "Today at " + (yeet2.getHours() - 12) + ":" + yeet2.getMinutes() + " PM"
            }
        } else {
            if (yeet2.getHours() === 12) {
                if (yeet2.getMinutes() < 10) {
                    return "Today at " + yeet2.getHours() + ":0" + yeet2.getMinutes() + " PM"
                } else {
                    return "Today at " + yeet2.getHours() + ":" + yeet2.getMinutes() + " PM"
                }
            } else {
                isPM = 0
                if (yeet2.getMinutes() < 10) {
                    return "Today at " + yeet2.getHours() + ":0" + yeet2.getMinutes() + " AM"
                } else {
                    return "Today at " + yeet2.getHours() + ":" + yeet2.getMinutes() + " AM"
                }
            }
        }
    } else if ((yeet1.getDate() - 1) === yeet2.getDate() && yeet1.getMonth() === yeet2.getMonth() && yeet1.getFullYear() === yeet2.getFullYear()) {
        if (yeet2.getHours() > 12) {
            isPM = 1
            if (yeet2.getMinutes() < 10) {
                return "Yesterday at " + (yeet2.getHours() - 12) + ":0" + yeet2.getMinutes() + " PM"
            } else {
                return "Yesterday at " + (yeet2.getHours() - 12) + ":" + yeet2.getMinutes() + " PM"
            }
        } else {
            if (yeet2.getHours() === 12) {
                if (yeet2.getMinutes() < 10) {
                    return "Today at " + yeet2.getHours() + ":0" + yeet2.getMinutes() + " PM"
                } else {
                    return "Today at " + yeet2.getHours() + ":" + yeet2.getMinutes() + " PM"
                }
            } else {
                isPM = 0
                if (yeet2.getMinutes() < 10) {
                    return "Today at " + yeet2.getHours() + ":0" + yeet2.getMinutes() + " AM"
                } else {
                    return "Today at " + yeet2.getHours() + ":" + yeet2.getMinutes() + " AM"
                }
            }
        }
    } else if ((yeet1.getDate() + 1) === yeet2.getDate() && yeet1.getMonth() === yeet2.getMonth() && yeet1.getFullYear() === yeet2.getFullYear()) {
        if (yeet2.getHours() > 12) {
            isPM = 1
            if (yeet2.getMinutes() < 10) {
                return "Tomorrow at " + (yeet2.getHours() - 12) + ":0" + yeet2.getMinutes() + " PM"
            } else {
                return "Tomorrow at " + (yeet2.getHours() - 12) + ":" + yeet2.getMinutes() + " PM"
            }
        } else {
            if (yeet2.getHours() === 12) {
                if (yeet2.getMinutes() < 10) {
                    return "Today at " + yeet2.getHours() + ":0" + yeet2.getMinutes() + " PM"
                } else {
                    return "Today at " + yeet2.getHours() + ":" + yeet2.getMinutes() + " PM"
                }
            } else {
                isPM = 0
                if (yeet2.getMinutes() < 10) {
                    return "Today at " + yeet2.getHours() + ":0" + yeet2.getMinutes() + " AM"
                } else {
                    return "Today at " + yeet2.getHours() + ":" + yeet2.getMinutes() + " AM"
                }
            }
        }
    }
    else {
        return (yeet2.getMonth() + 1) + "/" + yeet2.getDate() + "/" + yeet2.getFullYear()
    }
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

//this fetch request is for caching purposes
fetch('/assets/danger.svg')

let contents = ""

function loadPosts() {
    contents = ""
    if (navigator.onLine) {
        fetch('/api/feed', { headers: { 'Authentication': getCookie('token') } }).then(res => res.json()).then(res => {
            contents += '<div class="post"> <input type="text" id="title" placeholder="Title"/> <br/> <textarea placeholder="Message" id="message"></textarea> <button onclick="postMessage1()">Send</button> </div> '
            res.reverse()
            for (let i = 0; i < res.length; i++) {
                const post = res[i];
                contents += `<div class="post"><div class="posth"><a href="#" onclick="loadPost(${post.id})">${twemoji.parse(post.title, { folder: 'svg', ext: '.svg' })}</a> by <a href="#" onclick="loadPostsByUser('${post.author}')">${post.author}</a> @ ${timetampToTime(post.timestamp)}</div><p> ${twemoji.parse(post.content, { folder: 'svg', ext: '.svg' })} </p> </div>`
            }
            document.getElementById("main").innerHTML = contents
        })
    } else {
        document.getElementById("main").innerHTML = `<div class="post error"> <img src="/assets/danger.svg" alt="alert"/> <br/> It appears that you are offline, try again later of refresh the page </div>`
    }
}

function loadPost(postNum) {
    window.history.pushState('object or string', 'Title', '/post/' + postNum)
    contents = ""
    if (navigator.onLine) {
        fetch('/api/post/' + postNum.toString()).then(res => res.json()).then(res => {

            const post = res[0];
            contents += `<div class="post comments"><div class="posth"> ${twemoji.parse(post.title, { folder: 'svg', ext: '.svg' })} by ${post.author} @ ${timetampToTime(post.timestamp)}</div><p> ${twemoji.parse(post.content, { folder: 'svg', ext: '.svg' })} </p> </div>`
            contents += `<div class="post"> <textarea placeholder="Comment" id="comment"></textarea> <button onclick="postComment1(${postNum})">Send</button> </div> `
            document.getElementById("main").innerHTML = contents
            fetch('/api/comments/' + postNum).then(res => res.json()).then(res1 => {
                res1 = res1.reverse()
                contents += '<div class="centered">' + res1.length + ' Comments</div>'
                for (let i = 0; i < res1.length; i++) {
                    const post1 = res1[i];
                    contents += `<div class="post"><div class="posth">Commented by ${post1.author} @ ${timetampToTime(post1.timestamp)}</div><p> ${twemoji.parse(post1.content, { folder: 'svg', ext: '.svg' })} </p> </div>`
                }
                document.getElementById("main").innerHTML = contents
            })
        })
    } else {
        document.getElementById("main").innerHTML = `<div class="post error"> <img src="/assets/danger.svg" alt="alert"/> <br/> It appears that you are offline, try again later of refresh the page </div>`
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
    }).then(res => res.json()).then(res => {
        setCookie('token', res.token, 7); window.location = '/';
        if (res1.message) {
            thingy(res.message)
        }
        if (res1.error) {
            thingy(res.error)
        }
    })
}

function register() {
    var data = { username: document.getElementById('username').value, email: document.getElementById('email').value, password: document.getElementById('password').value }
    fetch('/cauth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(res => {
        if (res.message) {
            thingy(res.message)
        }
        if (res.error) {
            thingy(res.error)
        }
    })
}

function getUserInfo() {
    fetch('/cauth/token', {
        method: 'GET',
        headers: {
            'Authentication': getCookie('token')
        }
    }).then(res => res.json()).then(res => { document.getElementById('r-sb').innerHTML = `<h2 class="welcome">Welcome back, ${res.account}!</h2>` })
}

function postMessage1() {
    var data = { title: document.getElementById('title').value, content: document.getElementById('message').value }
    fetch('/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': getCookie('token')
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(res => {
        contents = ""; console.log(res); loadPosts();
        if (res.message) {
            thingy(res.message)
        }
        if (res.error) {
            thingy(res.error)
        }
    })
}

function postComment1(post) {
    var data = { post: post, content: document.getElementById('comment').value }
    fetch('/api/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': getCookie('token')
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(res => {
        contents = ""; console.log(res); loadPost(post);
        if (res.message) {
            thingy(res.message)
        }
        if (res.error) {
            thingy(res.error)
        }
    })
}

function toggleDebug() {
    document.getElementById('debug').style.display = 'block'
    debug()
    document.getElementById('debug').innerHTML = '<span><button onclick="clearCache()">Clear Cache</button></span> • <span><button onclick="unregisterSW()">Unregister SW</button></span> • <span><button onclick="loadPosts()">Reload Posts</button></span><br/>' + document.getElementById('debug').innerHTML
}

function clearCache() {
    caches.delete('cackle-cache').then(function (thing) {
        console.log('Cache successfully cleared')
    });
}

function unregisterSW() {
    navigator.serviceWorker.getRegistration('./sw.js').then(e => e.unregister().then(function (boolean) {
        if (boolean) {
            console.log('Successfully Unregistered service worker')
        } else {
            console.log('Could Not Unregister service worker')
        }
    }))
}

function debug() {
    if (document.getElementById('debug').style.display === 'none') {

    } else {
        document.getElementById('debugm').innerHTML = `<span>online: ${navigator.onLine}</span><br>`
        requestAnimationFrame(debug)
    }
}

function navigate(page) {
    if (page === 'posts') {
        window.history.pushState('object or string', 'Title', '/')
        loadPosts()
    } else if (page === 'profile') {
        window.history.pushState('object or string', 'Title', '/@me')
        contents = ""
        if (navigator.onLine) {
            fetch('/cauth/token', {
                method: 'GET',
                headers: {
                    'Authentication': getCookie('token')
                }
            }).then(res => res.json()).then(res1 => {
                fetch('/api/posts/' + res1.account).then(res => res.json()).then(res => {
                    res.reverse()
                    contents = `<h2 class="centered">Posts by ${res1.account}</h2>`
                    for (let i = 0; i < res.length; i++) {
                        const post = res[i];
                        contents += `<div class="post"><div class="posth">${post.title} by ${post.author} @ ${timetampToTime(post.timestamp)}</div><p> ${post.content} </p> </div>`
                    }
                    document.getElementById("main").innerHTML = contents
                })
            })
        } else {
            document.getElementById("main").innerHTML = `<div class="post error"> <img src="/assets/danger.svg" alt="alert"/> <br/> It appears that you are offline, try again later of refresh the page </div>`
        }
    }
}

function followUser(user) {
    fetch('/api/follow/' + user, {
        method: 'POST',
        headers: {
            'Authentication': getCookie('token')
        }
    }).then(res => res.json()).then(res1 => {
        if (res1.message) {
            thingy(res1.message)
        }
        if (res1.error) {
            thingy(res1.error)
        }
    })
}

function loadPostsByUser(user) {
    window.history.pushState('object or string', 'Title', '/@/' + user)
    contents = ""
    if (navigator.onLine) {
        fetch('/cauth/token', {
            method: 'GET',
            headers: {
                'Authentication': getCookie('token')
            }
        }).then(res => res.json()).then(res1 => {
            fetch('/api/posts/' + user).then(res => res.json()).then(res => {
                res.reverse()
                contents = `<h2 class="centered">Posts by ${user} <button id="submitFollow followbtn" value="${user}" >Follow ${user}</button></h2>`
                for (let i = 0; i < res.length; i++) {
                    const post = res[i];
                    contents += `<div class="post"><div class="posth">${post.title} by ${post.author} @ ${timetampToTime(post.timestamp)}</div><p> ${post.content} </p> </div>`
                }
                document.getElementById("main").innerHTML = contents
                document.getElementById('submitFollow followbtn').addEventListener('click', () => { followUser(document.getElementById('submitFollow followbtn').value) })
            })
        })
    } else {
        document.getElementById("main").innerHTML = `<div class="post error"> <img src="/assets/danger.svg" alt="alert"/> <br/> It appears that you are offline, try again later of refresh the page </div>`
    }
}

var pathArray = window.location.pathname.split('/');


if (window.location.pathname === '/post/' + pathArray[2]) {
    try {
        loadPost(parseInt(pathArray[2]))
    } catch (e) {
        console.log(e)
    }
} else if (window.location.pathname === '/@/' + pathArray[2]) {
    try {
        loadPostsByUser(pathArray[2])
    } catch (e) {
        console.log(e)
    }
} else if (window.location.pathname === '/@me') {
    navigate('profile')
} else if (window.location.pathname === '/') {
    navigate('posts')
}

if (document.getElementById('submitPost') !== null) {
    document.getElementById('submitPost').addEventListener('click', (e, b) => { postMessage1(e, b); })
}

if (document.getElementById('submitFollow followbtn') !== null) {
    document.getElementById('submitFollow followbtn').addEventListener('click', () => { followUser(document.getElementById('submitFollow followbtn').value); })
}

if (document.getElementById('submitLogin') !== null) {
    document.getElementById('submitLogin').addEventListener('click', () => {
        login()
    })
}

if (document.getElementById('submitRegister') !== null) {
    document.getElementById('submitRegister').addEventListener('click', () => {
        register()
    })
}