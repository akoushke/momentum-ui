import {
  Component,
  OnInit,
  HostBinding,
  HostListener,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { TabsService } from './tabs.service';

@Component({
  selector: 'md-tab',
  template: `
    <a
      href="javascript:void(0)"
      (click)="whenPress.emit()"
      (keydown)="whenKeyDown.emit()"
      [attr.role]="role"
      [attr.tabindex]="ifFocus ? 0 : -1"
      [attr.aria-posinset]="tabIndex"
      [attr.aria-setsize]="tabSize"
      [attr.aria-selected]="ifCurrent"
      [attr.aria-disabled]="disabled"
    >
      <ng-content></ng-content>
    </a>
  `,
  styles: [],
})
export class TabComponent implements OnInit {
  /** @option Optional CSS class name */
  @Input() public className: string = '';
  /** @option Sets the attribute disabled to the Tab | false */
  @Input() public disabled: boolean = false;
  /** @option Tab's anchor role type | 'tab' */
  @Input() public role: string = 'tab';
  /** @option Callback function invoked when user click a tab | null */
  @Output() whenPress = new EventEmitter();
  /** @option Callback function invoked when user press a key | null */
  @Output() whenKeyDown = new EventEmitter();

  public tabIndex: number;
  public ifCurrent: boolean;
  public ifFocus: boolean;
  public tabSize: number;

  @HostBinding('attr.role') attrRole = 'presentation';
  /*
  @HostBinding('attr.tabIndex') get attrTabIndex():number {
    return this.tabIndex;
  };
  @HostBinding('attr.aria-posinset') ariaPosinset = this.tabIndex;
  @HostBinding('attr.aria-setsize') ariaSetsize = this.tabSize;
  @HostBinding('attr.aria-selected') ariaSelected = this.ifCurrent;
  @HostBinding('attr.aria-disabled') ariaDisabled = this.disabled;
  */

  @HostBinding('class') get classes(): string {
    return (
      'md-tab__item' +
      `${(this.className && ` ${this.className}`) || ''}` +
      `${(this.ifCurrent && ' active') || ''}` +
      `${(this.disabled && ' disabled') || ''}` +
      ``
    );
  }

  @HostListener('click') select() {
    this.tabsService.select(this.tabIndex);
  }

  constructor(private tabsService: TabsService, private el: ElementRef) {
    this.tabIndex = tabsService.registerTab();
    this.tabSize = this.tabIndex;

    this.tabsService.current$.subscribe(index => {
      this.ifCurrent = this.tabIndex === index;
    });
    this.tabsService.focusIndex$.subscribe(index => {
      this.ifFocus = this.tabIndex === index;
      if (this.ifFocus) {
        this.el.nativeElement.getElementsByTagName('A')[0].focus();
      }
    });
    this.tabsService.tabSize$.subscribe(n => {
      this.tabSize = n;
    });
  }

  ngOnInit() {
    this.tabsService.registerDisable(this.tabIndex, this.disabled);

    const innerText = this.el.nativeElement.innerText;
    if (innerText) {
      this.tabsService.registerKey(innerText[0], this.tabIndex);
    }
  }
}
