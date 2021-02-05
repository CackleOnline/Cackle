var contents = ""

fetch('/api/posts').then(res => res.json()).then(res => {
    for (let i = 0; i < res.length; i++) {
        const post = res[i];
        contents += JSON.stringify(post)
    }
    document.getElementById("posts").innerHTML = contents
})