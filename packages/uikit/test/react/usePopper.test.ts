import { usePopper } from "../../src/react/components/Popper/usePopper";
import { renderHook } from "@testing-library/react-hooks";
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom'

describe("usePopper", () => {
  let elements: {
    reference: HTMLDivElement;
    popper: HTMLDivElement;
  } = {} as any;

  const setup = () => {
    return renderHook(() => usePopper(elements.reference, elements.popper));
  };

  beforeEach(() => {
    elements.reference = document.createElement("div");
    elements.popper = document.createElement("div");
  });

  it("should return state", () => {
    const setupResult = setup();
    expect(setupResult.result.current.update).toBeInstanceOf(Function);
    expect(setupResult.result.current.forceUpdate).toBeInstanceOf(Function);
    expect(setupResult.result.current.styles).toHaveAccessibleName("popper");
    expect(setupResult.result.current.attributes).toHaveAccessibleName(
      "popper"
    );
  });
});
