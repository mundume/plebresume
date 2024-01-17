import { atom } from "jotai";

const priceAtom = atom(10);
const messageAtom = atom("hello");
const productAtom = atom({ id: 12, name: "good stuff" });
const discount = atom((get) => get(priceAtom) * 0.9);

const readOnlyAtom = atom((get) => get(priceAtom) * 5);
const writeOnlyAtom = atom(null, (get, set, update: number) => {
  set(priceAtom, get(priceAtom) + update);
});

const readAndWriteAtom = atom(
  (get) => get(priceAtom) * 5,
  (get, set, newPrice: number) => {
    set(priceAtom, newPrice / 2);
  }
);

export {
  priceAtom,
  messageAtom,
  productAtom,
  writeOnlyAtom,
  readOnlyAtom,
  readAndWriteAtom,
};
