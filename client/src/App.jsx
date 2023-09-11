import { useState} from 'react'
import trendLogo from './assets/logo.svg'
import './css/App.css'
import ControlButtons from './ControlButtons'
import RepositoryTable from './RepositoryTable'
import SearchBar from './SearchBar'
import Timer from './timer'
import axios from 'axios'
import process from 'process';
const port = process.env.PORT || 4000;



function App() {
  const [liveRepositories, setLiveRepositories] = useState(null)
  const [wasItOurRepo, setWasItOur] = useState('')

  const [lastSyncTime, setLastSync] = useState(0)
  
  setTimeout(() => {setLastSync(lastSyncTime + 60000)}, 60000);

  const updateRepositories = async () => {
    setWasItOur('');
    setLastSync(0);
    try {
    const allRepositories = await axios.get(`http://localhost:${port}/repositories`);
    setLiveRepositories(allRepositories.data);
    } catch (error) {
      console.error(error);
      setLiveRepositories([]);
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
      } else {
        setWasItOur('Such repository does not exist');
        setLiveRepositories([]);
      }
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
          <img src={trendLogo} className="logo" alt="React logo"/>
      </div>
      <div className='search-and-button'>
        <ControlButtons updateRepositories={updateRepositories}/>
        <h2></h2>
        <SearchBar onSearch={handlerSearch}/>
      </div>
        <h2></h2>
        <h2>{wasItOurRepo}</h2>
        <RepositoryTable liveRepositories= {liveRepositories} />
        <Timer lastSyncTime={lastSyncTime}/>
    </>
  )
}

export default App