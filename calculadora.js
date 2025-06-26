// calculadora.js

class CalculadoraBasica extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <link rel="stylesheet" href="public/css/bootstrap.min.css">
      <link rel="stylesheet" href="public/css/style.css">

      <div class="calc-container">
        <h5 class="text-center">Calculadora Básica</h5>
        <input id="num1" type="number" class="form-control" placeholder="Número 1">
        <input id="num2" type="number" class="form-control" placeholder="Número 2">
        <select id="operacion" class="form-select">
          <option value="sumar">Sumar (+)</option>
          <option value="restar">Restar (−)</option>
          <option value="multiplicar">Multiplicar (×)</option>
          <option value="dividir">Dividir (÷)</option>
        </select>
        <button id="calcularBtn" class="btn btn-primary">Calcular</button>
        <div id="mensaje"></div>
        <div id="resultado" class="resultado"></div>
      </div>
    `;

    this.n1  = shadow.getElementById('num1');
    this.n2  = shadow.getElementById('num2');
    this.op  = shadow.getElementById('operacion');
    this.btn = shadow.getElementById('calcularBtn');
    this.msg = shadow.getElementById('mensaje');
    this.out = shadow.getElementById('resultado');

    this.btn.addEventListener('click', () => this.calcular());
  }

  calcular() {
    const v1 = this.n1.value.trim();
    const v2 = this.n2.value.trim();
    this.msg.textContent = '';
    this.out.textContent = '';

    if (!v1 || !v2) {
      return this._error('Por favor ingresa ambos números.');
    }
    const x = Number(v1), y = Number(v2);
    if (isNaN(x) || isNaN(y)) {
      return this._error('Los valores deben ser numéricos.');
    }
    if (this.op.value === 'dividir' && y === 0) {
      return this._error('No se puede dividir por cero.');
    }

    let r;
    switch (this.op.value) {
      case 'sumar':       r = x + y; break;
      case 'restar':      r = x - y; break;
      case 'multiplicar': r = x * y; break;
      case 'dividir':     r = x / y; break;
    }

    this.out.textContent = `Resultado: ${r}`;
  }

  _error(txt) {
    this.msg.innerHTML = `<p class="error">${txt}</p>`;
  }
}

customElements.define('calculadora-basica', CalculadoraBasica);
