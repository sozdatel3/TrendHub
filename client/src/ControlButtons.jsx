import axios from 'axios';
import process from 'process';
import './css/ControlButtons.css'
const port = process.env.PORT || 4000;

function ControlButtons({ updateRepositories }) {

  const handleSync = async () => {
    
    try {
    await axios.get(`http://localhost:${port}/sync`);
    updateRepositories();
    } catch(error) {
      console.error(error);
    }
  };


  return (
    <div className="control-buttons">
      <button onClick={handleSync}>Update</button>
      <button onClick={updateRepositories}>Show all</button>
    </div>
  );
}

export default ControlButtons;