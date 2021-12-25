import { Component, VERSION } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Books ' + VERSION.major;
  books = [
    { id: '5', name: 'Primary', language: 'EN', year: '1', term: '1' },
    { id: '6', name: 'Primary', language: 'EN', year: '1', term: '2' },
    { id: '7', name: 'Primary', language: 'EN', year: '2', term: '1' },
    { id: '8', name: 'Primary', language: 'EN', year: '2', term: '2' },
    { id: '9', name: 'Primary', language: 'EN', year: '3', term: '1' },
    { id: '10', name: 'Primary', language: 'EN', year: '3', term: '2' },

    { id: '11', name: 'Primary', language: 'CEB', year: '1', term: '1' },

    { id: '1', name: 'Kindergarten', language: 'EN', year: '1', term: '1' },
    { id: '2', name: 'Kindergarten', language: 'EN', year: '1', term: '2' },
    { id: '3', name: 'Kindergarten', language: 'EN', year: '2', term: '1' },
    { id: '4', name: 'Kindergarten', language: 'EN', year: '2', term: '2' },

    { id: '12', name: 'Junior', language: 'EN', year: '1', term: '1' },
    { id: '13', name: 'Junior', language: 'EN', year: '1', term: '2' },
    { id: '14', name: 'Junior', language: 'EN', year: '2', term: '1' },
    { id: '15', name: 'Junior', language: 'EN', year: '2', term: '2' },
  ];

  //bookGroupTitles = this.books.map(item => item.name + ", " + item.language);

  // book group as array of string (name+,+lang)
  bookGroupTitles = [];

  // book group as array of array (name and lang)
  bookGroupTitles2;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.bookGroupTitles = this.getBookGroups();
  }

  private getBookGroups() {
    // sort the books-list,
    // then get a list of all name + language
    // then mae the entries unique
    var titles = this.books
      .sort((a, b) => (+a.id < +b.id ? -1 : 1))
      .map((item) => item.name + ', ' + item.language)
      .filter((x, i, a) => x && a.indexOf(x) === i);

    return titles;
  }

  private getBookGroups2() {
    // sort the books-list,
    // then get a list of all name + language
    // then mae the entries unique
    var titles = this.books
      .sort((a, b) => (+a.id < +b.id ? -1 : 1))
      .map((item) => item.name + ', ' + item.language)
      .filter((x, i, a) => x && a.indexOf(x) === i);

    return titles;
  }


  private groupBooks() {
		// group identifier is name + language, example: Junior+EN
		const bookGroups = [...new Set(this.books.map(item => item.name + "," + item.language))];
		
		let groupedBooksUnsorted;
		
		// create all groups with a book-list via filter.
		// the filter must match the bookGroups-def above.
		// and the books are sorted by the id, the '+' converts the id to a number :-) 
		bookGroups.forEach(element => groupedBooksUnsorted.set(element, this.books.filter((book) => element === book.name + "," + book.language).sort((a,b) => +a.id < +b.id ? -1 : 1)));
		
		for (const [key, value] of groupedBooksUnsorted.entries()) {
  			console.log(key, value);
		}
		
		console.info("and now sorted:");
		
		// sort grouping, the '+' converts the id to a number :-)
		var groupedBooksSorted = new Map([...groupedBooksUnsorted.entries()].sort((a, b) => +a[1][0].id < +b[1][0].id ? -1 : 1));
		
		for (const [key, value] of groupedBooksSorted.entries()) {
  			console.log(key, value);
		}
		
		console.info("finished grouping.");
		
		return groupedBooksSorted;
	}

}
