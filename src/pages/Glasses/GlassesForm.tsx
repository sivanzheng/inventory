import React, { useState } from 'react'
import { Form, DatePicker, Input, InputNumber, Divider, Button, ConfigProvider } from 'antd'
import moment from 'moment'
import zhCN from 'antd/lib/locale/zh_CN';
import Glasses, { LR, Glass } from '../../model/Glasses'

const { Item } = Form

interface Props {
	glasses?: Glasses
	onSave: (data: Glasses) => void
}

export default function GlassesForm(props: Props) {
	const [form] = Form.useForm()
	const [locale] = useState(zhCN)

	let data = null
	if (props.glasses) {
		data = {
			...props.glasses,
			orderAt: moment(Number(props.glasses.orderAt)),
			glass: props.glasses.glass.sort()
		}
	}

	const handleSave = () => {
		form.validateFields()
			.then((values) => {
				props.onSave({
					...values,
					id: props.glasses && props.glasses.id ? props.glasses.id : null,
					glass: values.glass.map((v: Glass, index: number) => ({ ...v, lr: index === 0 ? LR.L : LR.R })),
					orderAt: moment(values.orderAt).valueOf()
				})
			})
			.catch(() => console.error())
	}

	return (
		<ConfigProvider locale={locale}>
			<Form
				form={form}
				labelCol={{ span: 12, offset: 0 }}
				wrapperCol={{ span: 32, offset: 0 }}
				initialValues={data}
				autoComplete='off'
				layout='inline'
				preserve={false}
			>
				<Item
					required
					label='定配日期'
					name='orderAt'
					rules={[{ required: true, message: '请选择定配日期!' }]}
				>
					<DatePicker placeholder='选择日期' format='YYYY-MM-DD' />
				</Item>
				<Item
					required
					label='姓名'
					name='name'
					rules={[{ required: true, message: '请输入客户姓名!' }]}
				>
					<Input />
				</Item>
				<Item
					required
					label='单号'
					name='orderID'
					rules={[{ required: true, message: '请输入单号!' }]}
				>
					<Input />
				</Item>
				<Item
					required
					label='电话'
					name='phone'
					rules={[{ required: true, message: '请输入电话号码!' }]}
				>
					<Input />
				</Item>
				<Divider />
				<Item label='品牌' name='brand'>
					<Input />
				</Item>
				<Item label='折射率' name='indexOfRefraction'>
					<InputNumber />
				</Item>
				<Item label='系数' name='factor'>
					<Input />
				</Item>
				<Item label='轴距' name='axis'>
					<InputNumber />
				</Item>
				<Divider />
				<Item hidden label='左眼' name={['glass', 0, 'lr']} >
					<InputNumber value={LR.L}/>
				</Item>
				<Item label='左眼片数' name={['glass', 0, 'count']}>
					<InputNumber />
				</Item>
				<Item label='左眼球镜S' name={['glass', 0, 'degreeS']}>
					<InputNumber />
				</Item>
				<Item label='左眼球镜C' name={['glass', 0, 'degreeC']}>
					<InputNumber />
				</Item>
				<Divider />
				<Item hidden label='右眼' name={['glass', 1, 'lr']} >
					<InputNumber value={LR.R}/>
				</Item>
				<Item label='右眼片数' name={['glass', 1, 'count']} >
					<InputNumber />
				</Item>
				<Item label='右眼球镜S' name={['glass', 1, 'degreeS']}>
					<InputNumber />
				</Item>
				<Item label='右眼球镜C' name={['glass', 1, 'degreeC']}>
					<InputNumber />
				</Item>
				<Divider />
				<Item label='备注' name='comment'>
					<Input.TextArea autoSize size='large'/>
				</Item>
				<Divider />
				<Item>
					<Button type='primary' onClick={handleSave}>保存</Button>
				</Item>
			</Form>
		</ConfigProvider>

	)
}
