import { expect } from 'chai';
import { signIn } from './signIn.model';

describe('signIn 모델', () => {
    let testuserId: string = '이현아';
    let testuserPw: string = '12345';
    let testuserNickName: string = '서울';

    it('getUser', async () => {
        const result = await signIn.getUser({
            userId: testuserId,
            userPw: testuserPw,
            userNickName: testuserNickName
        });
        console.log(result);
        expect(result).to.instanceof(Object);
    });
});

