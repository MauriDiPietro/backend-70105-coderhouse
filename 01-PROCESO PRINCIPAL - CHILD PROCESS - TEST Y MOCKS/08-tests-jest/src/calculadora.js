class Cal {
  suma(num1, num2) {
    if (this.checkValues(num1, num2)) throw new Error("Argumentos invalidos");
    return num1 + num2;
  }

  resta(num1, num2) {
    if (this.checkValues(num1, num2)) throw new Error("Argumentos invalidos");
    return num1 - num2;
  }

  checkValues(num1, num2) {
    const verif1 = isNaN(num1);
    const verif2 = isNaN(num2);
    if (verif1 || verif2) return true;
    else return false;
  }
}

const calculadora = new Cal();
export default calculadora;
