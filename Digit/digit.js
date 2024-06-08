import style from "./styles.js";
import digitTemplate from "./template.js";


// Mapper for clock digits
const numbers = new Map([
  [1, ["bottom-right", "top-right"]],
  [2, ["top-center", "top-right", "center", "bottom-left", "bottom-center"]],
  [3, ["top-center", "top-right", "center", "bottom-right", "bottom-center"]],
  [4, ["top-left", "center", "top-right", "bottom-right"]],
  [5, ["top-center", "top-left", "center", "bottom-right", "bottom-center"]],
  [
    6,
    [
      "top-center",
      "top-left",
      "center",
      "bottom-left",
      "bottom-center",
      "bottom-right",
    ],
  ],
  [7, ["top-center", "top-right", "bottom-right"]],
  [
    8,
    [
      "top-center",
      "top-left",
      "top-right",
      "center",
      "bottom-left",
      "bottom-right",
      "bottom-center",
    ],
  ],
  [
    9,
    [
      "top-center",
      "top-left",
      "top-right",
      "center",
      "bottom-right",
      "bottom-center",
    ],
  ],
  [
    0,
    [
      "top-center",
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
      "bottom-center",
    ],
  ],
]);

class Digit extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({
      mode: "open",
    });
    shadowRoot.innerHTML = `<style>${style}</style>${digitTemplate}`;
    this._digitContainer = this.shadowRoot.querySelector("#digit-container");
  }

  connectedCallback() {
    this.number = 0;
  }

  static get observedAttributes() {
    return ["number"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.renderNumber();
    }
  }

  goForward(number) {
    this.number = number === 9 ? 0 : number + 1;
  }

  renderNumber() {
    Array.from(this._digitContainer.children).forEach((child) => {
      child.classList.add("white");
    });
    numbers.get(this.number)?.forEach((id) => {
      this._digitContainer.querySelector("#" + id).classList.remove("white");
    });
  }

  get number() {
    return parseFloat(this.getAttribute("number"));
  }
  set number(value) {
    if (this.number >= 0 && this.number <= 9) {
      this.setAttribute("number", value);
    } else {
      this.setAttribute("number", 0);
    }
  }
}

export default Digit;
