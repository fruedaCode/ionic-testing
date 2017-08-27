import { NgModule } from '@angular/core';
import { CameraComponent } from './camera/camera';
import {BrowserModule} from "@angular/platform-browser";
import {CameraPreview} from "@ionic-native/camera-preview";
import {IonicModule} from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import {NavigationBar} from "@ionic-native/navigation-bar";

@NgModule({
	declarations: [CameraComponent],
	imports: [
	  BrowserModule,
    IonicModule.forRoot(CameraComponent)
  ],
	exports: [CameraComponent],
  providers: [CameraPreview, StatusBar, NavigationBar]
})
export class ComponentsModule {}
