import {Component, Input} from "@angular/core";

@Component({
  selector: "activity-indicator",
  inputs: ["isLoading"],
  template: `
    <div [class.hidden]="!isLoading">
      <img src="./app/assets/images/loading.gif">
      <span>{{ message }}</span>
    </div>
  `,
  styleUrls: ["./activity-indicator.css"]
})
export class ActivityIndicator {
  @Input("isLoading") isLoading = false;
  @Input("message") message = "Loading"
}
