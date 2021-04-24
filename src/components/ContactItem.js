import React,{useContext} from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../context/contact/ContactContext'

const ContactItem = ({contact}) => {
const contactContext = useContext(ContactContext);
    const{name,email,phone,type,_id}=contact

    const onDelete=()=>{
        contactContext.deleteContact(_id);
        contactContext.clearCurrent()
    }
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name} 
                <span style={{float:'right'}} className={`badge ${type === 'professional' ? 'badge-success' : 'badge-primary'}`}>
                {type}
                </span>
            </h3>
            <ul className='list'>
            {email && <li>
                <i className="fas fa-envelope-open"></i> {email}
                </li>}
            {phone && <li>
                <i className="fas fa-phone"></i> {phone}
                </li>}
                <p>
                    <button className="btn btn-dark btn-sm" onClick={()=>contactContext.setCurrent(contact)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
                </p>
            </ul>
        </div>
    )
}
ContactItem.propTypes={
    contact:PropTypes.object.isRequired,
}

export default ContactItem
