import React from 'react'
import { Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { login } from '@src/api/controller/login'
import { Login as LoginModel } from '@src/api/models/User'
import Header from '@src/components/Header'
import './index.css'

export default function Login() {
	const navigate = useNavigate()

	const signIn = async (data: LoginModel) => {
		const res = await login(data)
		if (res && res.code === 200) {
			window.localStorage.setItem('token', res.data)
			navigate('/glasses')
		}
	}

	const onFinish = (values: LoginModel) => {
		signIn(values)
	}

	return (
		<div>
			<Header />
			<div className="container">
				<Form
					size="large"
					name="basic"
					labelCol={{
						span: 6,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item
						label="账号"
						name="account"
						rules={[
							{
								required: true,
								message: '请输入账号',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="密码"
						name="password"
						rules={[
							{
								required: true,
								message: '请输入密码',
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 6,
						}}
					>
						<Button type="primary" htmlType="submit">
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>


	)
}
