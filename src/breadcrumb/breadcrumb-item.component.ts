import {
	Component,
	HostBinding,
	Input,
	Optional,
	EventEmitter,
	Output
} from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "ibm-breadcrumb-item",
	template: `
	<a
		*ngIf="skeleton || href; else content"
		class="bx--link"
		href="{{skeleton ? '#' : href}}"
		[attr.aria-current]="(current ? ariaCurrent : null)"
		(click)="navigate($event)">
		<ng-container *ngTemplateOutlet="content"></ng-container>
	</a>
	<ng-template #content>
		<ng-content></ng-content>
	</ng-template>`
})
export class BreadcrumbItemComponent {
	@Input() href: string;

	@Input() skeleton = false;

	@Input() ariaCurrent = "page";

	/**
	 * Array of commands to send to the router when the link is activated
	 * See: https://angular.io/api/router/Router#navigate
	 */
	@Input() route: any[];

	/**
	 * Router options. Used in conjunction with `route`
	 * See: https://angular.io/api/router/Router#navigate
	 */
	@Input() routeExtras: any;

	/**
	 * Emits the navigation status promise when the link is activated
	 */
	@Output() navigation = new EventEmitter<Promise<boolean>>();

	@HostBinding("class.bx--breadcrumb-item--current") @Input() current = false;

	@HostBinding("class.bx--breadcrumb-item") itemClass = true;

	constructor(@Optional() protected router: Router) { }

	navigate(event) {
		if (this.router && this.route) {
			event.preventDefault();
			const status = this.router.navigate(this.route, this.routeExtras);
			this.navigation.emit(status);
		}
	}
}
