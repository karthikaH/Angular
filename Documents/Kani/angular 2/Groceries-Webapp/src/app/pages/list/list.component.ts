import { Directive, Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Grocery} from "../../shared/grocery/grocery";
import {GroceryStore} from "../../shared/grocery/grocery-list.service";
import {Config} from "../../shared/config";
import {ActivityIndicator} from "../../components/activity-indicator.component";
import {GroceryList} from "./grocery-list.component";


@Component({
  selector: "list",
  templateUrl: "./list.html",
  styleUrls: ["./list.css","./grocery-list.css"],
  providers: [GroceryStore]
})

export class ListComponent implements OnInit{
  groceryList: Array<Grocery> = [];
  grocery: string = "";


  isLoading = false;
  isShowingRecent = false;

  constructor(private router: Router, private store: GroceryStore) {}

  ngOnInit() {
    if (!Config.token) {
      this.router.navigate(["Login"]);
      return;
    }

    this.isLoading = true;
    this.store.load()
      .subscribe(groceryObject => {
        this.groceryList= groceryObject;
        console.log(this.groceryList);
        this.hideLoadingIndicator();
      });
  }

  hideLoadingIndicator() {
    this.isLoading = false;
  }

  add() {
    if (this.grocery.trim() === "") {
      alert("Enter a grocery item");
      return;
    }
    this.isLoading = true;
    this.store.add(this.grocery)
      .subscribe(groceryObject => {
        console.log(groceryObject);
        this.groceryList = groceryObject.concat(this.groceryList);
        this.grocery = "";
        this.hideLoadingIndicator();
      }, () => {
        alert("An error occurred while adding a grocery to your list.");
      });
  }

  toggleRecent() {
    if (this.isShowingRecent) {
      this.store.restore()
        .subscribe(
          () => { this.isShowingRecent = false },
          () => { alert("An error occurred while adding groceries to your list.") }
        )
    } else {
      this.isShowingRecent = true;
    }
  }

  //grocery-list component functions

  imageSource(grocery) {
    if (grocery.deleted) {
      return grocery.done ? "../app/assets/images/selected.png" : "./app/assets/images/nonselected.png"
    }
    return grocery.done ? "./app/assets/images/checked.png" : "./app/assets/images/unchecked.png";
  }

  toggleDone(grocery: Grocery) {
    if (grocery.deleted) {
      grocery.done = !grocery.done;
      return;
    }
    this.store.toggleDoneFlag(grocery)
      .subscribe(
        () => {},
        () => { alert("An error occurred managing your grocery list") }
      );
  }

  delete(grocery: Grocery) {
    this.isLoading = true;
    this.store.deleteForever(grocery)
      .subscribe(
        () => {
          this.hideLoadingIndicator();
        },
        () => alert("An error occurred while deleting an item from your list.")
      );
  }
}
