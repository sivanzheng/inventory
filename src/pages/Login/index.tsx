import React, { useEffect, useState } from 'react'
import { login } from '@src/api/controller/login'

// TODO: https://midwayjs.org/docs/hooks/client
export default function Login() {
	const signIn = async () => {
		const res = await login({ account: 'admin', password: '' })
		console.log(res)
	}
	signIn()
	return (
		<div style={{ padding: 10 }}>
			Login
		</div>
	)
}