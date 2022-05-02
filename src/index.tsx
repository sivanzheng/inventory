import React from 'react'
import ReactDOM from 'react-dom'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import moment from 'moment';
import 'moment/dist/locale/zh-cn'
import Header from './components/Header'
import Classes from './pages/Glasses'
import './index.css'

moment.locale('zh-cn')

const { Content } = Layout

function App() {
    return (
        <div className="app">
            <Layout>
                <Header />
                <Content>
                    <Classes />
                </Content>
            </Layout>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
