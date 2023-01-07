import React, { Component } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from "../components/Display";
const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
  elder: 0,
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
  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({
        operation,
        current: 1,
        clearDisplay: true,
        elder: this.state.values[0],
      });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;
      const values = [...this.state.values];

      //display do primeiro valor
      this.setState({
        elder: values[0].toString(),
      });

      try {
        //operação
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;
      //depois da operação
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
        elder: values[0],
      });
    }
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
      console.log(values);
    }
  }
  render() {
    return (
      <div className="calculator">
        <Display antigo={this.state.elder} menor />
        <Display value={this.state.displayValue} />
        <Button label="Limpar" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
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
