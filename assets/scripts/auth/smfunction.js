'use strict';

let random = true;
const setMove = function () {
  let move = "";
  if(random) {
      move = "x";
      random = false;
      return move;
  }else {
    move = "o";
    random = true;
    return move;
  }
};

const check = function (arr) {
  if(arr[0] === arr[1] && arr[1] === arr[2] && arr[0] !== "") {
    if (arr[0] === "x") {
      return "Player_x win!";
    }else{
      return "Player_o win!";
    }
  }else if (arr[3] === arr[4] && arr[4] === arr[5] && arr[3] !== "") {
    if (arr[3] === "x") {
      return "Player_x win!";
    }else{
      return "Player_o win!";
    }
  }else if (arr[0] === arr[3] && arr[3] === arr[6] && arr[0] !== "") {
    if (arr[0] === "x") {
      return "Player_x win!";
    }else{
      return "Player_o win!";
    }
  }else if (arr[1] === arr[4] && arr[4] === arr[7] && arr[1] !== "") {
    if (arr[1] === "x") {
      return "Player_x win!";
    }else{
      return "Player_o win!";
    }
  }else if (arr[2] === arr[5] && arr[5] === arr[8] && arr[2] !== "") {
    if (arr[2] === "x") {
      return "Player_x win!";
    }else{
      return "Player_o win!";
    }
  }else if (arr[6] === arr[7] && arr[7] === arr[8] && arr[6] !== "") {
    if (arr[6] === "x") {
      return "Player_x win!";
    }else{
      return "Player_o win!";
    }
  }else if (arr[0] === arr[4] && arr[4] === arr[8] && arr[0] !== "") {
    if (arr[0] === "x") {
      return "Player_x win!";
    }else{
      return "Player_o win!";
    }
  }else if (arr[2] === arr[4] && arr[4] === arr[6] && arr[2] !== "") {
    if (arr[2] === "x") {
      return "Player_x win!";
    }else{
      return "Player_o win!";
    }
  }else {
    return 'opps';
  }
};

const notEmptyElement = function (element) {
  return element !== '';
};

module.exports = {
  setMove,
  check,
  notEmptyElement,
};
