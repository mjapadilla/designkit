type TParams<T> = {
  transform: T;
  duration?: number;
  onSuccess?: () => void;
};

const wait = (t: number) =>
  new Promise((r) => {
    setTimeout(r, t);
  });

const post = async <T>({
  transform,
  duration = 2000,
  onSuccess,
}: TParams<T>) => {
  await wait(duration);
  if (onSuccess) {
    onSuccess();
  }
  return transform;
};

const get = async <T>({
  transform,
  duration = 2000,
  onSuccess,
}: TParams<T>) => {
  await wait(duration);
  if (onSuccess) {
    onSuccess();
  }
  return transform;
};

const put = async <T>({
  transform,
  duration = 2000,
  onSuccess,
}: TParams<T>) => {
  await wait(duration);
  if (onSuccess) {
    onSuccess();
  }
  return transform;
};

const remove = async <T>({
  transform,
  duration = 2000,
  onSuccess,
}: TParams<T>) => {
  await wait(duration);
  if (onSuccess) {
    onSuccess();
  }
  return transform;
};

const patch = async <T>({
  transform,
  duration = 2000,
  onSuccess,
}: TParams<T>) => {
  await wait(duration);
  if (onSuccess) {
    onSuccess();
  }
  return transform;
};

export { post, get, put, patch, remove };
