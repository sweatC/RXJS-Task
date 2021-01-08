import { store$, changeValue } from "./store";

it("Expect new data in object on stream complete", (done) => {
  const Store = {
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

  store$.subscribe(
    (v) => {},
    (err) => {},
    (coml) => {
      try {
        expect(Store.a).toMatchObject({ data: "Testing a" });
        expect(Store.b).toMatchObject({ data: "Testing b" });
        expect(Store.c).toMatchObject({ data: "Testing c" });
        expect(Store.d).toMatchObject({ data: "Testing d" });
        done();
      } catch (error) {
        done(error);
      }
    }
  );

  changeValue("Testing a", "a", Store, store$);
  changeValue("Testing c", "c", Store, store$);
  changeValue("Testing d", "d", Store, store$);
  changeValue("Testing b", "b", Store, store$);

  store$.complete();
});
