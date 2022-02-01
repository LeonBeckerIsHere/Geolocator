import React, { Component} from 'react';
import { MapComponent } from './Components/Map/MapComponent';
import './App.css';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      jsonFeatureData: [],
      jsonFileName: '',
      saveDbStatus: '',
      loadDbStatus: '',
    }

    this.setJsonFileName = this
        .setJsonFileName
        .bind(this);

    this.uploadJson = this
        .uploadJson
        .bind(this);
    
    this.saveDb = this
        .saveDb
        .bind(this);

    this.loadDb = this
        .loadDb
        .bind(this)

  }
  

  setJsonFileName(event){
    this.setState({jsonFileName:event.target.result});
  }

  uploadJson(){
      const reader = new FileReader();

      reader.readAsText(document.querySelector('input').files[0]);


      reader.onload = () => {
        this.setState({jsonFeatureData:JSON.parse(reader.result)});
      }
      

  }

  saveDb(){
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.jsonFeatureData)
    };

    fetch('http://map_service/api/v1/Map/Db',requestOptions
    ).then(response => this.setState({saveDbStatus:response.status}))
  }

  loadDb(){
    var requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch('http://map_service/api/v1/Map/Db',
          requestOptions
    ).then(response => this.setState({
      loadDbStatus:response.status,
      jsonFeatureData:response.json}
    ));
  }

  render()
  {
    return (
      <div className="App">
        <div className='header'>
          <button id="upload_button" onClick={this.uploadJson}>Upload</button>
          <input id="upload" type="file" accept=".json" onChange={(event)=>this.setJsonFileName(event)}/>
        </div>
        <MapComponent 
          data={this.state.jsonFeatureData}
        />
        <div className='footer'>
          <label id="save_db_label" value={this.state.saveDbStatus}>
            <button id="save_db_button" onClick={this.saveDb}>Save DB</button>
          </label>
          <label id="load_db_label" value={this.state.loadDbStatus}>
            <button id="load_db_button" onClick={this.loadDb}>Load DB</button>
          </label>
        </div>
      </div>
    );
  }

}

export default App;
