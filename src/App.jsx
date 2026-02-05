import React, { Component } from 'react';
import { useState, useEffect } from 'react'

import axios from 'axios'

const App = () => {
  const [valobj, setValobj] = useState([{}])
  const [val, setVal] = useState([])
//  const [lan, setLan] = useState([])

  const [filtra, setFiltra] = useState('')

  let  arrayOfObjects = [{}]
  let object = []
  
      useEffect(() => {
        //console.log('fetching exchange rates...')
        axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
          .then(rsp => {
              arrayOfObjects=rsp.data
              for (let i = 0; i < rsp.data.length; i++) {  
              let objtmp = {
                nm: rsp.data[i].name.common,
                id: i,
              }         
              object= object.concat( objtmp)
             } 
        //console.log('obj',object)
        setValobj(arrayOfObjects)
        setVal(object)
          })
      }, [])


  const handleChange = (event) => {
    setFiltra(event.target.value)
  }

  const onSearch = (id) => {
       //console.log ('chiamato',id)
       setFiltra(valobj[id].name.common)
   //return <    Dspl4 id={id} />
  }

  const flt2=val.filter(ppp => ppp.nm.toLowerCase().match(filtra.toLowerCase())!==null )
  const flt=flt2.sort((a,b)=>a.nm.localeCompare(b.nm))

  const Dspl4 = ({id}) => {
    //console.log ('chiamatodsp4',id)
  let lng3= [] 
  // lng3=valobj[2].languages

  let lng = []
  let lng2 =[]
    for (lng in valobj[id].languages){
      lng2.push(valobj[id].languages[lng])
  }  
  let nmb = Number(id)+1
    return (
     <div>
         <h1> {valobj[id].name.common} </h1>
         <h1></h1>
         <p>Capital: {valobj[id].capital} </p>
         <p>Area: {valobj[id].area} </p>
         <h1></h1>
         <p>languages: {lng2.map(ppr=><li align="center" key={ppr}>{ppr}</li>)} </p>
         
        <img src={valobj[id].flags.png} alt="bandiera"/>
        <h1></h1>
        <img className="photo" src={valobj[id].coatOfArms.png} alt="bandiera"/>
        <h1></h1>
         <button type="submit" onClick={() =>  setFiltra('')} >reset</button>
       
         <button type="submit" onClick={() =>  setFiltra(valobj[nmb].name.common)}>avanza</button>
    </div>    
   )
  }

const Dspl = () =>{
  return <span>
  { flt.length<252 & flt.length>1 ? flt.map(np=>
    <p key={np.id}>
      {np.nm}
   
      { <button type="submit" onClick={() => onSearch(np.id)} >show</button>}
  
    </p>
    )
  : flt.length===1 ? <Dspl4 id={flt[0].id}/>
  :  "... loading"}
</span>
}

  return (
    <div>
       <form onSubmit={onSearch}>
        Nation: <input  onChange={handleChange} />
       { /*<button type="submit">exchange rate</button>/**/}
      </form>
      <pre>
        {<Dspl />/**/}
      </pre>
    </div>
  )
}

export default App