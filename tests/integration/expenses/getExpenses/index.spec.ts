import { expect } from 'chai';
import sinon from 'sinon';

describe('Example Test', () => {
  it('should return true', () => {
    const result = true;
    expect(result).to.be.true;
  });

  it('should call the function once', () => {
    const callback = sinon.spy();
    callback();
    expect(callback.calledOnce).to.be.true;
  });
});