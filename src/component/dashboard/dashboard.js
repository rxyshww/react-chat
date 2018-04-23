import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'

function Msg() {
    return <h2>消息首页</h2>
}

@connect(
    state=>state
)
class Dashboard extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const user = this.props.user
        const { pathname } = this.props.location
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            }, {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss'
            }, {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            }, {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]
        return (
            <div>
                <NavBar className="fixd-header" mode="dard">{navList.find(v=>v.path === pathname).title}</NavBar>

                <div style={{marginTop: 45}}>
                    <Switch>
                        {navList.map(v => (
                           <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>

                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}
export default Dashboard