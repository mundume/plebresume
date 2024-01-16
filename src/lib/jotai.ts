import { atom } from "jotai";

const priceAtom = atom(10);
const messageAtom = atom("hello");
const productAtom = atom({ id: 12, name: "good stuff" });

export { priceAtom, messageAtom, productAtom };
