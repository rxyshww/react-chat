import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'


@connect(
    state=>state.chatuser,
    { getUserList }
)
class Genius extends Component {
    componentWillMount() {
        this.props.getUserList('boss')
    }
    render() {
        return <UserCard userlist={this.props.userlist}/>
    }
}
export default Genius