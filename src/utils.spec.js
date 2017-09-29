import { updateFormStatus } from './utils';

describe('updateFormStatus', () => {
  it('should replace element by its id', () => {
    const element1 = {
      name: 'test1',
      _id: 1,
    }
    const element1Res = {
      name: 'test1',
      _id: 1,
      resolved: true,
    }
    const element2 = {
      name: 'test2',
      _id: 2,
    }
    const model = [element1, element2];
    const modelResolved = [element1Res, element2];
    expect(updateFormStatus(model, 1, element1Res)).toEqual(modelResolved);
    expect(updateFormStatus(model, 3, element1Res)).toEqual(model);
  })
});
