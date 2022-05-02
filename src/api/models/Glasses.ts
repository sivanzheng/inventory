export enum LR {
	L,
	R
}

export interface Glass {
	lr: LR
	count: number
	degreeS: number
	degreeC: number
}

export default interface Glasses {
	id: number
	orderAt: number
	name: string
	orderID: string
	phone: string
	indexOfRefraction: number
	brand: string
	factor: string
	axis: number
	glass: Glass[]
	comment: string
}

export interface GlassesRow extends Omit<Glasses, 'glass'>, Glass {
	rowKey: string
}