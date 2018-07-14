import * as pbkdf2 from 'pbkdf2';

/** salt 값 */
let salt = 'H6-server';

/** 암호화 횟수 */
let iterations = 5;

/** 암호화 길이 */
let keyLength = 16;

/** 암호화 방식 */
let digest = 'sha512';

class EncryptionPw {
	getHash(pwd): string {
		let derivedKey = pbkdf2.pbkdf2Sync(pwd, salt, iterations, keyLength, digest);
		return derivedKey.toString('hex');
	}
}

export const encriptionPw: EncryptionPw = new EncryptionPw();