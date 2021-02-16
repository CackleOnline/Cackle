import * as React from 'react'
import Login from '../Routes/Login';

function Home(props: any) {
  return <html>
    <head>
      <link rel="stylesheet" href="/assets/styles.css" />
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
      <script src="./assets/site.js"></script>
    </body>
  </html>;
}

export default Home;