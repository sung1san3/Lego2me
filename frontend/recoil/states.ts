import { atom, useRecoilState } from "recoil";

const hairState = atom({
  key: "hairState",
  default: "/items/default.png",
});

const topState = atom({
  key: "topState",
  default: "/items/default.png",
});

const bottomState = atom({
  key: "bottomState",
  default: "/items/default.png",
});

export { hairState, topState, bottomState };
