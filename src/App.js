import { useLayoutEffect, useRef, useState } from 'react';
import { store$ } from './store'
import './App.css';


function App() {
  const [state, setState] = useState({
    a: "no data",
    b: "no data",
    c: "no data",
    d: "no data"
  })
  const lastUpd = useRef(new Date(1970))
  useLayoutEffect(() => {
    store$.subscribe((v) => {
      if (new Date().getTime() - lastUpd.current.getTime() > 200) {
        const newState = {}
        for (const key in v) {
          if (v[key]) {
            if (new Date() - v[key].upd < 1500) {
              newState[key] = v[key].data
            } else {
              newState[key] = "no data"
            }
          } else {
            newState[key] = "no data"
          }
        }
        lastUpd.current = new Date()
        setState(newState)

      }
    })
  }, [])

  return (
    <div className="App">
      <div>A: <span>{state.a}</span></div>
      <div>B: <span>{state.b}</span></div>
      <div>C: <span>{state.c}</span></div>
      <div>D: <span>{state.d}</span></div>
    </div>
  );
}

export default App;
