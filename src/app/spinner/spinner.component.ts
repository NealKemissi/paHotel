import { Component, ViewContainerRef } from "@angular/core";


@Component({
    selector: "spinner",
    templateUrl: "./spinner.component.html",
    styleUrls: ["./spinner.component.css"]

})

export class SpinnerComponent {
    public constructor(vcr: ViewContainerRef) {

    }
}