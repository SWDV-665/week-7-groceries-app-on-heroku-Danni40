import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";
  screen: any;
  state: boolean = false;
  userScreenshot: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing, private screenshot: Screenshot, private platform: Platform, private sms: SMS) {

  }

  loadItems(){
    return this.dataService.getItems();
  }

  removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index);
  }

  shareItem(item, index) {
    console.log("Sharing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();

    let message = "Item: " + item.items + "\nQuantity: " + item.quantity;
    let subject = "Shared via EasyOut App"

        // Check if sharing via email is supported
    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully!");
    }).catch((error) => {
      console.error("Error while sharing", error);
      // Sharing via email is not possible
    });
  }
  // Reset function we will use to hide the screenshot preview after 1 second
  reset() {
    var self = this;
    setTimeout(function(){ 
      self.state = false;
    }, 5000);
  }

  screenShot() {
    console.log("Capturing Screen - ");
    const toast = this.toastCtrl.create({
      message: 'Capturing Screen - ',
      duration: 3000
    });
    toast.present();

    this.screenshot.save('jpg', 80, 'myscreenshot.jpg').then(res => {
      this.screen = res.filePath;
      this.state = true;
      this.reset();
    });
  }
  async saveScreenshot() {
    try{
      await this.platform.ready();

      const res = await this.screenshot.save('jpg', 80, 'screenshot');
      console.log(res);
      }
    catch(e) {
      console.error(e);
    }
  }

  async saveScreenshotGetURI() {
    try{
      await this.platform.ready();

      const res = await this.screenshot.URI(80)
      //console.log(res);

        this.userScreenshot = res.URI;
      }
    catch(e) {
      console.error(e);
    }
  }
  sendText(item){
  let text = '3147378034'
  let message = "Item: " + item.items + "\nQuantity: " + item.quantity;
  this.sms.send(text, message);
}
  editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();

    //this.inputDialogService.showPrompt(item, index);
    this.inputDialogService.openModal(item,index);
  }

  addItem() {
    console.log("Adding Item");
    //this.inputDialogService.showPrompt();
    this.inputDialogService.openModal();
  }

}
