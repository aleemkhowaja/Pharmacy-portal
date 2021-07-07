import { ALL_PROVIDER_URL } from './provider-constant';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProviderModel } from 'src/models/Provider';
import { Apollo, QueryRef } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  lstCients: any = [];

  constructor(private apollo: Apollo) { }

    /**
   * return all managers
   * @returns 
   */
     filter(pageNum: number, itemPerPage: number, provider:ProviderModel) : QueryRef<any> 
     { console.log("callll filter Provider")
       return this.apollo.watchQuery<any>({
         query: ALL_PROVIDER_URL,


         variables : {
          pageNumber : pageNum-1,
          pageSize : itemPerPage,
          sortOrder : "DESC",
          sortBy : "id",
         },
       });
     }
}
