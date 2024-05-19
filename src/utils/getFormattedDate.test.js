import getFormattedDate from './getFormattedDate';

describe('getFormattedDate', () => {
  it('timestamp 1713277438261는 문자열 "2024.04.16"로 변환되어야 한다.', () => {
    expect(getFormattedDate(1713277438261)).toBe('2024.04.16');
  });

  it('timestamp 1713883890265는 문자열 "2024.04.23"로 변환되어야 한다.', () => {
    expect(getFormattedDate(1713883890265)).toBe('2024.04.23');
  });
});
