class Calculator extends HTMLElement {
  constructor() {
    super();

    // this.attachShadow({ mode: 'open' });
    // this.shadowRoot.innerHTML = ``;
    this.innerHTML = `
      <div class="calculator">
        <div class="screen">
          <div class="equation">
            12345 + 6789 - 1234567 &divide; 8912 * 56
          </div>
          <div class="result">= 34872934829</div>
        </div>

        <div class="key operator" data-operator="AC">AC</div>
        <div class="key operator" data-operator="&plusmn;">&plusmn;</div>
        <div class="key operator" data-operator="&percnt;">&percnt;</div>
        <div class="key operator" data-operator="&divide;">&divide;</div>

        <div class="key" data-number="7">7</div>
        <div class="key" data-number="8">8</div>
        <div class="key" data-number="9">9</div>
        <div class="key operator" data-operator="&times;">&times;</div>

        <div class="key" data-number="4">4</div>
        <div class="key" data-number="5">5</div>
        <div class="key" data-number="6">6</div>
        <div class="key operator" data-operator="&minus;">&minus;</div>

        <div class="key" data-number="1">1</div>
        <div class="key" data-number="2">2</div>
        <div class="key" data-number="3">3</div>
        <div class="key operator" data-operator="&plus;">&plus;</div>

        <div class="key" data-number=".">.</div>
        <div class="key" data-number="0">0</div>
        <div class="key" data-operator="&#9003;">&#9003;</div>
        <div class="key operator" data-operator="&equals;">&equals;</div>
      </div>
    `;
  }

  connectedCallback() {
    this.equation = this.querySelector('.equation');
    this.result = this.querySelector('.result');
    this.keys = this.querySelectorAll('[data-number]');
    this.operators = this.querySelectorAll('[data-operator]');


    console.log(this.equation, this.result);
    console.log(this.keys, this.operators);
  }


}

customElements.define('calculator-component', Calculator);
