/**
 * @jest-environment jsdom
 */
import navigate from './navigate';

window.scrollTo = jest.fn();

describe('navigate', () => {
  let dispatchSpy;

  beforeEach(() => {
    dispatchSpy = jest.spyOn(window, 'dispatchEvent');
  });

  afterEach(() => {
    dispatchSpy.mockRestore();
    window.scrollTo.mockClear();
  });

  it('historychange 이벤트가 올바르게 생성되고 dispatchEvent가 호출되어야 한다', () => {
    const to = '/test';
    const isReplace = true;

    navigate(to, isReplace);
    expect(dispatchSpy).toHaveBeenCalled();

    const [event] = dispatchSpy.mock.calls[0]; // 가장 최근에 호출된 dispatchEvent
    expect(event.type).toEqual('historychange');
    expect(event.detail).toEqual({ to, isReplace });

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
