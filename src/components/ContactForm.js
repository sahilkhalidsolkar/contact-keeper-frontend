import React,{useState,useContext,useEffect} from 'react'
import ContactContext from '../context/contact/ContactContext'
const ContactForm = () => {

    const contactContext=useContext(ContactContext)
    const [contact, setContact] = useState({
        name:'',
        email:'',
        phone:'',
        type:'personal',
    })

    useEffect(()=>{
        if(contactContext.current!==null){
            setContact(contactContext.current)
        }
        else{
            setContact({
                name:'',
                email:'',
                phone:'',
                type:'personal',
            })
        }
    },[contactContext.current,contactContext])

    const{name,email,phone,type}=contact

    const onChange=(e)=>setContact({...contact,[e.target.name]:e.target.value})

    const onSubmit=(e)=>{
        e.preventDefault()
        if(contactContext.current){
            contactContext.updateContact(contact)
            
        }
        else{
            contactContext.addContact(contact)
        }
        setContact({
            name:'',
            email:'',
            phone:'',
            type:'personal',
        })
    }
    const clearAll=()=>{
        contactContext.clearCurrent()
    }
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{contactContext.current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" name="name" placeholder="Name" value={name} onChange={onChange}/>
            <input type="email" name="email" placeholder="Email" value={email} onChange={onChange}/>
            <input type="text" name="phone" placeholder="Phone" value={phone} onChange={onChange}/>
           <h5>Contact Type</h5>
           <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange}/>Personal {' '}
           <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange}/>Professional
           <input type="submit" 
           value={contactContext.current ? 'Update Contact' : 'Add Contact'}
           className="btn btn-primary btn-block"/>
           {contactContext.current &&
           <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
           }
        </form>
    )
}

export default ContactForm
