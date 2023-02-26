import { usePopper } from "../../src/react/components/Popper/usePopper";
import { renderHook } from "@testing-library/react-hooks";
// adds special assertions like toHaveTextContent
import "@testing-library/jest-dom";
// import { waitFor } from '@testing-library/react';

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

  afterEach(() => {
    elements.reference.remove()
    elements.popper.remove()
  })

  it("should return state", async () => {
    const setupResult = setup();
   
    await setupResult.waitForNextUpdate()
    expect(setupResult.result.current.update).toBeInstanceOf(Function);
    expect(setupResult.result.current.forceUpdate).toBeInstanceOf(Function);
    expect(setupResult.result.current.styles).toHaveProperty("popper");
    expect(setupResult.result.current.attributes).toHaveProperty("popper");
  });

  it("should add aria-describedBy for tooltips", async () => {
    elements.popper.setAttribute("role", "tooltip");
    elements.popper.setAttribute("id", "example123");

    const setupResult = setup();
    await setupResult.waitForNextUpdate()
    expect(elements.reference.getAttribute('aria-describedby')).toEqual('example123')

    setupResult.unmount();
    expect(elements.reference.getAttribute('aria-describedby')).not.toEqual('example123')
  });
});
