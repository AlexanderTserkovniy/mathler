# Notes for reviewers

This section could be the last one, but you might have missed it, so I want to share important notes:

- You will often see `smth === false` as opposite to `!smth` that's because I believe that we write code for people not for machines, thus, it is much easier to understand when something is `false` rather than keeping in mind that starting from this point (`!`) everything ahead is _falsy_ so that you should process things in your head rather than on machine. Also, this way you avoid such things like `!isNotAuthorized` which forces you to wake up at night with a nightmare because you might miss-coded some part due to too many negatives;
- Some constants/configs and could be done via `Symbol` in order to make it 100% unique and non-repeatable, but I believe in a simplicity, so I tend to follow `.json` and just strings with UPPERCASE names;
- Some constants are missing (like `> Enter`), because task too long and afterwards I did not want to create regression
- I am using https://commitlint.js.org/ approach for naming the commits
- Wrote reasonable amount of tests (100 :D), basically covered everything I expected to be covered
- Many TODOs because it took too long
- There not appropriate places for some pieces like too much logic in the `EquationGridCell.js` and window action handler in `KeyboardButton.js`, if it took less time I would put it to HOC

# Mathler

This is the game, it is built using JavaScript and its libraries for TakeHome of one of the company. Pretty much the same as here https://www.mathler.com/.

## The task

The user has 6 guesses to try and find the equation that equals a number.

## How to run?

1. clone this repo
2. take your terminal and write `npm install` (did not check with `yarn`, but it must work)
3. using your terminal write `npm start`
4. go to http://localhost:3000/ see the game

## Admin

In order to change equations go to `./src/config/equations.json`

Game will be using your localstorage to save everything for 3 days. You could easily manipulate with localstorage for your needs.

At some point there will be backend, so it will be managed from there.

## Built with

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Known issues

1. If something goes wrong, just clear the localstorage `localStorage.clear()`
2. DO NOT rotate your phone, body will not be covered with background
