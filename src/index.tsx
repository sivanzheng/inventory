import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Layout, ConfigProvider } from 'antd'
import moment from 'moment'
import zhCN from 'antd/lib/locale/zh_CN'
import 'antd/dist/antd.css'
import 'moment/dist/locale/zh-cn'
import Header from './components/Header'
import Classes from './pages/Glasses'
import './index.css'

moment.locale('zh-cn')

const { Content } = Layout

function App() {
    const [locale] = useState(zhCN)
    return (
        <div className="app">
            <ConfigProvider locale={locale}>
                <Layout>
                    <Header />
                    <Content>
                        <Classes />
                    </Content>
                </Layout>
            </ConfigProvider>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
