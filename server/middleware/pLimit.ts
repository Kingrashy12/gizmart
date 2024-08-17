export function pLimit(concurrency: number) {
  let activeCount = 0;
  const queue: (() => void)[] = [];

  const next = () => {
    if (queue.length > 0 && activeCount < concurrency) {
      activeCount++;
      const task = queue.shift();
      task!();
    }
  };

  // const run = async <T>(fn: () => Promise<T>) => {
  //   await new Promise<void>(resolve => {
  //     queue.push(() => {
  //       fn().then(resolve);
  //     });
  //   });
  // };

  const enqueue = <T>(fn: () => Promise<T>): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const wrappedTask = () => {
        fn()
          .then(resolve)
          .catch(reject)
          .finally(() => {
            activeCount--;
            next();
          });
      };
      queue.push(wrappedTask);
      next();
    });
  };

  return enqueue;
}
