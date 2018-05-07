import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    TranslateModule.forChild(),
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
