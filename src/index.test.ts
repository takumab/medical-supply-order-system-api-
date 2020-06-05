import { sayHello } from './index';

describe('sayHello', () => {
  test('should return hello', () => {
    expect(sayHello()).toBe('hello');
  });
});
