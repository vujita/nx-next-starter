import debounce from './utils-debounce';

describe('debounce', () => {
  let fn: jest.Mock;
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    fn = jest.fn();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  it('should not call until time has lapsed', () => {
    const debouncedFn = debounce(fn, 5000);
    debouncedFn();
    debouncedFn();
    debouncedFn();
    debouncedFn();
    expect(fn).not.toBeCalled();
    debouncedFn.cancel();
    jest.advanceTimersByTime(6000);
    debouncedFn();
    debouncedFn();
    debouncedFn();
    expect(fn).not.toBeCalled();
  });
  it('should only call once within window', () => {
    const debouncedFn = debounce(fn, 5000);
    debouncedFn();
    debouncedFn();
    debouncedFn();
    expect(fn).not.toBeCalled();
    jest.advanceTimersByTime(6000);
    expect(fn).toBeCalled();
    jest.advanceTimersByTime(6000);
    expect(fn).toBeCalled();
  });
});
