import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ActionService {
  public newCategory: Subject<any> = new Subject<any>();
  public newProduct: Subject<any> = new Subject<any>();
  public updatedProduct: Subject<any> = new Subject<any>();
  public selectedProduct: Subject<any> = new Subject<any>();
}
