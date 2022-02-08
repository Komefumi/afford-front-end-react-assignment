import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationPage from "../index";

describe("Registration Page", () => {
  it("Should record input from user", () => {
    render(<RegistrationPage />);
    const inputElementNames = ["firstName", "lastName", "email", "password", "passwordRepeat"];
    const firstNameInput = screen.getByRole("input", { name: "firstName" })
    const testValue = "test"
    // fireEvent(firstNameInput, { target: { value: testValue } });
    //
  })
})
