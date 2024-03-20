const button = {
  '.btn': {
    '@apply px-3 py-1': {},
    '@apply font-medium text-primary-500': {},
    '@apply text-base tracking-wide': {},
    '@apply focus:!ring focus:!ring-blue-500': {},
    '@apply rounded': {},
    '@apply transition duration-300 ease-in-out': {},
  },
  '.btn.disabled': {
    '@apply !bg-interface-disabled !cursor-not-allowed': {},
    '@apply !text-disabled hover:!bg-interface-disabled': {},
  },
  '.btn.loading': {
    '@apply ring ring-blue-500': {},
  },
  // SIZE
  '.btn.small': {
    '@apply text-xs': {},
    height: '1.625rem',
  },
  '.btn.medium': {
    '@apply h-9 text-sm': {},
  },
  '.btn.large': {
    '@apply text-base': {},
    height: '3.125rem',
  },
  // COLOR
  '.btn.brand': {
    '@apply bg-brand text-white-50': {},
    '@apply hover:bg-brand-hovered focus:bg-brand-pressed': {},
  },
  '.btn.info': {
    '@apply bg-info text-white-50': {},
    '@apply hover:bg-info-hovered focus:bg-info-pressed': {},
  },
  '.btn.success': {
    '@apply bg-success text-white-50': {},
    '@apply hover:bg-success-hovered focus:bg-success-pressed': {},
  },
  '.btn.warning': {
    '@apply bg-warning text-white-50': {},
    '@apply hover:bg-warning-hovered focus:bg-warning-pressed': {},
  },
  '.btn.danger': {
    '@apply bg-danger text-white-50': {},
    '@apply hover:bg-danger-hovered focus:bg-danger-pressed': {},
  },
  '.btn.light': {
    '@apply bg-interface-subtle text': {},
    '@apply ring-white-300 ring-1 hover:shadow': {},
    '@apply hover:bg-interface-hovered focus:bg-interface-pressed': {},
  },
  '.btn.dark': {
    '@apply bg-inverse text-white-50': {},
    '@apply hover:bg-inverse-hovered focus:bg-inverse-pressed': {},
  },
  '.btn.brand-outline': {
    '@apply bg-brand-subtle text-on-brand-subtle': {},
    '@apply ring-1 ring-primary-400': {},
    '@apply hover:bg-brand-hovered-subtle focus:bg-brand-pressed-subtle': {},
  },
  '.btn.info-outline': {
    '@apply bg-info-subtle text-on-info-subtle': {},
    '@apply ring-1 ring-blue-400': {},
    '@apply hover:bg-info-hovered-subtle focus:bg-info-pressed-subtle': {},
  },
  '.btn.success-outline': {
    '@apply bg-success-subtle text-on-success-subtle': {},
    '@apply ring-1 ring-green-400': {},
    '@apply hover:bg-success-hovered-subtle focus:bg-success-pressed-subtle':
      {},
  },
  '.btn.warning-outline': {
    '@apply bg-warning-subtle text-on-warning-subtle': {},
    '@apply ring-1 ring-orange-400': {},
    '@apply hover:bg-warning-hovered-subtle focus:bg-warning-pressed-subtle':
      {},
  },
  '.btn.danger-outline': {
    '@apply bg-danger-subtle text-on-danger-subtle': {},
    '@apply ring-1 ring-red-400': {},
    '@apply hover:bg-danger-hovered-subtle focus:bg-danger-pressed-subtle': {},
  },
  // FOCUS
  'btn.brand-focus': {
    '@apply bg-brand-pressed text-white-50': {},
  },
  'btn.info-focus': {
    '@apply bg-info-pressed text-white-50': {},
  },
  'btn.success-focus': {
    '@apply bg-success-pressed text-white-50': {},
  },
  'btn.warning-focus': {
    '@apply bg-warning-pressed text-white-50': {},
  },
  'btn.danger-focus': {
    '@apply bg-danger-pressed text-white-50': {},
  },
  'btn.light-focus': {
    '@apply bg-interface-hovered': {},
  },
  'btn.dark-focus': {
    '@apply bg-inverse-pressed text-white-50': {},
  },
  '.btn.brand-outline-focus': {
    '@apply bg-brand-pressed-subtle text-on-brand-subtle': {},
  },
  '.btn.info-outline-focus': {
    '@apply bg-info-pressed-subtle text-on-info-subtle': {},
  },
  '.btn.success-outline-focus': {
    '@apply bg-success-pressed-subtle text-on-success-subtle': {},
  },
  '.btn.warning-outline-focus': {
    '@apply bg-warning-pressed-subtle text-on-warning-subtle': {},
  },
  '.btn.danger-outline-focus': {
    '@apply bg-danger-pressed-subtle text-on-danger-subtle': {},
  },
};

export default button;
