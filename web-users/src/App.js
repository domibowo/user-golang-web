import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./component/stores/UserStore";
import loadIcon from "./shared/icons/loader";

loadIcon()
function App() {
  return (
      <div>
          <BrowserRouter>
              <UserStore/>
          </BrowserRouter>
      </div>
  );
}

export default App;
