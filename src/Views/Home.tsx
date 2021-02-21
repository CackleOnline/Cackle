import * as React from 'react'

function Home(props: any) {
  return <html>
    <head>
      <link rel="stylesheet" href="/assets/styles.css"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      <link rel="manifest" href="manifest.json"/>
      <title>CackleOnline</title>
    </head>
    <body className="parent">
      <div className="div1">
        <div className="post">
          <div className="posthead">
            <input placeholder="Title" type="text" id="title" />
          </div>
          <textarea placeholder="Message" id="message" />
          <button id="submitPost">Post</button>
        </div>
        <div id="posts"></div> 
      </div>
      <div className="div2"> </div>
      <div className="div3"> </div>
      <div className="div4"> </div>
      <div className="div5" id="userdiv"> </div>
      <script src="./assets/site.js"></script>
      <script>getUserInfo()</script>
    </body>
  </html>;
}

export default Home;