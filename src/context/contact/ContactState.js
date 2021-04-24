import React,{useReducer} from 'react'
import axios from '../../axiosdefaulturl'
import { v4 } from 'uuid';
import ContactContext from './ContactContext'
import contactReducer from './ContactReducer'
import {
    ADD_CONTACT,
    CONTACT_ERROR,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types'

const ContactState= props =>{
    const initialState={
        contacts:[],
        current:null,
        filtered:null,
        error:null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);
    // get contacts
    const getContacts=async ()=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        try {
            const res = await axios.get('/api/contacts',config) 
            dispatch({
              type:GET_CONTACTS,
              payload:res.data
          })
        } catch (error) {
            dispatch({
                type:CONTACT_ERROR,
                payload:error.msg
            })
        }
         
      }

    // add contact
    const addContact=async contact=>{
      const config={
          headers:{
              'Content-Type':'application/json'
          }
      };
      try {
          const res = await axios.post('/api/contacts',contact,config) 
          dispatch({
            type:ADD_CONTACT,
            payload:res.data
        })
      } catch (error) {
          dispatch({
              type:CONTACT_ERROR,
              payload:error.msg
          })
      }
       
    }

    // delete contact
    const deleteContact=async id=>{
        try {
             await axios.delete(`/api/contacts/${id}`) 
             dispatch({
                type:DELETE_CONTACT,
                payload:id
            })
        } catch (error) {
            dispatch({
                type:CONTACT_ERROR,
                payload:error.msg
            })
        }
        
    }

    // set current contact
    const setCurrent = contact =>{
        dispatch({
            type:SET_CURRENT,
            payload:contact
        })
    }

    // update contact
    const updateContact=async contact=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`,contact,config) 
            dispatch({
                type:UPDATE_CONTACT,
                payload:contact
            })
        } catch (error) {
            dispatch({
                type:CONTACT_ERROR,
                payload:error.msg
            })
        }
         
       
    }
    // clear current contact
    const clearCurrent = () =>{
        dispatch({
            type:CLEAR_CURRENT
        })
    }
    // filter contact
    const filterContact=(text)=>{
        dispatch({
            type:FILTER_CONTACT,
            payload:text,
        })
    }

    // clear filter
    const clearFilter=()=>{
        dispatch({
            type:CLEAR_FILTER
        })
    }
    // clear contacts
    const clearContacts= ()=>{
        dispatch({
            type:CLEAR_CONTACTS
        })
    }

    return(
        <ContactContext.Provider 
        value={{
            contacts:state.contacts,
            current:state.current,
            filtered:state.filtered,
            error:state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter,
            getContacts,
            clearContacts,
        }}
        >
            {props.children}
        </ContactContext.Provider>
    )

}
export default ContactState