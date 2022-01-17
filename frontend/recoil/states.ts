import { atom, useRecoilState } from "recoil";

const hairState = atom({
  key: "hairState",
  default: "/items/item_default.png",
});

const topState = atom({
  key: "topState",
  default: "/items/item_default.png",
});

const bottomState = atom({
  key: "bottomState",
  default: "/items/item_default.png",
});

export { hairState, topState, bottomState };
