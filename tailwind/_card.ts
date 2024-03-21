const card = {
  '.card': {
    '@apply bg-white-50 rounded border border-neutral-200 p-4 shadow-md': {},
    '&.card-primary': {
      '@apply bg-primary-50': {},
      '@apply border border-primary-500': {},
    },
    '&.card-warning': {
      '@apply bg-orange-50': {},
      '@apply border border-orange-500': {},
    },
    '&.card-info': {
      '@apply bg-blue-50': {},
      '@apply border border-blue-500': {},
    },
    '&.card-success': {
      '@apply bg-green-50': {},
      '@apply border border-green-500': {},
    },
    '&.card-light': {
      '@apply bg-white-50': {},
      '@apply border border-white-200': {},
    },
  },
  '.card-none': {
    all: 'inherit',
  },
  '.card-title': {
    '@apply text-base font-semibold text-zinc-800': {},
  },
  '.card-description': {
    '@apply text-sm font-normal text-gray-500': {},
  },
};

export default card;
