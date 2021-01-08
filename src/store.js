import { Subject } from "rxjs";

const MIN_DELAY = 200;
const MAX_DELAY = 1500;

const randomizeDelay = () =>
  Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY)) + MIN_DELAY;

export function sendData(stream$) {
  const mathRandom = randomizeDelay();
  setTimeout(() => {
    stream$.next(mathRandom);
    sendData(stream$);
  }, mathRandom);
}

export const Store = {
  a: {
    data: null,
    upd: new Date(),
  },
  b: {
    data: null,
    upd: new Date(),
  },
  c: {
    data: null,
    upd: new Date(),
  },
  d: {
    data: null,
    upd: new Date(),
  },
};

export const store$ = new Subject();

export const changeValue = (v, streamName, Store, stream$ = store$) => {
  Store[streamName] = {
    data: v,
    upd: new Date(),
  };
  if (
    Object.values(Store).filter((el) => el.data !== null).length ===
    Object.entries(Store).length
  ) {
    stream$.next({ ...Store });
  }
};

const streamA$ = new Subject();
const streamB$ = new Subject();
const streamC$ = new Subject();
const streamD$ = new Subject();
streamA$.subscribe((v) => changeValue(v, "a", Store));
streamB$.subscribe((v) => changeValue(v, "b", Store));
streamC$.subscribe((v) => changeValue(v, "c", Store));
streamD$.subscribe((v) => changeValue(v, "d", Store));

sendData(streamA$);
sendData(streamB$);
sendData(streamC$);
sendData(streamD$);
