import { name, random } from "faker";
import { remove } from "lodash/array";

const screen = document.querySelector(".content-box__item--top");

const startBtn = document.querySelector(".start-btn");

const stopBtn = document.querySelector(".stop-btn");

let humans = [];

let intervalIDs = [];

class Person {
  constructor(name = "", age = 0) {
    this._name = name;
    this._age = age;

    this.incrementAge();
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    this._age = value;
  }

  incrementAge() {
    this.age++;

    setTimeout(this.incrementAge.bind(this), 1000);
  }

  toString() {
    return `${this.name} - ${this.age}`;
  }
}

const jack = new Person("Jack", 16);

const angela = new Person("Angela", 19);

const mark = new Person("Mark", 23);

const daniel = new Person("Daniel", 29);

humans.push(jack, angela, mark, daniel);

startBtn.addEventListener("click", function () {
  startBtn.disabled = true;

  const ageIntervalID = setInterval(() => {
    screen.innerText = humans.join("\n");

    remove(humans, ({ age }) => {
      return age >= 40;
    });
  }, 1000);

  const personIntervalID = setInterval(() => {
    const randName = name.firstName();

    const randAge = random.number({
      min: 1,
      max: 50,
    });

    const newPerson = new Person(randName, randAge);

    humans.push(newPerson);
  }, 2000);

  intervalIDs.push(ageIntervalID, personIntervalID);
});

stopBtn.addEventListener("click", function () {
  humans = [];

  remove(intervalIDs, (intervalID) => {
    clearInterval(intervalID);

    return true;
  });

  startBtn.disabled = false;
});
