import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Layout, ConfigProvider } from 'antd'
import moment from 'moment'
import zhCN from 'antd/lib/locale/zh_CN'
import 'antd/dist/antd.css'
import 'moment/dist/locale/zh-cn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Classes from './pages/Glasses'
import Login from './pages/Login'
import './index.css'

moment.locale('zh-cn')

const { Content } = Layout

function App() {
    const [locale] = useState(zhCN)
    return (
        <div className="app">
            <ConfigProvider locale={locale}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route
                            path='/glasses'
                            element={
                                <Layout>
                                    <Header />
                                    <Content>
                                        <Classes />
                                    </Content>
                                </Layout>
                            }
                        />
                    </Routes>

                </BrowserRouter>
            </ConfigProvider>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
