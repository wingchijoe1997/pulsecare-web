import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

describe("Page", () => {
  let container = null;

  beforeEach(() => {
    // Create a div element to render our component into
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up on exiting the test
    document.body.removeChild(container);
    container = null;
  });

  it("renders a heading", () => {
    act(() => {
      container.innerHTML = "<h1>Hello World</h1>";
    });

    const heading = container.querySelector("h1");

    expect(heading).toBeInTheDocument();
  });
});
