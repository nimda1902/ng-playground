import { Component, OnInit } from "@angular/core";
import jss from "jss";

import { styles, red, green, blue } from "./atomic-component.component.styles";

interface sheet {
  readonly classes: Object;
  readonly update: Function;
}

@Component({
  selector: "lib-atomic-component",
  templateUrl: "./atomic-component.component.html",
  styles: []
})
export class AtomicComponentComponent implements OnInit {
  public classes: Object;

  public onRedChanged: Function;
  public onGreenChanged: Function;
  public onBlueChanged: Function;

  public ngOnInit(): void {
    const sheet: sheet = jss.createStyleSheet(styles, { link: true }).attach();
    this.classes = sheet.classes;
    this.onRedChanged = this.createChangeFunction(sheet, red);
    this.onGreenChanged = this.createChangeFunction(sheet, green);
    this.onBlueChanged = this.createChangeFunction(sheet, blue);
    sheet.update({
      area: { backgroundColor: red }
    });
  }

  private createChangeFunction(
    sheet: sheet,
    color: string
  ): (event: Event) => void {
    return (event: Event) => {
      event.stopPropagation();
      event.preventDefault();
      sheet.update({
        area: { backgroundColor: color }
      });
    };
  }
}
