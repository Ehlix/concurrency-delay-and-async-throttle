export const useConcurrencyDelay = () => {
  let controller: AbortController | undefined;
  return (time: number) => {
    return new Promise((resolve, reject) => {
      controller?.abort();
      controller = new AbortController();
      controller?.signal.addEventListener('abort', () => {
        reject();
      });
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
};
