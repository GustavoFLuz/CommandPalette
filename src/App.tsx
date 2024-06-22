import { useEffect, useState } from 'react'

function App() {
  const [ip, setIp] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  useEffect(() => {
    const ip = localStorage.getItem('ip');
    if (ip) {
      setIp(ip)
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnswer('')
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [answer])

  const changeIp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIp(e.target.value)
    localStorage.setItem('ip', e.target.value)
  }

  const ping = async () => {
    const response = await fetch(`http://${ip}/ping`, {method:"GET"})
    console.log(response);
    const data = await response.json()
    console.log(data);
    setAnswer(data.message)
  }

  const mediaToggle = async () => {
    const response = await fetch(`http://${ip}/media/play`, {method:"POST"})
    const data = await response.json()
    setAnswer(data.message)
  }

  const mediaNext = async () => {
    const response = await fetch(`http://${ip}/media/next_track`, {method:"POST"})
    const data = await response.json()
    setAnswer(data.message)
  }

  const windowShow = async () => {
    const response = await fetch(`http://${ip}/open`, {method:"POST"})
    const data = await response.json()
    setAnswer(data.message)
  }

  return (
    <>
    <div><input onChange={changeIp} value={ip}></input></div>
    <div><button onClick={ping}>Test</button></div>
    <div><button onClick={mediaToggle}>Media toggle</button></div>
    <div><button onClick={mediaNext}>Media next</button></div>
    <div><button onClick={windowShow}>Window show</button></div>
    <div>{answer}</div>      
    </>
  )
}

export default App
