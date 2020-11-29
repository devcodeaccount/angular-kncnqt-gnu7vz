import { Component, ViewChild } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})

export class AppComponent {
  private listviewEle: HTMLElement;
  private editArea: HTMLElement;

  @ViewChild('RTE', null) public rteObj: RichTextEditorComponent;

  public data: { [key: string]: Object }[] = [
    {
      "text": "Hennessey Venom",
      "id": "list-01",
      "htmlAttributes": { draggable: true }
    },
    {
      "text": "Bugatti Chiron",
      "id": "list-02",
      "htmlAttributes": { draggable: true }
    },
    {
      "text": "Bugatti Veyron Super Sport",
      "id": "list-03",
      "htmlAttributes": { draggable: true }
    }
  ];

  onCreate(): void {
    this.listviewEle = document.getElementById('listview') as HTMLElement;
    this.editArea = document.querySelector("#defaultRTE .e-content") as HTMLElement;

    // Drop handler
    this.editArea.addEventListener("drop", this.dropHandler.bind(this));

    // DragStart event binding
    this.listviewEle.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("Text", (e.target as HTMLElement).innerText);
    });
  }

  dropHandler(e: any): void {
    //Prevent browser default drop and drop action
    e.preventDefault();

    // Do drop if target is inside RTE edit area
    if (this.rteObj.inputElement.contains(e.target)) {
      let range: Range;

      if (this.rteObj.contentModule.getDocument().caretRangeFromPoint) {
        range = this.rteObj.contentModule.getDocument().caretRangeFromPoint(e.clientX, e.clientY);
      } else if (e.rangeParent) {
        range = this.rteObj.contentModule.getDocument().createRange();
        range.setStart(e.rangeParent, e.rangeOffset);
      }

      this.rteObj.selectRange(range);

      if (this.rteObj.formatter.getUndoRedoStack().length === 0) {
        this.rteObj.formatter.saveData();
      }

      let text: string = e.dataTransfer.getData('Text').replace(/\n/g, '').replace(/\r/g, '').replace(/\r\n/g, '');

      this.rteObj.executeCommand("insertHTML", text);
      this.rteObj.formatter.saveData();
      this.rteObj.formatter.enableUndo(this.rteObj);
    }
  }
}