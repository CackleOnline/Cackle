import * as React from 'react'

function Home(props: any) {
  return <html>
    <head>
      <link rel="stylesheet" href="/assets/styles.css"/>
      <title>CackleOnline</title>
    </head>
    <body className="parent">
      <div className="div1"> <div id="posts"></div> </div>
      <div className="div2"> </div>
      <div className="div3"> </div>
      <div className="div4"> </div>
      <div className="div5"> </div>
      <script src="./assets/site.js"></script>
    </body>
  </html>;
}

export default Home;