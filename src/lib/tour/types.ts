export interface TourSteps {
	title: string;
	description?: string;
	placement?:
		| 'top'
		| 'bottom'
		| 'left'
		| 'right'
		| 'top-left'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-right'
		| 'left-top'
		| 'right-top'
		| 'left-bottom'
		| 'right-bottom';
	target: HTMLElement;
}
