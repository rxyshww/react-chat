import React, { Component } from 'react'
import { WingBlank, NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'

@connect(
    state=>state.user,
    { update }
)
class GeniusInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            avatar: '',
            desc: ''
        }
    }
    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark">牛人完善信息页面</NavBar>
                <AvatarSelector
                    selectAvatar={(avatar) => {
                        this.setState({
                            avatar
                        })
                    }}
                />
                <InputItem
                    onChange={v => this.onChange('title', v)}>
                    求职岗位
                </InputItem>
                <TextareaItem
                    title="个人简介"
                    rows={3}
                    autoHeight
                    onChange={v => this.onChange('desc', v)}>
                </TextareaItem>
                <WingBlank>
                    <Button type="primary"
                            onClick={() => this.props.update(this.state)}
                    >保存</Button>
                </WingBlank>
            </div>
        )
    }
}
export default GeniusInfo