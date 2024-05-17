/**
 * @jest-environment jsdom
 */
import Component from '@components';

describe('Component', () => {
  let component;
  let target;
  let eventElement;

  beforeEach(() => {
    target = document.createElement('div');
    eventElement = document.createElement('div');
    eventElement.classList.add('eventElement');
    target.appendChild(eventElement);
    document.body.appendChild(target);
  });

  afterEach(() => {
    document.body.removeChild(target);
  });

  it('컴포넌트가 생성되면 render 메서드가 호출되어야 한다.', () => {
    jest.spyOn(Component.prototype, 'render');

    component = new Component(target);

    expect(Component.prototype.render).toHaveBeenCalledTimes(1);

    Component.prototype.render.mockRestore();
  });

  it('setState 후 render 메서드가 호출되어야 한다.', () => {
    component = new Component(target);

    // 인스턴스의 메서드를 스파이
    const renderSpy = jest.spyOn(component, 'render');

    component.setState({ a: 1 });

    expect(renderSpy).toHaveBeenCalledTimes(1);

    renderSpy.mockRestore();
  });

  it('addEvent로 이벤트 리스너를 등록하면 해당 이벤트 발생 시 callback이 호출되어야 한다.', () => {
    component = new Component(target);

    const mockCallback = jest.fn();

    component.addEvent('click', '.eventElement', mockCallback);
    eventElement.click();

    expect(mockCallback).toHaveBeenCalled();
  });
});
