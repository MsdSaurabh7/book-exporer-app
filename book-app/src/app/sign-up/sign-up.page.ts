import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, ToastController, NavController } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,IonicModule],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignUpPage implements OnInit {

  signUpForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
  ) {
   
  }

   ionViewWillEnter(){
    const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    this.navCtrl.navigateRoot('/book-list'); 
  }
}

    async onSignUp() {
    const { username, password } = this.signUpForm.value;
    const existing = localStorage.getItem(`user-${username}`);

    if (existing) {
      this.showToast('User already exists', 'danger');
      return;
    }

    const userData = { username, password };
  localStorage.setItem(`user-${username}`, JSON.stringify(userData));
    this.showToast('Sign up successful!', 'success');
    this.navCtrl.navigateForward('/home');
  }

  goToLogin() {
    this.navCtrl.navigateBack('/home');
  }

  async showToast(msg: string, color = 'warning') {
    const toast = await this.toastCtrl.create({ message: msg, duration: 2000, color });
    toast.present();
  }

  ngOnInit() {
  }

}
