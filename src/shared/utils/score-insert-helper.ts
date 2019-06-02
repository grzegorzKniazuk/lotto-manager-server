import * as fs from "fs";

const htmlFile = fs.readFileSync('html.html').toString('utf8');

const dateOutputArray = htmlFile.match(/\d{2}.\d{2}.\d{4}/gim);
const numbersOutputArray = htmlFile.match(/<td>.+\+/gim);
const bonusNumbersOutputArray = htmlFile.match(/<b>\d+/gim);

const dateArray = dateOutputArray.map((date: string) => {
	const year = date.match(/\d{4}/);
	const day = date.match(/\d{2}/);
	const month = date.match(/.\d{2}/)[0].substring(1);

	return `${year}-${month}-${day}`;
});

const bonusNumbersArray = bonusNumbersOutputArray.map((bonusNumber: string) => {
	return +bonusNumber.substring(4);
});

const numbersArray = numbersOutputArray.map((numbers) => {
	numbers = numbers.substring(4, 18);
	return numbers.split(' ');
});

const preparedValues = [];

for (let i = 0; i < dateArray.length; i++) {
	const numbers = numbersArray[i].map((number: string) => +number);

	preparedValues.push({
		date: dateArray[i],
		numbers: numbers.join(','),
		bonus_number: bonusNumbersArray[i],
	});
}
// console.log(preparedValues);

try {
	// return await this.scoreRepository.insert(preparedValues)
} catch (e) {
	console.log(e);
}
