export interface Option {
	id?: number;
	option?: string;
}

export interface Iquestion {
	id?: number;
	title?: string | undefined;
	type?: string | undefined;
	radio?: Option[] | undefined;
	checkbox?: Option[] | undefined;
	select?: Option[] | undefined;
	isNecessary?: boolean | undefined;
	editMode?: boolean | undefined;
}

export type Iquestions = Iquestion[];
