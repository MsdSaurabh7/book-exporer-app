import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, NavController, ToastController, LoadingController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  lockClosedOutline,
  lockOpenOutline,
  mailOutline,
} from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ReactiveFormsModule,CommonModule,IonicModule,RouterModule],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit{
rememberMe = false;
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
       remember: [false]
    });
  }
  async ngOnInit(){
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      const user = JSON.parse(rememberedUser);
      this.loginForm.patchValue({
        username: user.username,
        password: user.password,
        remember: true
      });
    }
  }
   isTypePassword: boolean = true;

   async onLogin() {
    const loading = await this.loadingCtrl.create({ message: 'Logging in...' });
  await loading.present();

  setTimeout(async () => {
    await loading.dismiss();
    const { username, password, remember } = this.loginForm.value;
   const storedUser = localStorage.getItem(`user-${username}`);
    if (!storedUser) {
      this.showToast('User not found', 'danger');
      return;
    }

 const user = JSON.parse(storedUser);
  if (user.password !== password) {
    this.showToast('Incorrect password', 'danger');
    return;
  }

 if (remember) {
      localStorage.setItem('rememberedUser', JSON.stringify({ username, password }));
    } else {
      localStorage.removeItem('rememberedUser');
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInUser', username);

    this.showToast('Login successful!', 'success');
    this.navCtrl.navigateForward('/book-list');
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

  ionViewWillEnter(){
    const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    this.navCtrl.navigateRoot('/book-list'); // or home
  }
  }
  
}
