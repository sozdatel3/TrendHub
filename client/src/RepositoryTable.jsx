import './css/RepositoryTable.css'
import PropTypes from 'prop-types';
RepositoryTable.propTypes = {
    liveRepositories: PropTypes.object.isRequired,
  };

function RepositoryTable(liveRepositories) {

    if(liveRepositories == null || liveRepositories.liveRepositories == null || liveRepositories.liveRepositories.length == 0)
    return <h2> The server has taken offense and is not providing any responses, or such a repository simply does not exist </h2>
    
    const dataFormatter = (repository, header) => {
        if(repository[header] == true)
            return 'true';
        if(repository[header] == false)
            return 'false';
        if(repository[header] == null)
            return 'none';
        if(header == 'createdAt' || header == 'updatedAt') {
            const curDate = new Date(repository[header]);
            const options = { 
                year: "2-digit", 
                month: "2-digit", 
                day: "2-digit", 
                hour: "2-digit", 
                minute: "2-digit", 
                second: "2-digit" 
              };
              return curDate.toLocaleDateString("ru-RU", options);
        }
        if(header.endsWith('url') && repository[header]) {
            return <a href= {repository[header]} target="_blank" rel="noreferrer"> {repository[header]}</a>;
        }
        return repository[header];
    }

    const headers = Object.keys(liveRepositories.liveRepositories[0]);
    const headersWithNumber = ['№', ...headers];
    return (
        <div className="repository-table">
          <table>
            <thead>
              <tr>
                {headersWithNumber.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {liveRepositories.liveRepositories.map((repository, rowIndex) => (
                <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                  {headers.map((header, colIndex) => (
                    <td key={colIndex}>{dataFormatter(repository, header)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
  
  export default RepositoryTable;