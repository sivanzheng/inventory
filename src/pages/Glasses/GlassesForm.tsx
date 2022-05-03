import React from 'react'
import { Form, DatePicker, Input, InputNumber, Divider, Button } from 'antd'
import moment from 'moment'
import Glasses, { LR, Eye } from '@src/api/models/Glasses'

const { Item } = Form

interface Props {
	glasses?: Glasses
	onSave: (data: Glasses) => void
}

export default function GlassesForm(props: Props) {
	const [form] = Form.useForm()

	let data = null
	if (props.glasses) {
		data = {
			...props.glasses,
			orderAt: moment(Number(props.glasses.orderAt)),
			eyes: props.glasses.eyes.sort()
		}
	}

	const handleSave = () => {
		form.validateFields()
			.then((values) => {
				const data = {
					...values,
					id: props.glasses && props.glasses.id ? props.glasses.id : null,
					eyes: values.eyes.map((v: Eye, index: number) => ({ ...v, lr: index === 0 ? LR.L : LR.R })),
					orderAt: moment(values.orderAt).valueOf()
				}
				props.onSave(data)
			})
	}

	return (
		<Form
			form={form}
			labelCol={{ style: { width: 100 } }}
			wrapperCol={{ span: 32, offset: 0 }}
			labelAlign="left"
			initialValues={data}
			autoComplete='off'
			layout='inline'
			preserve={false}
		>
			<Item
				required
				label='定配日期'
				name='orderAt'
				labelCol={{ style: { width: 90 } }}
				style={{ marginBottom: 10 }}
				rules={[{ required: true, message: '请选择定配日期!' }]}
			>
				<DatePicker placeholder='选择日期' format='YYYY-MM-DD' />
			</Item>
			<Item
				required
				label='姓名'
				name='name'
				labelCol={{ style: { width: 60 } }}
				style={{ marginBottom: 10 }}
				rules={[{ required: true, message: '请输入客户姓名!' }]}
			>
				<Input style={{ width: 180 }} />
			</Item>
			<Item
				required
				label='电话'
				name='phone'
				labelCol={{ style: { width: 60 } }}
				style={{ marginBottom: 10 }}
				rules={[{ required: true, message: '请输入电话号码!' }]}
			>
				<Input style={{ width: 150 }} />
			</Item>
			<Item
				required
				label='单号'
				name='orderID'
				labelCol={{ style: { width: 60 } }}
				rules={[{ required: true, message: '请输入单号!' }]}
			>
				<Input style={{ width: 180 }} />
			</Item>
			<Divider style={{ marginTop: 10, marginBottom: 10 }}/>
			<Item
				label='镜架品牌'
				name='frameBrand'
				style={{ marginBottom: 10 }}
			>
				<Input style={{ width: 180 }} />
			</Item>
			<Item
				label='镜架型号'
				name='frameModel'
				style={{ marginBottom: 10 }}
			>
				<Input style={{ width: 180 }} />
			</Item>
			<Item
				label='镜片品牌'
				name='glassBrand'
				style={{ marginBottom: 10 }}
			>
				<Input style={{ width: 180 }} />
			</Item>
			<Item
				label='折射率'
				name='indexOfRefraction'
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='系数'
				name='glassModel'
				style={{ marginBottom: 10 }}
			>
				<Input style={{ width: 180 }} />
			</Item>
			<Divider style={{ marginTop: 0, marginBottom: 10 }}/>
			<Item hidden label='左眼' name={['eyes', 0, 'lr']} >
				<InputNumber value={LR.L} />
			</Item>
			<Item
				label='左眼片数'
				name={['eyes', 0, 'count']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='左眼球镜S'
				name={['eyes', 0, 'degreeS']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='左眼球镜C'
				name={['eyes', 0, 'degreeC']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='左眼轴距'
				name={['eyes', 0, 'axis']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='左瞳距(LPD)'
				name={['eyes', 0, 'pd']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='左瞳高(LPH)'
				name={['eyes', 0, 'ph']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='左眼镜高'
				name={['eyes', 0, 'glassHeight']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='左眼镜框'
				name={['eyes', 0, 'glassBorder']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Divider style={{ marginTop: 0, marginBottom: 10 }}/>
			<Item hidden label='右眼' name={['eyes', 1, 'lr']} >
				<InputNumber value={LR.L} />
			</Item>
			<Item
				label='右眼片数'
				name={['eyes', 1, 'count']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='右眼球镜S'
				name={['eyes', 1, 'degreeS']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='右眼球镜C'
				name={['eyes', 1, 'degreeC']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='右眼轴距'
				name={['eyes', 1, 'axis']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='右瞳距(RPD)'
				name={['eyes', 1, 'pd']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='右瞳高(RPH)'
				name={['eyes', 1, 'ph']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='右眼镜高'
				name={['eyes', 1, 'glassHeight']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Item
				label='右眼镜框'
				name={['eyes', 1, 'glassBorder']}
				style={{ marginBottom: 10 }}
			>
				<InputNumber style={{ width: 180 }} />
			</Item>
			<Divider style={{ marginTop: 0, marginBottom: 10 }}/>
				<Item
					label='瞳距'
					name='sumPD'
					style={{ marginBottom: 10 }}
				>
					<InputNumber style={{ width: 180 }} />
				</Item>
				<Item
					label='镜架单价'
					name='framePrice'
					style={{ marginBottom: 10 }}
				>
					<InputNumber style={{ width: 180 }} />
				</Item>
				<Item
					label='镜片单价'
					name='glassPrice'
					style={{ marginBottom: 10 }}
				>
					<InputNumber style={{ width: 180 }} />
				</Item>
				<Item
					label='金额'
					name='amount'
					style={{ marginBottom: 10 }}
				>
					<InputNumber style={{ width: 180 }} />
				</Item>
			<Divider style={{ marginTop: 0, marginBottom: 10 }}/>
			<Item label='备注' name='comment'>
				<Input.TextArea autoSize size='large' />
			</Item>
			<Divider style={{ marginTop: 10, marginBottom: 10 }}/>
			<Item>
				<Button type='primary' onClick={handleSave}>保存</Button>
			</Item>
		</Form>
	)
}
