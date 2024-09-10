export const useAsyncThrottle = () => {
  let controller: AbortController | undefined;
  return (time: number) => {
    return new Promise((resolve, reject) => {
      if (controller) {
        controller?.abort();
        controller?.signal.addEventListener('abort', () => {
          reject();
        });
      } else {
        resolve(true);
        setTimeout(() => {
          controller = undefined;
        }, time);
      }
      controller = new AbortController();
    });
  };
};
