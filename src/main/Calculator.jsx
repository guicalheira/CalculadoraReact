import React, { Component } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from "../components/Display";
const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: " ",
  values: [0, null],
  current: 0,
  elder: null,
};
export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.addDigit = this.addDigit.bind(this);
    this.setOperation = this.setOperation.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }
  addDigit(n) {
    //impede que exista mais de 1 ponto
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }
    //retira o 0 do inicio
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? " " : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });
    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
      
    }
  }
  setOperation(operation) {
    const values = [...this.state.values];
    if (this.state.current === 0) {
      switch (operation) {
        case "+":
          operation = "+";
          break;
        case "-":
          operation = "-";
          break;
        case "x":
          operation = "x";
          break;
        case "/":
          operation = "/";
          break;
        default:
          operation = "=";
          break;
      } //operação selecionada
      this.setState({
        operation,
        current: 1,
        clearDisplay: true,
        elder: this.state.values[0] + operation,
      });
    }
    if (values[1] === null) {
      return values[0];
    } else {
      const currentOperation = this.state.operation;
      switch (currentOperation) {
        case "+":
          values[0] = values[0] + values[1];
          break;
        case "-":
          values[0] = values[0] - values[1];
          break;
        case "x":
          values[0] = values[0] * values[1];
          break;
        case "/":
          values[0] = values[0] / values[1];
          break;
        default:
          values[0] = values[0] = values[1];
          return;
      }
      //depois da operação
      this.setState({
        displayValue: values[0],
        operation: operation === "=" ? null : operation,
        current: operation !== "=" ? 1 : 0,
        clearDisplay: true,
        values,
      });

      this.setState({
        elder:
          this.state.values[0].toString() +
          this.state.operation +
          values[1].toString() +
          "=",
      });
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display elder={this.state.elder} menor />
        <Display value={this.state.displayValue} />
        <Button label="Limpar" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="x" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} equals />
      </div>
    );
  }
}
