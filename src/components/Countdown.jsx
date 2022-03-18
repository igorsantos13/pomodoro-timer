import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
export default function Countdown() {
  const DEFAULT_VALUE_IN_SECONDS = 0.1 * 60
  //set the inition values for the timer
  const [seconds, setSeconds] = useState(DEFAULT_VALUE_IN_SECONDS)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(()=>{

    //Timer is done!
    if (seconds === 0){
      alert('gg!')
      return;
    }
    //countdown logic
      const timer = seconds !== 0 && setInterval(()=> setSeconds(state => state -1), 1000)
      return () => clearInterval(timer) //clears the timer
  }, [seconds])

  const minutes = Math.floor(seconds / 60)
  const second = seconds % 60;

  return (
    <div className='Pomodoro-timer'>
      <span>{String(minutes).padStart(2, '0')}</span>
      <span>:</span>
      <span>{String(second).padStart(2, '0')}</span>

      {/* add a button to start running the timer */}
      {/* essa bagaça vai virar um pomodoro sim :) */}
      <div className="start-timer">
        <button>Start Timer</button>
      </div>
    </div>
  )
}




