import { Subject } from 'rxjs';

export function sendData (stream$) {
  const mathRandom = Math.floor(Math.random() * (1500 - 250)) + 250;
  setTimeout(() => {
    stream$.next(mathRandom)
    sendData(stream$)
  }, mathRandom);
}


const obj = {
  a: {
    data: Math.floor(Math.random() * (1500 - 250)) + 250,
    upd: new Date()
  },
  b: {
    data: Math.floor(Math.random() * (1500 - 250)) + 250,
    upd: new Date()
  },
  c: {
    data: Math.floor(Math.random() * (1500 - 250)) + 250,
    upd: new Date()
  },
  d: {
    data: Math.floor(Math.random() * (1500 - 250)) + 250,
    upd: new Date()
  }
}

export const store$ = new Subject()

const changeValue = (v, streamName) => {
  obj[streamName] = {
    data: v,
    upd: new Date()
  }
  store$.next({...obj})
}

const streamA$ = new Subject();
const streamB$ = new Subject();
const streamC$ = new Subject();
const streamD$ = new Subject();
streamA$.subscribe(v => changeValue(v, "a"))
streamB$.subscribe(v => changeValue(v, "b"))
streamC$.subscribe(v => changeValue(v, "c"))
streamD$.subscribe(v => changeValue(v, "d"))


sendData(streamA$)
sendData(streamB$)
sendData(streamC$)
sendData(streamD$)
