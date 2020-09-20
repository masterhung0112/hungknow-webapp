jest.mock("next/router", () => ({
  // spread out all "Router" exports
  ...jest.requireActual("next/router"),

  // shallow merge the "default" exports with...
  default: {
    // all actual "default" exports...
    ...jest.requireActual("next/router").router,

    router: {
      basePath: "",
      pathname: "/",
      route: "/",
      asPath: "/",
      query: {},
      push: jest
        .fn()
        .mockImplementation((url) => console.log("router push url:", url)),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    },

    // and overwrite push and replace to be jest functions
    push: jest
      .fn()
      .mockImplementation((url) => console.log("router push url:", url)),
    replace: jest.fn(),
    query: {},
  },
}));

// export the mocked instance above
module.exports = jest.requireMock("next/router");
