import * as React from 'react'

function Landing(props: any) {
  return <html>
    <head>
      <link rel="stylesheet" href="/assets/styles.css"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      <link rel="manifest" href="manifest.json"/>
      <title>CackleOnline</title>
    </head>
    <body>
      <div className="landingnav">
          <a href="/login">Login</a>
          <img src="/assets/logo.png" alt=""/>
          <a href="/register">Register</a>
      </div>
      <div className="landingcontainer">
          <div className="info-card">
              <h2>What is Cackle?</h2>
              <p>Cackle is a open source social media for everyone.</p>
          </div>
      </div>
      <script src="./assets/site.js"></script>
    </body>
  </html>;
}

export default Landing;