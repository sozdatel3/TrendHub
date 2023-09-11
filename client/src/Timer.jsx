import './css/timer.css'
  
function Timer({ lastSyncTime}) {
  
  return (
    <div className='Timer'>
      <h2>Time from last update: {Math.floor(lastSyncTime/60000)} min</h2>
    </div>
  );
}

export default Timer;