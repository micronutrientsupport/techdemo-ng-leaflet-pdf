import { Component, AfterViewInit, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import * as jsPDF from 'jspdf';
// import domtoimage from 'dom-to-image';
import * as leafletImage from 'leaflet-image';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;
  @ViewChild('mapData') mapData: ElementRef;


  title = 'techdemo-ng-leaflet-pdf';
  public element: any;
  public map: L.Map;
  private mapElement: any;

  constructor(private elRef: ElementRef) {
    this.element = this.elRef.nativeElement;
  }

  ngOnInit() {
    const width = 100;
    const height = 600;
    this.mapElement = document.createElement("div");
    this.mapElement.style.width = `${width}%`;
    this.mapElement.style.height = `${height}px`;
    this.mapElement.id = "mapid";
    document.getElementById("mapContainer").appendChild(this.mapElement);
  }

  ngAfterViewInit() {
    this.drawMap();
  }

  drawMap(): void {
    const initZoom = 6.4;
    const mapCentre = { lat: 53.0, lng: -1.6 };

    this.map = L.map('mapid', {
      // preferCanvas: true
    }).setView([mapCentre.lat, mapCentre.lng], initZoom);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    // const marker = L.marker(mapCentre);
    // marker.addTo(this.map);

    const circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 100000
    });

    circle.addTo(this.map);
  }

  public openPDF(type: string): void {

    leafletImage(this.map, (err, canvas) => {


      // domtoimage.toJpeg(this.mapElement).then((dataUrl) => {
      //   const img = document.createElement('img');
      //   img.src = dataUrl;
  
      //   let doc = new jsPDF('p', 'pt', 'a4');
      //   let data = this.htmlData.nativeElement;
      //   doc.addImage(img, 'JPEG', 15, 15, 560, 400);
      //   doc.fromHTML(data.innerHTML, 25, 420);
      //   if (type === 'save') {
      //     doc.save('bmgf-maps-pdf');
      //   } else {
      //     window.open(doc.output('bloburl'))
  
      //   }
      // });

      const img = document.createElement('img');
      const dimensions = this.map.getSize();
      img.width = dimensions.x;
      img.height = dimensions.y;
      img.src = canvas.toDataURL();

      let data = this.htmlData.nativeElement;
      let doc = new jsPDF('p', 'pt', 'a4');
      doc.addImage(img, 'JPEG', 15, 15, 560, 400);
      doc.fromHTML(data.innerHTML, 25, 420);
      if (type === 'save') {
        doc.save('bmgf-maps-pdf');
      } else {
        // doc.output('dataurlnewwindow');
        window.open(doc.output('bloburl'))
      }

    });

  }

}
