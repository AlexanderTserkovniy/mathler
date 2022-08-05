import fromArrayToActualHandlers from "./fromArrayToActualHandlers";

// ["10", "/", "4", "*", "-4"]
describe("`fromArrayToActualHandlers` function should create ", () => {
  // fromArrayToActualHandlers
  // It must be [10, handler("/"), 4, handler("*"), -4]
  // or already
  // [handler([10, "/", 4]), handler(["*", -4])] or [handler(handler([[10, "/", 4]), "*", -4])]
});
