import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
 @Output() searchString = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }
  search(clientName) {
      this.searchString.emit(clientName);
  }
}
