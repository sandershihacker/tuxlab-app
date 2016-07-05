// Meteor Imports
	import { Meteor } from 'meteor/meteor';
	import { Mongo }       from 'meteor/mongo';
	import 'reflect-metadata';
	import 'zone.js/dist/zone';

// Angular Imports
	import { Component, ViewEncapsulation, provide } from '@angular/core';
	import { bootstrap } from 'angular2-meteor-auto-bootstrap';
	import { APP_BASE_HREF, FORM_DIRECTIVES } from '@angular/common';
	import { HTTP_PROVIDERS } from '@angular/http';
	import { InjectUser } from 'angular2-meteor-accounts-ui';

// Angular Material Imports
	import { MATERIAL_PROVIDERS, MATERIAL_DIRECTIVES } from 'ng2-material';
	import { MeteorComponent } from 'angular2-meteor';
	import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs'
	import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
	import { MdToolbar } from '@angular2-material/toolbar';

// Icon
	import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

// Define SearchView Component
	@Component({
		selector: 'tuxlab-searchview',
		templateUrl: '/client/imports/ui/components/explore/search.html',
		directives: [ MATERIAL_DIRECTIVES, 
					  MD_ICON_DIRECTIVES, 
					  MD_TABS_DIRECTIVES,
					  MD_INPUT_DIRECTIVES,
					  MdToolbar ],
		viewProviders: [ MdIconRegistry ],
		encapsulation: ViewEncapsulation.None
	})
	
// Export Explore Class 
export class SearchView extends MeteorComponent {

	courses: Array<any> = [
		{'id': 1, 'number': '15-131', 'name': 'Great Practical Ideas for Computer Scientists', 'quantity': '12'},
		{'id': 2, 'number': '15-251', 'name': 'Great Theoretical Ideas in Computer Science', 'quantity': '12'},
		{'id': 3, 'number': '15-122', 'name': 'Principles of Imperative Computation', 'quantity': '23'},
		{'id': 4, 'number': '15-112', 'name': 'Principles of Programming', 'quantity': '11'},
		{'id': 5, 'number': '15-150', 'name': 'Principles of Functional Programming', 'quantity': '14'},
		{'id': 6, 'number': '21-127', 'name': 'Concepts of Mathematics', 'quantity': '54'},
		{'id': 7, 'number': '21-299', 'name': 'Calculus in Twelve Dimensions', 'quantity': '76'},
		{'id': 8, 'number': '79-104', 'name': 'Global Histories', 'quantity': '56'},
		{'id': 9, 'number': '15-999', 'name': 'Introduction to Linux', 'quantity': '44'},
		{'id': 10, 'number': '15-998', 'name': 'Vim Usage', 'quantity': '1'},
		{'id': 11, 'number': '15-000', 'name': 'Emacs Usage', 'quantity': '2'},
		{'id': 12, 'number': '15-997', 'name': 'Bash Commands', 'quantity': '3'},
		{'id': 13, 'number': '21-241', 'name': 'Matrices and Linear Transformations', 'quantity': '4'},
		{'id': 14, 'number': '21-341', 'name': 'Matrix Theory', 'quantity': '5'},
		{'id': 15, 'number': '36-225', 'name': 'Probability Theory', 'quantity': '6'}
	];
	pagination = {
		currentPage: 1,
		itemsPerPage: 5,
		totalItems: this.courses.length
	};
	ipp: Array<number> = [5, 10, 15];
	selectedPage = 5;
	pagedCourses: Array<any> = [];
	
	constructor(mdIconRegistry: MdIconRegistry) {
		
		super();
		
		// Create Icon Font
		mdIconRegistry.registerFontClassAlias('tux', 'tuxicon');
		mdIconRegistry.setDefaultFontSetClass('tuxicon');
		
		// Refresh Courses List on load
		this.refreshCourses();
		
	}
	
	// Refresh Courses List
	refreshCourses() {
		let start = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
		let end = start + this.pagination.itemsPerPage;
		this.pagedCourses = this.courses.slice(start, end);
	}
	
	// Display the infomation of current state of pagination
	getCurrentInfo() {
		// This is the number of the first item on the current page
		let start = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage + 1;
		
		// Set the end number to be the number of the last item on the page
		// Check in case there are less than itemsPerPage items on the page
		let end = 0;
		if ((start + this.pagination.itemsPerPage - 1) > this.pagination.totalItems) {
			end = this.pagination.totalItems;
		}
		else {
			end = start + this.pagination.itemsPerPage - 1;
		}
		
		return start.toString() + "-" + end.toString() + " of " + this.pagination.totalItems.toString();
	}
	
	// Change state when number of items change in selector
	numItemsChange(newValue) {
		
		// Save old state
		let currentPage = this.pagination.currentPage;
		let itemsPerPage = this.pagination.itemsPerPage;
		
		// Get selector value
		let e = <HTMLSelectElement>document.getElementById('mySelector');
		let num = (<HTMLOptionElement>e.options[e.selectedIndex]).value;
		
		// Change bottom selector value
		let f = <HTMLSelectElement>document.getElementById('mySelector2');
		f.selectedIndex = e.selectedIndex;
		
		// Set itemsPerPage value
		let newItemsPerPage = parseInt(num, 10);
		this.pagination.itemsPerPage = newItemsPerPage;
		
		//Change page number if needed
		let lastPage = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
		if (currentPage > lastPage) {
			this.pagination.currentPage --;
		}
		
		// Refresh Course List
		this.refreshCourses();
	}
	
	// Change state when number of items change in selector (Bottom)
	numItemsChange2(newValue) {
		
		// Save old state
		let currentPage = this.pagination.currentPage;
		let itemsPerPage = this.pagination.itemsPerPage;
		
		// Get selector value
		let e = <HTMLSelectElement>document.getElementById('mySelector2');
		let num = (<HTMLOptionElement>e.options[e.selectedIndex]).value;
		
		// Change top selector value
		let f = <HTMLSelectElement>document.getElementById('mySelector');
		f.selectedIndex = e.selectedIndex; 
		
		// Set itemsPerPage value
		let newItemsPerPage = parseInt(num, 10);
		this.pagination.itemsPerPage = newItemsPerPage;
		
		//Change page number if needed
		let lastPage = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
		if (currentPage > lastPage) {
			this.pagination.currentPage --;
		}
		
		// Refresh Course List
		this.refreshCourses();
	}
	
	// Go to next page function
	nextPage() {
		
		// Get the current page
		let currentPage = this.pagination.currentPage;
		
		// Get the last possible page
		let lastPage = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
		
		// Check if the current page is the last page
		if (currentPage !== lastPage) {
			this.pagination.currentPage ++;
			this.refreshCourses();
		}
	}
	
	// Go to previous page function
	prevPage() {	
		
		// Get the current page
		let currentPage = this.pagination.currentPage;
		
		// Check if the current page is the first page
		if (currentPage !== 1) {
			this.pagination.currentPage --;
			this.refreshCourses();
		}
	}
}
