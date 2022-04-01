import { useState } from "react";
import Timer from './components/Timer';
import Settings from "./settings/Settings";
import SettingsContext from './settings/SettingsContext';
import './styles/App.css'

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  return (
    <main>
      <SettingsContext.Provider value ={{
        showSettings,
        setShowSettings,
        workMinutes,
        setWorkMinutes,
        breakMinutes,
        setBreakMinutes,
      }}>
          {showSettings ? <Settings /> : <Timer />}
        </SettingsContext.Provider>    
    </main>

    
  );
}

export default App;
