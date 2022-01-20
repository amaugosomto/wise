
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ToastProvider } from "react-toast-notifications";

import Index from '../pages/index'

describe("index page", () => {
  it("should render login component", () => {
    render(
      <>
        <ToastProvider>
          <Index />
        </ToastProvider>
      </>
    );
    const main = screen.getByTestId("login-component")
    expect(main).toBeInTheDocument();
  });
})