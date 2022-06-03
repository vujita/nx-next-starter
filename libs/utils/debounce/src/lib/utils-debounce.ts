export default function utilsDebounce(
  fn: (...args: unknown[]) => unknown,
  delay: number
) {
  let timeoutID: ReturnType<typeof setTimeout> | undefined;
  const cancel = () => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  };
  function debouncedFn(...args: unknown[]): void {
    cancel();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const that = this as unknown;
    timeoutID = setTimeout(() => {
      fn.apply(that, args);
    }, delay);
  }

  debouncedFn.cancel = cancel;

  return debouncedFn;
}
