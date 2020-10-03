import React, { Component } from 'react'
import UserItem from './UserItem'
class Users extends Component {
    state = {
        users : [
            {
                id : '1',
                login : 'mojombo',
                avatar_url : 'https://avatars0.githubusercontent.com/u/1?v=4',
                html_url : 'https://github.com/mojombo'
            },
            {
                id : '2',
                login : 'Rahul',
                avatar_url : 'https://avatars0.githubusercontent.com/u/4?v=4',
                html_url : 'https://github.com/rahul0731'
            },
            {
                id : '3',
                login : 'mojombo',
                avatar_url : 'https://avatars0.githubusercontent.com/u/2?v=4',
                html_url : 'https://github.com/mojombo'
            }
        ]
    }
    render() {
        return (
            <div style={useStyle}>
                {this.state.users.map(user => (
                    <UserItem key={user.id} user ={user}></UserItem>
                ))}
            </div>
        )
    }
}

const useStyle = {
    display : 'grid',
    gridTemplateColumns : 'repeat(3,1fr)',
    gridGap :'1rem'
}
export default Users
