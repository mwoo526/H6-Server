import { expect } from 'chai';
import { category } from './category.model';

describe('category 모델', () => {
	let categoryName: Array<string> = [
		'테스트자유',
		'테스트연애',
		'테스트취업'
	];

	let isCategoryName: Array<string> = [
		'테스트자유',
		'테스트연애',
		'테스트취업'
	];

	let updateCategoryName: Array<string> = [
		'테스트인문',
		'테스트사회',
		'테스트예술'
	];

	it('createCategory', async () => {
		for (let i: number = 0; i < categoryName.length; i++) {
			const result: any = await category.createCategory({
				categoryName: categoryName[i]
			});
			console.log(result);
			expect(result).instanceof(Object);
		}
	})

	it('listCategory', async () => {
		const result: any = await category.listCategory();
		console.log(result);
		expect(result).instanceof(Object);
	})

	it('listCategoryByCategoryName', async () => {
		const result: any = await category.listCategoryByCategoryName(isCategoryName[0]);
		console.log(result);
		expect(result).instanceof(Object);
	})

	it('updateCategory', async () => {
		for (let i: number = 0; i < categoryName.length; i++) {
			const result: any = await category.updateCategory(categoryName[i], {categoryName: updateCategoryName[i]});
			console.log(result);
			expect(result).instanceof(Object);
		}
	})

	it('deleteCategory', async () => {
		for (let i: number = 0; i < categoryName.length; i++) {
			const result: any = await category.deleteCategory(updateCategoryName[i]);
			console.log(result);
			expect(result).instanceof(Object);
		}
	})
})