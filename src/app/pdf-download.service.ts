import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfDownloadService {

  pdfMake: any;

  constructor() { }

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  async generatePdf( img: any) {
    await this.loadPdfMaker();
    const def = {
      content:
      {
        image: `${img}`
      }
    };
    this.pdfMake.createPdf(def).open();
  }
}
