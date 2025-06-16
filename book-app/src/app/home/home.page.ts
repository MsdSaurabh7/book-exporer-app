import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, NavController, ToastController, LoadingController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  lockClosedOutline,
  lockOpenOutline,
  mailOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ReactiveFormsModule,CommonModule,IonicModule],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {

  loginForm!: FormGroup;
  constructor(
     private fb: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    addIcons({ mailOutline, lockClosedOutline, lockOpenOutline });
     this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
   isTypePassword: boolean = true;

   async onLogin() {
    const loading = await this.loadingCtrl.create({ message: 'Logging in...' });
  await loading.present();

  setTimeout(async () => {
    await loading.dismiss();
    const { username, password } = this.loginForm.value;

    if (this.loginForm.invalid) {
      this.showToast('Please enter valid credentials.');
      return;
    }

    if (username === 'user' && password === 'pass123') {
      this.showToast('Login successful!', 'success');
     this.navCtrl.navigateForward('/book-list');

    } else {
      this.showToast('Invalid username or password.', 'danger');
    }
  }, 1500);
    
  }

  async showToast(message: string, color: string = 'warning') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}
