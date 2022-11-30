class Calculator extends HTMLElement {
  constructor() {
    super();
    console.log("yes");
  }
}

customElements.define('calculator-component', Calculator);
