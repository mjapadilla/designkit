const pageLayout = {
  '.page-outer-layout': {
    '@apply flex h-full w-full flex-col md:overflow-hidden': {},
  },
  '.page-inner-layout': {
    '@apply flex w-full flex-1 flex-col items-center justify-start py-3 md:overflow-y-auto':
      {},
  },
  '.page-layout': {
    '@apply container -m-3 flex w-full flex-1 flex-col space-y-4 p-5': {},
  },
  '.with-scroll': {
    '@apply md:overflow-hidden': {},
  },
};

export default pageLayout;
