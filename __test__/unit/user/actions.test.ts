import { originalUserData, newAdress } from '__test__/mocks/user';
import { updateUserAdress } from 'src/core/usecases/user/user-action';
import { expect, test } from 'vitest';

test('updateUserAdress updates the adress and hasMinimalAdress properties of the userData object', () => {
    const result = updateUserAdress(originalUserData, newAdress.adress);
    const expectedResult = {
        adress: newAdress.adress,
        hasMinimalAdress: true,
    };
    expect(result).toEqual(expectedResult);
});
