import { Button, Popper } from "@hungknow/uikit";
import { useReducer, useRef } from "react";
import clsx from "clsx";
const PLACEMENTS = ["left", "top", "right", "bottom"];

const initialSstate = {
  show: false,
  placement: null,
};

function reducer(state, [type, payload]) {
  switch (type) {
    case "placement":
      return { show: !!payload, placement: payload };
    default:
      return state;
  }
}
export const PopperSC: React.VFC = () => {
  const [{ show, placement }, dispatch] = useReducer(reducer, initialSstate);
  const triggerRef = useRef(null);
  const containerRef = useRef(null);

  const handleClick = () => {
    const nextPlacement = PLACEMENTS[PLACEMENTS.indexOf(placement) + 1];

    dispatch(["placement", nextPlacement]);
  };

  return (
    <div className="flex flex-col items-center" ref={containerRef}>
      <Button
        className="mb-4"
        id="overlay-toggle"
        ref={triggerRef}
        onClick={handleClick}
      >
        I am an Overlay target
      </Button>
      <p>Keep clicking to see the placement change.</p>

      <Popper
        show={show}
        rootClose
        offset={[0, 10]}
        placement={placement}
        container={containerRef}
        target={triggerRef}
      >
        {(props, { arrowProps, popper, show }) => (
          <div {...props} className="absolute">
            <div
              {...arrowProps}
              style={arrowProps.style}
              className={clsx(
                "absolute w-3 h-3 z-[-1]",
                "before:absolute before:rotate-45 before:bg-black before:top-0 before:left-0 before:w-3 before:h-3",
                popper.placement === "left" && "-right-1",
                popper.placement === "right" && "-left-1",
                popper.placement === "bottom" && "-top-1",
                popper.placement === "top" && "-bottom-1"
              )}
            />
            <div className="py-1 px-2 text-center rounded bg-black text-white ">
              I&rsquo;m placed to the <strong>{popper.placement}</strong>
            </div>
          </div>
        )}
      </Popper>
    </div>
  );
};
