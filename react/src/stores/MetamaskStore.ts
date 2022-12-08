import { createStore } from "@udecode/zustood";

const metamaskStore = createStore("metamask")({
  provider: undefined,
});

export default metamaskStore;
