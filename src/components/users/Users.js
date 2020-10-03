import React from 'react'
import Spinner from '../layout/Spinner';
import UserItem from './UserItem'
import PropTypes from 'prop-types'

const Users = ({users,loading}) => {
    if(loading){
        return <Spinner/>
    }else{
        return (
            <div style={useStyle}>
                {users.map(user => (
                    <UserItem key={user.id} user ={user}></UserItem>
                ))}
            </div>
        );
    }
}

const useStyle = {
    display : 'grid',
    gridTemplateColumns : 'repeat(3,1fr)',
    gridGap :'1rem'
}

Users.prototype = {
    users : PropTypes.array.isRequired,
    loading : PropTypes.bool.isRequired,
}
export default Users
