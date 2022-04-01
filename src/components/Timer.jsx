import React from 'react'
import {useContext, useState, useEffect, useRef} from 'react';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingsButton from '../settings/SettingsButton';
import SettingsContext from '../settings/SettingsContext';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';


  const workColor = '#ffffff'; //that was not even red first of all lmao
  const breakColor = '#262525';

export default function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work'); 
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

    function tick(){
      secondsLeftRef.current--;
      setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(()=>{
      function switchMode(){
        const nextMode = modeRef.current === 'work' ? 'break' : 'work'
        const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

        setMode(nextMode);
        modeRef.current = nextMode;

        
        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds

      }

      secondsLeftRef.current = settingsInfo.workMinutes * 60;
      setSecondsLeft(secondsLeftRef.current);
      
      const interval = setInterval(()=>{
        if (isPausedRef.current){
          return;
        }

        if(secondsLeftRef.current === 0){
          return switchMode();
        }

        tick();
      },1000);

      return()=> clearInterval(interval)
    },[settingsInfo]);

    const totalSeconds = mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
    const valueInMinutes = Math.round(secondsLeft / totalSeconds * 100);

    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if(seconds < 10) seconds = '0'+seconds; 
    if(minutes < 10) minutes = '0'+minutes;

    //if the mode is 'work' display 'Work time!' else display 'Break time!'
    let circularProgressbarMode = mode === 'work' ? 'Work Time!' : 'Break Time!'

  return (
    <div>
      <label>{circularProgressbarMode}</label>
      <CircularProgressbar 
        counterClockwise
        value={valueInMinutes}
        text={minutes + ':' + seconds}
        styles={buildStyles({
          textColor:'#fff',
          pathColor:mode === 'work' ? workColor : breakColor,
          trailColor: 'rgba(255,255,255, .2)',
          
        })}
      />

      <div style={{marginTop: '20px'}}>
        {isPaused
          ? <PlayButton onClick={()=> {setIsPaused(false); isPausedRef.current = false;}}/>
          : <PauseButton onClick={()=> {setIsPaused(true); isPausedRef.current = true;}}/>
        }
      </div>

      <div style={{marginTop: '20px'}}>
        <SettingsButton onClick={()=> settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  )
}


