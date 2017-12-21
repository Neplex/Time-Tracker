import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';

import { Activity } from '../activity';
import { Category } from '../category';
import { TimeSlot } from '../time-slot';

import { AVAILABLE_COLORS } from '../global';

@Injectable()
export class DataStorageService {

  private dataBase: IDBDatabase;

  constructor() { }


   openDB() {

     return new Observable((observer: Observer<string>) => {

       if (!('indexedDB' in window)) {
         alert('This browser doesn\'t support IndexedDB');
       }

       let request: IDBOpenDBRequest = indexedDB.open("TimeTracker");
       request.onsuccess = (event: Event) => {
         this.dataBase = (<IDBOpenDBRequest>event.target).result;
         observer.next((<IDBOpenDBRequest>event.target).readyState);
         observer.complete();
       };

       request.onerror = (event: Event) => {
         console.log('IndexedDB service: ' + (<IDBOpenDBRequest>event.target).error.name);
         observer.error((<IDBOpenDBRequest>event.target).error.name);
       };

       request.onupgradeneeded = (event: Event) => {
         this.dataBase = (<IDBOpenDBRequest>event.target).result;
         console.log('Upgrade');
         if(!('Categories' in this.dataBase.objectStoreNames)){
           console.log("Store Categories");
           let cat = this.dataBase.createObjectStore("Categories",{ keyPath: "name"});
           cat.createIndex("name","name",{unique:true});
         }
         if(!('Activities' in this.dataBase.objectStoreNames)){
           console.log("Store Activities");
           let act = this.dataBase.createObjectStore("Activities",{ keyPath: "name"});
           act.createIndex("name","name",{unique:true});
           act.createIndex("categories","categories",{unique:false,multiEntry:true});
           act.transaction.oncomplete = (event) => {
             this.initDataExamples();
           }
         }
       }
     });
  }

  private getAll(storeName: string){
      let transac: IDBTransaction = this.dataBase.transaction(storeName, 'readonly');
      let store: IDBObjectStore = transac.objectStore(storeName);

      return new Observable((observer: Observer<any>) => {

        let request: IDBRequest = store.openCursor();

        request.onsuccess = (event: Event) => {
          let cursor: IDBCursorWithValue = (<IDBRequest>event.target).result;

          if(cursor){
            observer.next(cursor.value);
            cursor.continue();
          }
          else{
            observer.complete();
          }
        }
        request.onerror = (event: Event) => {
          console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);
          observer.error((<IDBRequest>event.target).error.name);
        }
      });
    }

  initDataExamples(){
    console.log("Initialisation des données de test");
    for(let i=0;i<5;++i){
      let act:Activity = new Activity();
      act.name = "Activity "+i;
      act.color = AVAILABLE_COLORS[i];
      act.description = "Je suis l'activité "+i;
      this.saveActivity(act);
    }
    for(let i=0;i<3;++i){
      let cat:Category = new Category();
      cat.name = "Category "+i;
      cat.icon = "code";
      this.saveCategory(cat);
    }
  }

  getActivities() {
    return new Observable((observer: Observer<any>) => {
      let acts: Activity[] = [];
      let sub;
      let open;
      open = this.openDB().subscribe((readyState) => {
          sub = this.getAll('Activities').subscribe((x:Activity) => {
            acts.push(this.fromDBToActivity(x));
          },null,() => {
            sub.unsubscribe();
            observer.next(acts);
            observer.complete();
          });
      },null,() => {
        open.unsubscribe();
        this.closeDB();
      });
    });
  }

  getCategories(){
    return new Observable((observer: Observer<any>) => {
      let cats: Category[] = [];
      let sub;
      let open;
      open = this.openDB().subscribe((readyState) => {
          sub = this.getAll('Categories').subscribe((x) => {
            cats.push(this.fromDBToCategory(x));
          },null,() => {
            sub.unsubscribe();
            observer.next(cats);
            observer.complete();
          });
      },null,() => {
        open.unsubscribe();
        this.closeDB();
      });
    });
  }

  // getAllBy(idName: string, storeName:string, byObject:any){
  //   let transac: IDBTransaction = this.dataBase.transaction(storeName, 'readonly');
  //   let store: IDBObjectStore = transac.objectStore(storeName);
  //   let index: IDBIndex = store.index(idName);
  //
  //   return new Observable((observer: Observer<any>) => {
  //
  //     let request: IDBRequest = index.openCursor();
  //
  //     request.onsuccess = (event: Event) => {
  //       let cursor: IDBCursorWithValue = (<IDBRequest>event.target).result;
  //
  //       if(cursor){
  //         observer.next(cursor.value);
  //         console.log(cursor.value);
  //         cursor.continue();
  //       }
  //       else{
  //         observer.complete();
  //       }
  //     }
  //     request.onerror = (event: Event) => {
  //       console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);
  //       observer.error((<IDBRequest>event.target).error.name);
  //     }
  //   });
  // }

  getActivitiesByCategory(cat : Category) {
    return new Observable((observer: Observer<any>) => {
      let acts: Activity[] = [];
      let sub;
      let open;
      open = this.openDB().subscribe((readyState) => {
          sub = this.getAll('Activities').subscribe((x) => {
            let tmp:Activity = this.fromDBToActivity(x)
            let catTmp:Category;
            for( catTmp of tmp.getCategories()){
              if(cat.name == catTmp.name){
                acts.push(this.fromDBToActivity(x));
              }
            }
          },null,() => {
            sub.unsubscribe();
            observer.next(acts);
            observer.complete();
          });
      },null,() => {
        open.unsubscribe();
        this.closeDB();
      });
    });
  }


  getOne(id: string, idName: string, storeName:string){
    let transac: IDBTransaction = this.dataBase.transaction(storeName, 'readonly');
    let store: IDBObjectStore = transac.objectStore(storeName);
    let index: IDBIndex = store.index(idName);

    return new Observable((observer: Observer<any>) => {

      let request: IDBRequest = index.get(id);

      request.onsuccess = (event: Event) => {
        let result:any = (<IDBRequest>event.target).result;

        if(result){
          observer.next(result);
          observer.complete();
        }
      }
      request.onerror = (event: Event) => {
        console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      }
    });

  }

  getActivity(name : string) {
    return new Observable((observer: Observer<any>) =>{
      let act: Activity = null;
      let sub;
      let open;
      open = this.openDB().subscribe((readyState) => {
        sub = this.getOne(name,"name",'Activities').subscribe((x) => {
          act = this.fromDBToActivity(x);
        },e => {
          observer.next(null);
          observer.complete();
        },() => {
          sub.unsubscribe();
          observer.next(act);
          observer.complete();
        });
      },null,() => {
        open.unsubscribe();
        this.closeDB();
      });
    });
  }

  getCategory(name : string) {
    return new Observable((observer: Observer<any>) =>{
      let cat: Category = null;
      let sub;
      let open;
      open = this.openDB().subscribe((readyState) => {
        sub = this.getOne(name,"name",'Categories').subscribe((x) => {
          cat = this.fromDBToCategory(x);
        },e => {
          observer.next(null);
          observer.complete();
        },() => {
          sub.unsubscribe();
          observer.next(cat);
          observer.complete();
        });
      },null,() => {
        open.unsubscribe();
        this.closeDB();
      });
    });
  }

  saveOne(object: any, store: string){
    let transac = this.dataBase.transaction([store],"readwrite");
    let objSt = transac.objectStore(store);
    transac.oncomplete = (event) => {
    };
    return new Observable((observer: Observer<string>) => {
            var request: IDBRequest = objSt.put(object);
            // Success.
            request.onsuccess = (event: Event) => {
                observer.next((<IDBRequest>event.target).readyState);
                observer.complete();
            }
            // Error.
            request.onerror = (event: Event) => {
                console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);
                observer.error((<IDBRequest>event.target).error.name);
            }
      });
  }

  saveActivity(a : Activity) {
      let sub;
      let open;
      open = this.openDB().subscribe((readyState) => {
          sub = this.saveOne(a,"Activities").subscribe((x) => {
            console.log("Activity: "+a.name+" saved");
          },null,() => sub.unsubscribe());
      },null,() => {
        open.unsubscribe();
        this.closeDB();
      });
      return true;
    }

  saveCategory(c : Category) {
    let sub;
    let open;
    open = this.openDB().subscribe((readyState) => {
        sub = this.saveOne(c,"Categories").subscribe((x) => {
          console.log("Category: "+c.name+" saved");
        },null,() => sub.unsubscribe());
    },null,() => {
      open.unsubscribe();
      this.closeDB();
    });
    return true;
  }

  deleteOne(id: string, storeName:string){
    let transac: IDBTransaction = this.dataBase.transaction(storeName, 'readonly');
    let store: IDBObjectStore = transac.objectStore(storeName);

    return new Observable((observer: Observer<any>) => {

      let request: IDBRequest = store.delete(id);

      request.onsuccess = (event: Event) => {
        let result:any = (<IDBRequest>event.target).result;

        if(result){
          observer.next(result);
          observer.complete();
        }
      }
      request.onerror = (event: Event) => {
        console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      }
    });
  }

  deleteActivity(a : Activity) {
      let sub;
      let open;
      open = this.openDB().subscribe((readyState) => {
          sub = this.deleteOne(a.name,"Activities").subscribe((x) => {
            console.log("Activity: "+a.name+" deleted");
          },null,() => sub.unsubscribe());
      },null,() => {
        open.unsubscribe();
        this.closeDB();
      });
      return true;
    }

    deleteCategory(c : Category) {
        let sub;
        let open;
        open = this.openDB().subscribe((readyState) => {
            sub = this.deleteOne(c.name,"Categories").subscribe((x) => {
              console.log("Category: "+c.name+" deleted");
            },null,() => sub.unsubscribe());
        },null,() => {
          open.unsubscribe();
          this.closeDB();
        });
        return true;
      }


  closeDB() {
    this.dataBase.close();
  }

  fromDBToActivity(x):Activity {
    let act = new Activity();
    act.name = x.name;
    act.description = x.description;
    act.color = x.color;
    for( let cat of x.categories){
      act.addCategory(this.fromDBToCategory(cat));
    }
    for( let timeS of x.time_slots){
      let timeSTmp = new TimeSlot(timeS.start,timeS.end);
      act.addTimeSlot(timeSTmp);
    }
    return act;
  }

  fromDBToCategory(x):Category{
    let cat = new Category();
    cat.name = x.name;
    cat.icon = x.icon;
    return cat;
  }
}
