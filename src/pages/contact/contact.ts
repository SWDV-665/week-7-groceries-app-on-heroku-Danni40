import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }
  sharePage() {
    console.log("Share Page");
    this.showSharePagePrompt();
  }

  showSharePagePrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Share Page',
      message: "Please enter details",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: item => {
            console.log('Page sent', item);
          }
        }
      ]
    });
    prompt.present();
  }
}
