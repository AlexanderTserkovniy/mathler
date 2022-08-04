import rulesJson from "../config/rules.json";

const validator = {
  length: (rule, str) => str.length === rule,
  operators: (rule, str) =>
    str.match(/[+*/]|\d-((?=\d)|(?=-\d))/g).length === rule,
};

/**
 *
 * @param difficulty {"normal" | "killA"} – exact difficulty
 * @param equation {string} – validated equation string
 * @returns {boolean} – if all the existing game rules are valid
 */
export const checkGameRules = (difficulty, equation) => {
  const rules = rulesJson.difficulties[difficulty];
  return Object.entries(validator).reduce((result, [ruleName, predicate]) => {
    /*
        save state of `false` because if some rule failed then next
        calculations do not matter
      */
    if (result === false) {
      return false;
    }
    result = predicate(rules[ruleName], equation);
    return result;
  }, true);
};

export default checkGameRules;
