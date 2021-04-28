import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ImportModel } from 'src/models/import';
import Observable from 'zen-observable';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  lstImport: any = [
    {
      id: 1,
      fileName: 'X File Name',
      successessNumber: 10,
      failuresNumber: 1,
      importedBy: "Mark",
      importedOn: "Nil",
    },
    {
      id: 2,
      fileName: 'Y File Name',
      successessNumber: 11,
      failuresNumber: 1,
      importedBy: "Mark",
      importedOn: "Nil",
    },
    {
      id: 3,
      fileName: 'Z File Name',
      successessNumber: 12,
      failuresNumber: 1,
      importedBy: "Mark",
      importedOn: "Nil",
    },
    {
      id: 4,
      fileName: 'F File Name',
      successessNumber: 13,
      failuresNumber: 1,
      importedBy: "Mark",
      importedOn: "Nil",
    },
    {
      id: 5,
      fileName: 'T File Name',
      successessNumber: 14,
      failuresNumber: 1,
      importedBy: "Mark",
      importedOn: "Nil",
    },
    {
      id: 6,
      fileName: 'X File Name',
      successessNumber: 15,
      failuresNumber: 1,
      importedBy: "Mark",
      importedOn: "Nil",
    },
    {
      id: 7,
      fileName: 'X File Name',
      successessNumber: 14,
      failuresNumber: 1,
      importedBy: "Mark",
      importedOn: "Nil",
    },
    {
      id: 8,
      fileName: 'X File Name',
      successessNumber: 14,
      failuresNumber: 1,
      importedBy: "Mark",
      importedOn: "Nil",
    },
    {
      id: 9,
      fileName: 'X File Name',
      successessNumber: 14,
      failuresNumber: 1,
      importedBy: "Mark",
      importedOn: "Nil",
    },
    {
      id: 10,
      fileName: 'X File Name',
      successessNumber: 14,
      failuresNumber: 1,
      importedBy: "Mark",
      importedOn: "Nil",
    },
  ];

  constructor(private http: HttpClient, private apollo: Apollo) {}

  getAll(pageNumber: number, itemPerPage: number): Observable<ImportModel[]> {
    return this.lstImport.slice(
      (pageNumber - 1) * itemPerPage,
      pageNumber * itemPerPage
    );
  }

  getById(id: number) {
    return this.lstImport.find((x: any) => x.id == id);
  }

  save(suplier: ImportModel) {
    console.log(name);
  }

  getDetailsSupliers() {
    return this.lstImport;
  }

  search(filters: any) {
    return this.lstImport.filter((x: any) => {
      return (!filters.fileName || x.fileName.includes(filters.fileName))
              && (!filters.successessNumber || x.successessNumber == filters.successessNumber)
              && (!filters.failuresNumber || x.failuresNumber == filters.failuresNumber)
              && (!filters.importedBy || x.importedBy.includes(filters.importedBy))
              && (!filters.importedOn || x.importedOn.includes(filters.importedOn));
    });
  }
}
