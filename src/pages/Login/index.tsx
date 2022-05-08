import React, { useEffect, useState } from 'react'
import { getJWT } from '@src/api/controller/jwt'

export default function Login() {
	const signIn = async () => {
		const res = await getJWT()
		console.log(res)
	}
	signIn()
	return (
		<div style={{ padding: 10 }}>
			Login
		</div>
	)
}