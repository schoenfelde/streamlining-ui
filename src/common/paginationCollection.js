/*
	author: Jacob Cukjati
	version: 1.01.01
*/


/**
* @class
* @abstract
* @classdesc When you need to get incomplete information, becasue there is to much information to get.
*/
class PaginationDS {
	//a pagination has a list of items
	//it has the currentPage
	//and the pages been to

	constructor(sizeOfPage, max) {
		this.currentPage = 1; //this is where we are now,  so it might be 130
		this.lastPage = Math.ceil(max/ ( 1.0 * sizeOfPage)); //this is where we left off, so we might be 155
		this.sizeOfPage = sizeOfPage; //this is the number per page
		this.max = max; //this is where the pagnation ends, so like 1839 entries
	}

	goToPage(num) {
		if (num > this.lastPage) {
			this.currentPage = this.lastPage;
		}
		else if (num <= 0 ) {
			this.currentPage = 1;
		}
		else {
			this.currentPage = num;
		}
	}

	atLastPage() {
		return this.currentPage === this.lastPage;
	}

	atFirstPage() {
		return this.currentPage === 1;
	}

	goToFirstPage() {
		this.currentPage = 1;
	}

	goToLastPage() {
		this.currentPage = this.lastPage;
	}

	getNext() {
		if (!this.atLastPage()) {
			this.currentPage += 1;
			this.goToPage(this.currentPage);
		}
	}

	getPrevious() {
		if (!this.atFirstPage()) {
			this.currentPage -= 1;
			this.goToPage(this.currentPage);
		}
	}
}

class PaginationCollectionDS {
	//if the items are null, that means we are getting the items for that page
	constructor(sizeOfPage, max, getPageItems) {
    this.page = new PaginationDS(sizeOfPage, max);
    this.sizeOfPage = sizeOfPage;
		this.items = {};
		this.getPageItems = getPageItems;
	}

	atLastPage() {
		return this.page.atLastPage();
	}

	atFirstPage() {
		return this.page.atFirstPage();
	}

	getNextPage() {
		this.page.getNext();
		return this.getCurrentPageItems();
	}

	getPreviousPage() {
		this.page.getPrevious();
		return this.getCurrentPageItems();
	}

	goToFirstPage() {
		if (!this.atFirstPage()) {
			this.page.goToFirstPage();
		}
		return this.getCurrentPageItems();
	}

	goToLastPage() {
		if (!this.atLastPage()) {
			this.page.goToLastPage();
		}
		return this.getCurrentPageItems();
	}

	getCurrentPageItems() {
		let currentPage = this.page.currentPage;
		let items = this.items[Number(currentPage)];
		if (items === undefined) {
      this.items[Number(currentPage)] = null;
			return this.getPageItems(this.sizeOfPage).then(pageItems => {
				this.items[Number(currentPage)] = pageItems;
				return pageItems;
			});
		}
		else {
			return new Promise(function(resolve, reject) {
				resolve(items);
			});
		}
	}

	currentNumberOfPagesImmediately() {
		let count = 0;
		for(let key in this.items) {
			let i = this.items[Number(key)];
			if (i && i !== null) {
				count++;
			}
		}
		return count;
	}

	numberOfPagesWaiting() {
		let count = 0;
		for(let key in this.items) {
			let i = this.items[Number(key)];
			if (i === null) {
				count++;
			}
		}
		return count;
	}

	loadNext(numOfPages) {
		let listOfPromises = [];
		if (numOfPages <= 0) {
			return;
		}
		let lastPage = -1;
		for(let key in this.items) {
			lastPage = Math.max(key, lastPage);
		}
		for(let i = 1; numOfPages > 0; numOfPages--) {
			if (this.atLastPage()) {
				return;
			}
			let pageToLoad = lastPage + i
			// console.log({lastPage, i, pageToLoad, numOfPages})
			listOfPromises.push(this.goToPage(pageToLoad));
			i++
		}
		return listOfPromises;
	}

	goToPage(num) {
		this.page.goToPage(num);
		return this.getCurrentPageItems();
	}

	hasPage(num) {
		let itemOnPage = this.items[num];
		let hasIt = itemOnPage === undefined ? false : (itemOnPage === null || itemOnPage.length >= 0);
		return hasIt;
	}

	/*
	*	stops at the pageNum, does not go any higher than that
	*/
	getAllItemsThrough(pageNum) {
		let keys = [];
		for(let key in this.items) {
			if (key <= pageNum) {
				keys.push(Number(key));
			}
		}
		return this._getItemsInKeys(keys);
	}

	getAllItems() {
		let keys = [];
		for(let key of Object.keys(this.items)) {
			keys.push(Number(key));
		}
		return this._getItemsInKeys(keys);
	}

	_getItemsInKeys(keys) {
		let all = [];
		let sorted = keys.sort((a,b) =>  a - b);
		for(let key of sorted) {
			let i = this.items[key];
			if (i === null || i === undefined) {
				continue;
			}
			else {
				all.push.apply(all, i);
			}
		}
		return all;
	}
}

exports.Pagination = PaginationDS;
exports.PaginationCollection = PaginationCollectionDS;


