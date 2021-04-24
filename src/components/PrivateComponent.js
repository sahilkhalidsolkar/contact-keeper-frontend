import React,{useContext} from 'react'
import { Route,Redirect} from 'react-router-dom'
import AuthContext from '../context/auth/AuthContext'
const PrivateComponent = ({component:Component,...rest}) => {
    const authContext = useContext(AuthContext);
    return (
        <Route
        {...rest}
        render={(props)=>{
           return (!authContext.isAuthenticated && !authContext.loading ?
            (<Redirect to='/login' /> ):
            (<Component {...props}/>))
        }}
        />
    )
}

export default PrivateComponent
