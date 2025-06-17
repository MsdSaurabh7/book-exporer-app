import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar ,NavController} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { BOOKS } from '../data/book-data';
import { RouterModule } from '@angular/router';

import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.page.html',
  styleUrls: ['./book-list.page.scss'],
  standalone: true,
  imports: [ CommonModule,IonicModule,RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookListPage implements OnInit {

books = BOOKS;
  filteredBooks = BOOKS;

  searchTerm: string = '';

  constructor(private navCtrl: NavController,) {
    addIcons({ logOutOutline });
  }
  ngOnInit(){
    const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn !== 'true') {
    this.navCtrl.navigateRoot('/home'); 
  }
  }

  onSearch(event: any) {
    const val = event.detail.value.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(val) ||
      book.author.toLowerCase().includes(val)
    );
  }

  async logout() {
   localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('loggedInUser');
  this.navCtrl.navigateRoot('/home');
}

}
