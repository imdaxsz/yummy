import scrollLock from './scrollLock';

describe('scrollLock', () => {
  beforeEach(() => {
    // jsdom 환경에서 window, document, navigator 객체 생성
    global.window = {
      innerWidth: 1024,
      scrollY: 100,
      scrollTo: jest.fn(),
    };

    global.document = {
      body: {
        style: {},
        clientWidth: 1000,
      },
    };

    global.navigator = {
      // 모바일 기기 userAgent
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    };
  });

  afterEach(() => {
    // window, document, navigator 객체 초기화
    delete global.window;
    delete global.document;
    delete global.navigator;
  });

  describe('모바일 환경인 경우', () => {
    it('display가 block이면 overflowY가 hidden이 되어야 한다.', () => {
      scrollLock('block');
      
      expect(document.body.style.overflowY).toBe('hidden');
    });

    it('display가 none이면 document cssText가 초기화 되어야 한다.', () => {
      scrollLock('none');

      expect(document.body.style.cssText).toBe('');
      expect(global.window.scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('PC 환경인 경우', () => {
    beforeEach(() => {
      // PC userAgent
      global.navigator.userAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36';
    });

    it('display가 block이면 body 위치가 고정되고 scroll, width 스타일을 가져야 한다.', () => {
      scrollLock('block');

      expect(document.body.style.cssText).toContain('position: fixed');
      expect(document.body.style.cssText).toContain(
        `top: -${global.window.scrollY}px`,
      );
      expect(document.body.style.cssText).toContain('overflow-y: scroll');
      expect(document.body.style.cssText).toContain('width: 100%');
    });

    it('display가 none이면 document cssText가 초기화 되어야 한다.', () => {
      scrollLock('none');

      expect(document.body.style.cssText).toBe('');
      expect(global.window.scrollTo).toHaveBeenCalledWith(
        0,
        expect.any(Number),
      );
    });
  });
});
