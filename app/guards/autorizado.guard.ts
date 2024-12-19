import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ColabService } from '../services/colab.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoGuard  {


  constructor(private colab:ColabService, 
              private toast: ToastController,
              private router: Router){
  }

  canActivate():
    
    | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.colab.IsLoggedIn()){
        this.showToast('Debe iniciar sesión..');
        this.router.navigateByUrl('/inicio');
        return false;
      }
      else{
        this.colab.IsLoggedIn();
        return true;    
      }
      
    }

    async showToast(msg: any){
      const toast = await this.toast.create({
        message:msg,
        duration: 3000
      });
      toast.present();
    }

}