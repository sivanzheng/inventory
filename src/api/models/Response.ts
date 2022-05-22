export default interface Response<T = any> {
	code: number
	errMsg?: string
	data?: T
}