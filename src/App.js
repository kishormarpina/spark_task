import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Search from './components/search';
import HomePic from './components/home'
const apiKey = process.env.apiKey?process.env.apiKey:'MraXKw13D65NYTobhMVrEN4TcPs6tKNRuzhBAsuO'

function App() {
  const [post, setPost] = useState([])
  const [name, setName] = useState("")
  const [display, setDisplay] = useState(false)
  const [search, setSearch] = useState(false)
  const [picData, setpicData] = useState("")

  useEffect(() =>{
    const sample =async ()=>{
      console.log("inside useEffect", picData,name)
      if(search){
        let res = await axios.get(`https://images-api.nasa.gov/search?q=${name}`)
        console.log("got search", res);
        let finalres = res.data.collection.items
        console.log("finalres",finalres.length)
        setPost((prev)=> [...prev,...finalres])
        setDisplay(true)
      }else{
        console.log("in else",process.env)
        let res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
        console.log("after await")
        console.log("got url ", res.data);
        setpicData(res.data)
      }
    }
    sample()
  },[search]);

  const handleChange = (e) =>{
    setName(e.target.value)
  }
  const handleSearch = (e) =>{
    setSearch(true)
  }
  const handleBack = (e)=>{
    setSearch(false)
    setDisplay(false)
    setName('')
  }

  let bodyHtml = ''
  if(display){
    bodyHtml = <Search post={post} name={name} handleBack={handleBack}></Search>
  }else{
    bodyHtml = <HomePic picData={picData} name={name} handleChange={handleChange} handleSearch={handleSearch}></HomePic>
  }
  return (
    <div className="App">
    <center><h2>NASA media search</h2></center>
      {bodyHtml}
    </div>
  ); 
}
export default App;
