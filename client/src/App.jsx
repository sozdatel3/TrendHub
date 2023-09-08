import { useState } from 'react'
import trendLogo from './assets/logo.svg'
import './css/App.css'
import ControlButtons from './ControlButtons'
import RepositoryTable from './RepositoryTable'
import SearchBar from './SearchBar'
import axios from 'axios'
import process from 'process';
const port = process.env.PORT || 4000;

// async function getLastSync() {
//   try {
//   const response = await axios.get(`http://localhost:${port}/last-update`)
//   const currentTime = new Date();
//   return (currentTime - Date(response.data))
//   } catch(error) {
//     console.error(error, 'TimerErr');
//     return new Date();
//   }
// }

function App() {
  const [liveRepositories, setLiveRepositories] = useState(null)
  const [wasItOurRepo, setWasItOur] = useState('')
  // const [lastSyncTime, setLastSync] = useState(getLastSync())
  
  // const updateTimer = (newTime) => {
  //   setLastSync(newTime);
  // }
  
  const updateRepositories = async () => {
    // updateTimer(0);
    setWasItOur('');
    try {
    const allRepositories = await axios.get(`http://localhost:${port}/repositories`);

    setLiveRepositories(allRepositories.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handlerSearch = async (onSearch) => {
    if(onSearch == '') {
      setWasItOur('');
      updateRepositories();
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:${port}/repositories/${onSearch}`)
      
      if(response.data.message != undefined) {
        setWasItOur(response.data.message);
        delete response.data.message
      }
      if(response.data.newRepo){
        setLiveRepositories(response.data.newRepo);
      }
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
          <img src={trendLogo} className="logo" alt="React logo" />
      </div>
      {/* <Timer updateTimer= {lastSyncTime}/> */}
      <div className='search-and-button'>
        <ControlButtons updateRepositories={updateRepositories}/>
        <h2></h2>
        <SearchBar onSearch={handlerSearch}/>
      </div>
        <h2></h2>
        <label>{wasItOurRepo}</label>
        <RepositoryTable liveRepositories= {liveRepositories} />
    </>
  )
}


export default App
