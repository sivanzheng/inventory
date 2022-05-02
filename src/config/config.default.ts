import * as config from '../../config.json'

export default {
	orm: {
		type: 'mysql',
		host: config.rdb.host,
		port: config.rdb.port,
		username: config.rdb.username,
		password: config.rdb.password,
		database: 'inventory',
		synchronize: false,
		logging: false,
	},
}