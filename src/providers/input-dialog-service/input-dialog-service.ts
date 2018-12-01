//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ModalController, Select, ItemSliding } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';


/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {
  //modalPage;

//constructor(public http: HttpClient) {
  constructor(public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public modalCtrl : ModalController) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt(item?, index?) {
    if(index !== undefined) {
      var id = item._id;
    }

    const prompt = this.alertCtrl.create({
      title: item ? 'Please Edit Item': 'Add item',
      message: item ? "Please edit item..." : 'Please enter item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item ? item.quantity : null,
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
          text: 'Save',
          handler: item => {
            if(index !== undefined){
              console.log("Processing...");
              this.dataService.editItem(item, id, index);
            }else{
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });
    prompt.present();
  }

/*


  public openModal(item?, index?){
    console.log('open');
    var data = { 
        modalTitle : item ? 'Edit Item' : 'Enter Item Details',
        modalMessage : item ?  "Please edit information..." : "Please enter information..", 
        name : item ? item.name : null, 
        quantity : item ? item.quantity : null,  
        _id : item ? item._id : null,
      };
    this.modalPage = this.modalCtrl.create('ModalPage',data); 
    this.modalPage.onDidDismiss(returnedDataFromModal =>{
      if(returnedDataFromModal!=undefined){ //Save data
        if(index != undefined){
          this.dataService.editItem(returnedDataFromModal,index);
        }else{
          this.dataService.addItem(item);
        }
      }
    });
    this.modalPage.present();
  }

*/
}
