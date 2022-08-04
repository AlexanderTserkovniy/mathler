# Notes for reviewers

This section could be the last one, but you might have missed it, so I want to share important notes:

- You will often see `smth === false` as opposite to `!smth` that's because I believe that we write code for people not for machines, thus, it is much easier to understand when something is `false` rather than keeping in mind that starting from this point (`!`) everything ahead is _falsy_ so that you should process things in your head rather than on machine. Also, this way you avoid such things like `!isNotAuthorized` which forces you to wake up at night with a nightmare because you might miss-coded some part due to too many negatives;
- Some constants/configs could be done via `Symbol` in order to make it 100% unique and non-repeatable, but I believe in a simplicity, so I tend to follow `.json` and just strings with UPPERCASE names;

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

Game will be using your localstorage to save result for a day. The next day you will be given with new task. This process will continue till the end of examples in json, then it will start from the beginning. You could easily manipulate with localstorage for your needs.

At some point there will be backend, so it will be managed from there.

## Build with

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
