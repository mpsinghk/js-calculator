class Calculator extends HTMLElement {
  constructor() {
    super();

    // this.attachShadow({ mode: 'open' });
    // this.shadowRoot.innerHTML = ``;
    this.innerHTML = `
      <div class="calculator">
        <div class="screen">
          <div class="equation"></div>
          <div class="result"></div>
        </div>

        <div class="key highlight" data-clear>AC</div>
        <div class="key highlight" data-inverse>±</div>
        <div class="key highlight" data-percent>%</div>
        <div class="key highlight" data-operator>/</div>

        <div class="key" data-operand>7</div>
        <div class="key" data-operand>8</div>
        <div class="key" data-operand>9</div>
        <div class="key highlight" data-operator>*</div>

        <div class="key" data-operand>4</div>
        <div class="key" data-operand>5</div>
        <div class="key" data-operand>6</div>
        <div class="key highlight" data-operator>-</div>

        <div class="key" data-operand>1</div>
        <div class="key" data-operand>2</div>
        <div class="key" data-operand>3</div>
        <div class="key highlight" data-operator>+</div>

        <div class="key" data-operand>.</div>
        <div class="key" data-operand>0</div>
        <div class="key" data-delete>&#9003;</div>
        <div class="key highlight" data-equals>=</div>
      </div>
    `;

    this.equationElement = this.querySelector('.equation');
    this.resultElement = this.querySelector('.result');
    this.allClearElement = this.querySelector('[data-clear]');
    this.deleteElement = this.querySelector('[data-delete]');
    this.inverseElement = this.querySelector('[data-inverse]');
    this.percentElement = this.querySelector('[data-percent]');
    this.equalsElement = this.querySelector('[data-equals]');
    this.operandElements = this.querySelectorAll('[data-operand]');
    this.operatorElements = this.querySelectorAll('[data-operator]');

    this.allClearElement.addEventListener('click', this.clearOutput.bind(this));
    this.deleteElement.addEventListener('click', this.removeCharacter.bind(this));
    this.inverseElement.addEventListener('click', this.inverseOutput.bind(this));
    this.percentElement.addEventListener('click', this.percent.bind(this));
    this.equalsElement.addEventListener('click', this.compute.bind(this));

    this.operandElements.forEach(element => {
      element.addEventListener('click', () => {
        this.appendCharacter(element.textContent);
      });
    });

    this.operatorElements.forEach(element => {
      element.addEventListener('click', () => {
        this.appendCharacter(element.textContent);
      })
    });

    this.equation = '';
    this.result = '';
    this.isEqual = true;
  }

  clearOutput() {
    this.equation = '';
    this.result = '';
    this.equationElement.textContent = '';
    this.resultElement.textContent = '';
  }

  update(eq = this.equationElement.textContent.trim(), res = this.resultElement.textContent.trim()) {
    if (eq !== this.equationElement.textContent.trim()) {
      this.equationElement.textContent = eq;
    }

    if (res !== this.resultElement.textContent.trim()) {
      this.resultElement.textContent = '= ' + res;
    }
  }

  compute() {
    this.equation = this.equationElement.textContent.trim();
    if (!this.equationElement.textContent.trim()) {
      this.resultElement.textContent = '';
      this.update(this.equation, '');
      return;
    }

    switch (this.equation.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
        return;
    }

    // this.result = Math.round((new Function('return ' + this.equation)()) * 100) / 100;
    this.result = new Function('return ' + this.equation)();

    if (this.isEqual === true) {
      this.resultElement.textContent = '';
      this.update(this.result, '');
    } else {
      this.isEqual = true;
      this.update(this.equation, this.result);
    }
  }

  percent() {
    if (!this.equation.trim()) return;

    this.result = this.result / 100;
    this.resultElement.textContent = '';
    this.update(this.result, '');
  }

  inverseOutput() {
    if (!this.equation.trim()) return;

    this.isEqual = false;
    this.compute();
    this.result = this.result * -1;
    this.resultElement.textContent = '';
    this.update(this.result, '');
  }

  removeCharacter() {
    this.equation = this.equationElement.textContent.trim();

    if (!this.equation.trim()) return;
    this.equation = this.equation.trim().slice(0, -1);

    this.update(this.equation, this.result.toString());
  }

  appendCharacter(char) {
    let isOpeartorAtEnd = false;

    // See if the last character is an operator
    switch (this.equationElement.textContent.trim().slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
        isOpeartorAtEnd = true;
        break;
    }

    // Return, if decimal character is already icluded
    if (char === '.' && this.equationElement.textContent.includes(char)) return;

    // Don't begin with below operators
    if ((char === '+' || char === '*' || char === '/' || char === '%' || char === '0') && !this.equationElement.textContent.trim()) {
      return;
    }

    // Dont't add consecutive operators
    if ((char === '+' || char === '-' || char === '*' || char === '/' || char === '%') && isOpeartorAtEnd) {
      return;
    }

    if (char === '.' && !this.equationElement.textContent.trim()) {
      this.equation = '0.';
    } else {
      this.equation = this.equationElement.textContent + char;
    }

    this.update(this.equation, this.result);
    this.isEqual = false;
    this.compute();
  }
}

customElements.define('calculator-component', Calculator);
