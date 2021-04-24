import React,{useReducer} from 'react'
import AuthContext from './AuthContext'
import axios from '../../axiosdefaulturl'
import AuthReducer from './AuthReducer'
import setAuthToken from '../../utils/setAuthToken'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

const AuthState= props =>{
    const initialState={

        token:localStorage.getItem('token'),
        isAuthenticated:null,
        loading:true,
        user:null,
        error:null,


    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // load user
    const loadUser = async ()=>{
        // load token in to global header
       
        if(localStorage.getItem('token')){
            setAuthToken(localStorage.getItem('token'))
        }
        try {
            const res= await axios.get('/api/auth')
            dispatch({
                type:USER_LOADED,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type:AUTH_ERROR
            })
        }
    }
    // register user
    const register= async formData=>{
        const config={
            headers:{
                'Content-type':'application/json'  
            }
        }
        try {
            const res=await axios.post('/api/users',formData,config)
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
            loadUser()
        } catch (error) {
            console.log(error)
            dispatch({
                type:REGISTER_FAIL,
                payload:error.response.data.msg
            })
        }
    }

    // login user
    const login= async formData=>{
        const config={
            headers:{
                'Content-type':'application/json'  
            }
        }
        try {
            const res=await axios.post('/api/auth',formData,config)
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
            loadUser()
        } catch (error) {
            console.log(error)
            dispatch({
                type:LOGIN_FAIL,
                payload:error.response.data.msg
            })
        }
    }
    // logout
    const logout = ()=>dispatch({type:LOGOUT})
    // clear errors
    const clearErrors = ()=>{
        dispatch({
            type:CLEAR_ERRORS
        })
    }
    

    return(
        <AuthContext.Provider 
        value={{
            token:state.token,
            isAuthenticated:state.isAuthenticated,
            loading:state.loading,
            user:state.user,
            error:state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors

        }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}
export default AuthState
