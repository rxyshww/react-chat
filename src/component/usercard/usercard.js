import React, { Component }  from 'react'
import { withRouter } from 'react-router-dom'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import PropTypes from 'prop-types'

@withRouter
class UserCard extends Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }

    handleClick(v) {
        this.props.history.push(`/chat/${v.user}`)
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace />
                {this.props.userlist.map(v => (
                    <div key={v._id}>
                        {v.avatar ? <Card
                            onClick={() => this.handleClick(v)}
                        >
                            <Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            />
                            <Body>
                            {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                            {v.desc.split('\n').map(d => (
                                <div key={d}>{d}</div>
                            ))}
                            {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
                            </Body>
                        </Card> : null}
                        <WhiteSpace />
                    </div>

                ))}
            </WingBlank>
        )
    }
}
export default UserCard