export const storage = {
  get: <T>(key: string = '', value: object | string | undefined = {}) => {
    const x = JSON.parse(sessionStorage.getItem(key) as string) || value;
    return x as T;
  },
  set: (key: string = '', value: string | object = {}) => {
    const newValue = JSON.stringify(value);
    sessionStorage.setItem(key, newValue);
  },
  remove: (key: string = '') => {
    sessionStorage.removeItem(key);
  },
  clear: () => {
    sessionStorage.clear();
  },
};
