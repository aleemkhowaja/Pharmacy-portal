import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ExportPdfService {

  constructor() { }


  generatePDF(head: string, cont: string, footer: string ): void {
    const docDefinition = {
      header: head,
      content: cont
    };
    pdfMake.createPdf(docDefinition).open();
  }
}
