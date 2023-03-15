import { render, screen, fireEvent } from "@testing-library/react";
import ConversorMoedas from "./conversor-moedas";
import React from "react";
import ReactDOM from "react-dom";
import axiosMock from "axios";
import "@testing-library/jest-dom/extend-expect";

describe("Teste do componente de conversão de Moeda", () => {
  it("Deve renderizar o componente sem erros", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ConversorMoedas />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("deve simular uma conversão de moedas", async () => {
    const { findByTestId, getByTestId } = render(<ConversorMoedas />);
    axiosMock.get.mockResolvedValueOnce({
      data: { success: true, rates: { BRL: 4.5664292, USD: 1.101049 } },
    });
    fireEvent.click(getByTestId("btn-converter"));
    const modal = await findByTestId("modal");
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(modal).toHaveTextcontent("1 BRL = 0.24 USD");
  });
});
