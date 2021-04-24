import React ,{useContext,useEffect}from 'react'
import ContactContext from '../context/contact/ContactContext'
import ContactItem from './ContactItem'
const Contact = () => {
    const contactContext =useContext(ContactContext)
    const {contacts,filtered,getContacts,loading}=contactContext
    useEffect(()=>{
        getContacts()
    },[])
    return (
        <div>
            {filtered !== null ? filtered.map(contact=><ContactItem contact={contact} key={contact._id}/>):
            contacts.map((contact)=><ContactItem contact={contact} key={contact._id}/>)
            
            }
        </div>
    )
}

export default Contact
