export enum LR {
	L,
	R
}

export interface Eye {
	lr: LR
	glassCount: number
	degreeS: string
	degreeC: string
	axial: string
	pd: string
	ph: string
}

export default interface Glasses {
	id: number
	orderAt: number
	name: string
	orderID: string
	phone: string
	frameBrand: string
	frameModel: string
	framePrice: number
	frameHeight: string
	frameSize: string
	glassBrand: string
	glassModel: string
	glassPrice: number
	indexOfRefraction: number
	eyes: Eye[]
	add: number
	sumPD: number
	amount: number
	comment: string
}

export interface GlassesRow extends Omit<Glasses, 'eyes'>, Eye {
	rowKey: string
}
