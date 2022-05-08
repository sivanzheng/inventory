import React, { useEffect, useState } from 'react'
import Q from 'q'
import moment from 'moment'
import { cloneDeep } from 'lodash'
import { Table, TablePaginationConfig, Button, message, Modal, Space, Form, Input, Divider, DatePicker } from 'antd'
import { ExclamationCircleOutlined, PlusOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons'
import { getGlassesList, createOrSaveGlasses, deleteGlasses, searchGlasses } from '@src/api/controller/glasses'
import Glasses, { LR, GlassesRow } from '@src/api/models/Glasses'
import { PageRequest } from '@src/api/models/Page'
import GlassesForm from './GlassesForm'

const toFixed2 = (value: number) => {
	if (!value) return 0
	if (value > 0) {
		return `+${value.toFixed(2)}`
	}
	if (value < 0) return value.toFixed(2)
}

const toPageQuery = (pageReq: PageRequest) => ({
	page: pageReq.page.toString(),
	size: pageReq.size.toString(),
})

const LRLabel = {
	[LR.L]: 'L',
	[LR.R]: 'R'
}

const formatGlassesList = (glasses: Glasses[]): GlassesRow[] => {
	const result = []
	const data = cloneDeep(glasses)
	for (const row of data) {
		const eyes = row.eyes
		delete row.eyes
		
		const rightEye = eyes.find(v => v.lr === LR.R)
		if (rightEye) {
			result.push({
				...row,
				...rightEye,
				rowKey: `${row.id}-${LR.R}`
			})
		} else {
			result.push({
				...row,
				rowKey: `${row.id}-${LR.R}`
			})
		}
		
		const leftEye = eyes.find(v => v.lr === LR.L)
		if (leftEye) {
			result.push({
				...row,
				...leftEye,
				rowKey: `${row.id}-${LR.L}`
			})
		} else {
			result.push({
				...row,
				rowKey: `${row.id}-${LR.L}`
			})
		}
	}
	return result
}

const mergeRow = (row: GlassesRow, index: number) => {
	if (index % 2 === 0) return { rowSpan: 2 }
	return { rowSpan: 0 }
}

export default function Classes() {
	const [form] = Form.useForm()
	const [isSearch, setIsSearch] = useState<boolean>(false)
	const [page, setPage] = useState<PageRequest>({ page: 1, size: 20 })
	const [total, setTotal] = useState<number>(0)
	const [loading, setLoaging] = useState<boolean>(false)
	const [glasses, setGlasses] = useState<Glasses[]>([])
	const [dataSource, setDataSource] = useState<GlassesRow[]>([])

	const handleChange = (pagination: TablePaginationConfig) => {
		setPage({ page: pagination.current, size: pagination.pageSize })
	}

	const handleCreate = async () => {
		const data = await showFormModal()
		if (!data) return
		const res = await createOrSaveGlasses(data)
		if (res) {
			message.success('新增成功')
			getList(page)
		}
	}

	const handleEdit = async (row: GlassesRow) => {
		const data = glasses.find(v => v.id === row.id)
		if (!data) {
			message.warn('找不到需要的数据')
			return
		}
		const editedData = await showFormModal(data)
		if (!editedData) return
		const res = await createOrSaveGlasses(editedData)
		if (res) {
			message.success('保存成功')
			getList(page)
		}
	}

	const handleDelete = (row: GlassesRow) => {
		Modal.confirm({
			title: '确定删除这条记录吗?',
			icon: <ExclamationCircleOutlined />,
			content: '记录被删除后不可恢复，是否继续？',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk: async () => {
				const res = await deleteGlasses({ params: { id: row.id.toString() } })
				if (res) {
					message.success('删除成功')
				} else {
					message.error('删除失败')
				}
				getList(page)
			}
		})
	}

	const getList = async (p: PageRequest) => {
		setLoaging(true)
		const res = await getGlassesList({ query: toPageQuery(p) })
		setLoaging(false)
		const { data, total } = res
		setTotal(total)
		setGlasses(data)
		const formated = formatGlassesList(data)
		setDataSource(formated)
	}

	const showFormModal = async (glasses?: Glasses) => {
		const d = Q.defer<Glasses>()
		Modal.confirm({
			icon: null,
			width: '80%',
			closable: true,
			content: <GlassesForm glasses={glasses} onSave={(data: Glasses) => d.resolve(data)} />,
			okButtonProps: { style: { display: 'none' } },
			cancelButtonProps: { style: { display: 'none' } },
			onCancel: () => {
				d.resolve(null)
			}
		})
		const res = await d.promise
		Modal.destroyAll()
		return res
	}

	const handleSearch = async () => {
		setIsSearch(true)
		const values = form.getFieldsValue()
		setLoaging(true)

		let query: any = {
			page: '1',
			size: page.size.toString(),
		}
		if (values.name) {
			query.name = values.name
		}
		if (values.phone) {
			query.phone = values.phone
		}
		if (values.orderID) {
			query.orderID = values.orderID
		}
		if (values.dateRange) {
			query.startAt = values.dateRange[0].valueOf()
			query.endAt = values.dateRange[1].valueOf()
		}
		const res = await searchGlasses({ query })
		setLoaging(false)

		const { data, total } = res
		setTotal(total)
		setGlasses(data)
		const formated = formatGlassesList(data)
		setDataSource(formated)
		setPage({ page: 1, size: page.size })
		setIsSearch(false)
	}

	useEffect(() => {
		(async () => {
			if (!isSearch) {
				await getList(page)
			}
		})()
	}, [page.page, page.size])

	return (
		<div style={{ padding: 10 }}>
			<Space style={{ marginTop: 10 }}>
				<Button icon={<PlusOutlined />} onClick={handleCreate}>新增</Button>
				<Button icon={<RedoOutlined />} onClick={() => getList(page)}>刷新</Button>
			</Space>
			<Divider style={{ margin: '10px 0' }} />
			<Space style={{ marginBottom: 10 }}>
				<Form form={form} layout='inline'>
					<Form.Item name='name'>
						<Input placeholder='输入客户姓名' />
					</Form.Item>
					<Form.Item name='phone'>
						<Input placeholder='输入客户电话号码' />
					</Form.Item>
					<Form.Item name='orderID'>
						<Input placeholder='输入单号' />
					</Form.Item>
					<Form.Item name='dateRange'>
						<DatePicker.RangePicker placeholder={['开始的日期', '结束的日期']} />
					</Form.Item>
					<Form.Item>
						<Button icon={<SearchOutlined />} onClick={handleSearch}>搜索</Button>
					</Form.Item>
				</Form>
			</Space>
			<Table
				bordered
				size='small'
				scroll={{ x: 1500 }}
				pagination={{
					total,
					hideOnSinglePage: false,
					showSizeChanger: true,
					pageSize: page.size,
				}}
				rowKey='rowKey'
				loading={loading}
				columns={[
					{
						title: '定配日期',
						dataIndex: 'orderAt',
						key: 'orderAt',
						width: 90,
						fixed: 'left',
						onCell: mergeRow,
						render: (value) => moment(Number(value)).format('YYYY-MM-DD')
					},
					{
						title: '姓名',
						dataIndex: 'name',
						key: 'name',
						width: 90,
						fixed: 'left',
						onCell: mergeRow
					},
					{
						title: '单号',
						dataIndex: 'orderID',
						key: 'orderID',
						width: 90,
						onCell: mergeRow
					},
					{
						title: '电话',
						dataIndex: 'phone',
						key: 'phone',
						width: 120,
						onCell: mergeRow
					},
					{
						title: '镜架品牌',
						dataIndex: 'frameBrand',
						key: 'frameBrand',
						width: 100,
						onCell: mergeRow
					},
					{
						title: '镜架型号',
						dataIndex: 'frameModel',
						key: 'frameModel',
						width: 120,
						onCell: mergeRow
					},
					{
						title: '镜框高度',
						dataIndex: 'frameHeight',
						key: 'frameHeight',
						width: 80,
						onCell: mergeRow
					},
					{
						title: '镜框尺寸',
						dataIndex: 'frameSize',
						key: 'frameSize',
						width: 80,
						onCell: mergeRow
					},
					{
						title: '镜片品牌',
						dataIndex: 'glassBrand',
						key: 'glassBrand',
						width: 100,
						onCell: mergeRow
					},
					{
						title: '折射率',
						dataIndex: 'indexOfRefraction',
						key: 'indexOfRefraction',
						width: 60,
						onCell: mergeRow
					},
					{
						title: '系数',
						dataIndex: 'glassModel',
						key: 'glassModel',
						width: 150,
						onCell: mergeRow
					},
					{
						title: 'L/R',
						dataIndex: 'lr',
						key: 'lr',
						width: 40,
						render: (lr: LR) => LRLabel[lr],
					},
					{
						title: '片数',
						dataIndex: 'glassCount',
						key: 'glassCount',
						width: 50,
					},
					{
						title: '度数',
						children: [
							{ 
								title: '球镜',
								dataIndex: 'degreeS',
								key: 'degreeS',
								width: 80,
								render: toFixed2
							},
							{
								title: '柱镜',
								dataIndex: 'degreeC',
								key: 'degreeC',
								width: 80,
								render: toFixed2
							},
							{
								title: '轴向',
								dataIndex: 'axial',
								key: 'axial',
								width: 80,
							},
						]
					},
					{
						title: '瞳高(PH)',
						dataIndex: 'ph',
						key: 'ph',
						width: 50,
					},
					{
						title: '瞳距(PD)',
						dataIndex: 'pd',
						key: 'pd',
						width: 50,
					},
					{
						title: '远用瞳距',
						dataIndex: 'sumPD',
						key: 'sumPD',
						width: 50,
						onCell: mergeRow
					},
					{
						title: '镜架单价',
						dataIndex: 'framePrice',
						key: 'framePrice',
						width: 80,
						onCell: mergeRow,
						render: (value) => value ? `¥ ${value}` : ''
					},
					{
						title: '镜片单价',
						dataIndex: 'glassPrice',
						key: 'glassPrice',
						width: 80,
						onCell: mergeRow,
						render: (value) => value ? `¥ ${value}` : ''
					},
					{
						title: '金额',
						dataIndex: 'amount',
						key: 'amount',
						width: 80,
						onCell: mergeRow,
						render: (value) => value ? `¥ ${value}` : ''
					},
					{
						title: '备注',
						dataIndex: 'comment',
						key: 'comment',
						width: 120,
						onCell: mergeRow
					},
					{
						title: '操作',
						key: 'option',
						fixed: 'right',
						width: 115,
						onCell: mergeRow,
						render: (_, row) => (
							<Button.Group size='small'>
								<Button onClick={() => handleEdit(row)}>编辑</Button>
								<Button onClick={() => handleDelete(row)}>删除</Button>
							</Button.Group>
						),
					}
				]}
				dataSource={dataSource}
				onChange={handleChange}
			/>
		</div>
	)
}