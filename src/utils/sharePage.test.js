import Snackbar from '@components/Snackbar';
import sharePage from './sharePage';

jest.mock('@components/Snackbar');

describe('sharePage', () => {
  beforeEach(() => {
    global.navigator = {
      share: jest.fn(),
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1', // 모바일 기기 userAgent
      clipboard: {
        writeText: jest.fn(),
      },
    };

    global.window = {
      location: {
        href: 'http://test.com',
      },
      alert: jest.fn(),
    };

    global.document = {
      title: 'Test Share',
    };
  });

  afterEach(() => {
    delete global.navigator;
    delete global.window;
    delete global.document;
    Snackbar.mockClear();
  });

  it('web share api가 존재하는 모바일 환경인 경우 페이지 공유가 이루어져야 한다.', () => {
    sharePage();

    expect(global.navigator.share).toHaveBeenCalledWith({
      title: document.title,
      text: '맛집 공유 웹앱',
      url: global.window.location.href,
    });
  });

  it('모바일 환경에서 web share api를 제공하지 않는 경우 snackbar를 띄워야 한다.', () => {
    global.navigator.share = undefined;

    sharePage();

    new Snackbar({
      message: '현재 환경에서는 공유를 지원하지 않아요.',
    });

    expect(Snackbar).toHaveBeenCalled();
  });

  it('PC 환경에서 페이지 공유 시 URL을 클립보드에 복사해야 한다.', () => {
    // PC userAgent
    global.navigator.userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36';

    sharePage();

    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(
      global.window.location.href,
    );
  });
});
