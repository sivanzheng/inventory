export enum LR {
	L,
	R
}

export interface Eye {
	lr: LR
	glassCount: number
	degreeS: string 
	degreeC: string 
	axis: number
	pd: number
	ph: number
	glassBorder: number
	glassHeight: number
}

export default interface Glasses {
	id: number
	orderAt: number
	name: string
	orderID: string
	phone: string
	indexOfRefraction: number
	frameBrand: string
	frameModel: string
	framePrice: number
	glassBrand: string
	glassModel: string
	glassPrice: number
	eyes: Eye[]
	sumPD: number
	amount: number
	comment: string
}

export interface GlassesRow extends Omit<Glasses, 'eye'>, Eye {
	rowKey: string
}