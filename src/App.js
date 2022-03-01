import React from 'react';
// import logo from './logo.svg';
import covid19_response_icon from './assets/logo/covid19_response_icon.svg'
import './App.css';
import Comp from './components/index'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <div className="App">

      {/* <div className='logoSec'>
        <span><img src={covid19_response_icon} className={'App-logo'}></img></span>
        <span><h3 className={'headerSec'}><b>Covid-19</b></h3></span>
      </div> */}
      <Comp />
      {/* <footer>
      <label className='footer-desc'>User-Details-App v1.0</label>
        <label className='footer'>&copy; Rohith</label>
      </footer> */}
    </div>
  );
}

export default App;
