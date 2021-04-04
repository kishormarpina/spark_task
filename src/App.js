// import './App.css';
import React from 'react';
import axios from 'axios';
// import image from './immages/nature2.jpg';
// import Image from "../ImageComponent/ImageComponent";

import {useState, useEffect} from 'react';

function App() {
  const [post, setPost] = useState([])
  const [name, setName] = useState("")
  const [display, setDisplay] = useState(false)
  // const [url, setUrl] = useState("")
  let url = ''
  //  const askdf= async ()=>{
  //   Array.forEach(async elem =>{
  //     await SVGDefsElement()
  //   })  
  // }
  useEffect(() =>{

    const sample =async ()=>{
      console.log("inside useEffect", url,name)
      // const res = await  axios.get('https://api.nasa.gov/planetary/apod?api_key=EW0wzQ1fKr10KHI3aPKDzTgxRgnJpwkueUnTA3Z')
      if(display){
        fetch(`https://images-api.nasa.gov/search?q=${name}`)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log("got this", res);
            let finalres = res.collection.items
            setPost((prev)=> [...prev,finalres])
          });
      }else{
        console.log("in else")
       let res = await  axios.get('https://api.nasa.gov/planetary/apod?api_key=EW0wzQ1fKr10KHI3aPKDzTgxRgnJpwkueUnTA3Z')
       console.log("after await")
        
       // .then((res) => {
            // return res.json();
          // })
          // .then((res) => {
            console.log("got this", res);
            let finalres = res.url
        // setUrl(finalres)
        url = finalres
        console.log("url is",url)
          // });
      }
    }
    sample()
    console.log("at the end")
  });

  const handleChange = (e) =>{
    setName(e.target.value)
    setDisplay(true)
  }

  let bodyHtml = ''
  if(display){
    bodyHtml = post.map(elem =>{
      return <img>{elem.links.href}</img>
    })
  }else{
    bodyHtml=<div className="App">
    <div className = 'big_container'>
    <center><h2>NASA media search</h2></center>
    <div className="image_title"
    style={{
        position: "fixed",
        left: 0,
        top: 0,
        padding: "4rem",
        // backgroundColor: "F5EFEB",
        border: 2
      }}>
        <p>image title</p>
    </div> 
    <div className=""
    style={{
        position: "fixed",
        right: 0,
        top: 0,
        padding: "4rem",
        // backgroundColor: "F5EFEB",
        border: 2
      }}>
      <input value={name} onChange={handleChange}/>
      <button  value="search" type="button">search</button>
      </div> 
      <center><img width="800" height="400" src={url}></img></center> 
      <div>
      <center>
        <p1> image description</p1> <br/>
        <p1> image date</p1> <br/>
        <p1> image copyright info</p1>

      </center>
      </div>
    </div>

  </div>
  }

  return (
    <div className="App">
      {bodyHtml}
    </div>
  );
}

export default App;
