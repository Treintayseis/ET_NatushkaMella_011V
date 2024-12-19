import { Component, OnInit} from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private menucontroller:MenuController
  ) {}
  
  ngOnInit(): void {
  }

  mostrarMenu(){
    this.menucontroller.enable(true);
    this.menucontroller.open('first');
  }


}
