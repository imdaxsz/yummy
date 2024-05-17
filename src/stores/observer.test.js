import { setCurrentObserver, observable } from './observer';

class MockComponent {
  constructor() {
    this.rendered = false;
  }

  render() {
    this.rendered = true;
  }
}

describe('observable', () => {
  it('관찰 대상 객체가 변경될 때 observers에 추가된 클래스의 render 메서드를 호출해야 한다.', () => {
    const component = new MockComponent();
    setCurrentObserver(component);

    const obj = observable({ a: 1 });
    console.log(obj.a); // get
    obj.a = 2; // set

    expect(component.rendered).toBe(true);
  });

  it('새로운 값이 이전과 동일하다면 render 메서드를 호출하지 않아야 한다.', () => {
    const component = new MockComponent();
    setCurrentObserver(component);

    const obj = observable({ a: 1 });
    console.log(obj.a); // get
    obj.a = 1; // set

    expect(component.rendered).toBe(false);
  });

  it('새로운 값이 깊은 비교로 이전과 동일하다면 render 메서드를 호출하지 않아야 한다', () => {
    const component = new MockComponent();
    setCurrentObserver(component);

    const obj = observable({ a: { b: 1 } });
    console.log(obj.a); // get
    obj.a = { b: 1 }; // set

    expect(component.rendered).toBe(false);
  });
});
