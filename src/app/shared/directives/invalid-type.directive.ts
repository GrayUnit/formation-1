import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { InvalidMessageDirective } from './invalid-message.directive';

@Directive({
  selector: '[invalidType]'
})
export class InvalidTypeDirective implements OnInit {

  @Input('invalidType') type: string;

  constructor(
    private invalidMessage: InvalidMessageDirective,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    this.invalidMessage.controlValue$.subscribe(
      () => {
        this.setVisible();
      }
    )
  }

  private setVisible() {
    if(this.invalidMessage.match(this.type)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
