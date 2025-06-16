import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BOOKS } from '../data/book-data';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookDetailsPage implements OnInit {

  book: any;

  constructor(private route: ActivatedRoute) {
    const bookId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.book = BOOKS.find(b => b.id === bookId);
  }

  ngOnInit() {
  }

}
