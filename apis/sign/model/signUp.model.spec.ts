import { expect } from 'chai';
import { signUp } from './signUp.model';


describe('signUp 모델', () => {
    let testuserId: string = '이현아';
    let testuserPw: string = '12345';
    let testuserNickName: string = '서울';

    it('createUser', async () => {
        const result = await signUp.createUser({
            userId: testuserId,
            userPw: testuserPw,
            userNickName: testuserNickName
        });
      //  console.log(result);
        expect(result).to.instanceof(Object);
    });
});
