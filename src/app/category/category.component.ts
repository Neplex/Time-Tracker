import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category';
import { Subscription } from 'rxjs';
import { AVAILABLE_ICONS } from '../global';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private subscriptionParam: Subscription;
  public category: Category;
  public icons: string[];

  constructor(private route: ActivatedRoute) {
    this.category = new Category();
    this.icons = AVAILABLE_ICONS;
  }

  ngOnInit() {
    this.subscriptionParam = this.route.params.subscribe((param: any) => {
      if((param['id'])!=null){
        console.log("id Categorie found");
        this.category.name = "Code";
        this.category.icon = "code";
      }
    });
  }

  saveCategory(){
    console.log(this.category);
  }

}
