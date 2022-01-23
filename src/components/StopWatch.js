import React, { useEffect, useState } from "react"
import "./StopWatch.css"
import Timer from "./Timer"

function StopWatch({ startTimer, pauseTimer }) {
  const [isActive, setIsActive] = useState(startTimer)
  const [isPaused, setIsPaused] = useState(pauseTimer)
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (startTimer === true) handleStart()
    else setIsPaused(true)
  }, [startTimer])

  useEffect(() => {
    let interval = null

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isActive, isPaused])

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  /* const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    setIsActive(false)
    setTime(0)
  } */

  return (
    <>
      <Timer time={time} />
    </>
  )
}

export default StopWatch
