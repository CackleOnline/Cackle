import * as React from 'react'
import Login from '../Routes/Login';

function Home(props: any) {
  return <html>
    <head>
      <link rel="stylesheet" href="/assets/styles.css" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      <link rel="manifest" href="manifest.json"/>
      <title>CackleOnline</title>
    </head>
    <body >
      <div className="post">
        <div className="posthead">
          Login
        </div>
        <input placeholder="Username" type="text" id="username" /> 
        <input placeholder="Password" type="text" id="password" />
        <button id="submitLogin">Login</button>
      </div>
      <script src="https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"></script>
      <script src="./assets/site.js"></script>
    </body>
  </html>;
}

export default Home;