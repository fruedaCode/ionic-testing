import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {CameraPreview} from "@ionic-native/camera-preview";
import { StatusBar } from '@ionic-native/status-bar';
import {NavigationBar} from '@ionic-native/navigation-bar';

/**
 * Generated class for the CameraComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'camera',
  templateUrl: 'camera.html'
})
export class CameraComponent {

  @ViewChild('canvasNode') canvasNode: ElementRef;
  @ViewChild('imgResult') imgResult: ElementRef;

  constructor(private cameraPreview: CameraPreview,
              private renderer: Renderer2,
              private statusBar: StatusBar,
              private navigationBar: NavigationBar ) {

    statusBar.hide();
    navigationBar.hideNavigationBar();

    let options = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: cameraPreview.CAMERA_DIRECTION.BACK,
      toBack: true,
      tapPhoto: true,
      tapFocus: false,
      previewDrag: false
    };

// start camera
    this.cameraPreview.startCamera(options).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
  }

  takePicture() {
    this.cameraPreview.takePicture({width:1080, height:1920}).then((base64Image) => {
      let img = this.renderer.createElement('img');
      img.src = 'data:image/jpeg;base64,' + base64Image;

      img.addEventListener('load', () =>{
        let ctx = this.canvasNode.nativeElement.getContext("2d");

        let totalWidth = 1080;
        let totalHeight = 1920;
        let imageWidth = totalWidth * 0.9;
        let imageHeight = totalHeight * 0.1;
        let imageTop = ((totalHeight / 2) - (imageHeight / 2));
        let imageLeft = (totalWidth / 2) - (imageWidth / 2);

        let canvasWidth = window.screen.width * 0.9;
        let canvasHeight = window.screen.height * 0.1;
        this.canvasNode.nativeElement.width = canvasWidth;
        this.canvasNode.nativeElement.height = canvasHeight;

        ctx.drawImage(img, imageLeft, imageTop , imageWidth, imageHeight, 0, 0, canvasWidth, canvasHeight);

        let image = new Image();
        image.id = "pic";
        //Base64 encoded
        image.src = this.canvasNode.nativeElement.toDataURL();
      });

    })
  }

}
