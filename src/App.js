import React, {useState, useRef} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
//import {DataTable} from 'primereact/datatable';
//import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import PrimeReact from 'primereact/api';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
//import { CoinCombinationService } from './services/CoinCombinationService';


function App() {
  const [text, setText] = useState('');
  //const [coinCombination , setCoinCombination] = useState(null);
  //const datatable = useRef(null);
  const toastRef = useRef();
  //const coinCombinationService = new CoinCombinationService();
  //let coinCombination;

  // active ripple effect
  PrimeReact.ripple = true;

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (text) {
      fetch("http://localhost:8080/coinRestAPI/getCombination/"+text)
      .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            response = "Silver Dollar:" + data.silverDollar 
            + " Half Dollar: " + data.halfDollar
            + " Quarter: " + data.quarter
            + " Dime: " + data.dime
            + " Nickel: " + data.nickel
            + " Penny: " + data.penny;
            toastRef.current.show({ severity: 'info', summary: response, life: 9000 });
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }
    setText('');
  }

  return (
    <div className="App">

      <form className="p-d-flex p-jc-center p-mt-6" onSubmit={onFormSubmit}>
        <InputText value={text} onChange={(e) => setText(e.target.value)} />
        <Button type="submit" label="Submit" icon="pi pi-check" className="p-ml-2"/>
      </form>

      <Toast ref={toastRef} />

    </div>
  );
}

export default App;
