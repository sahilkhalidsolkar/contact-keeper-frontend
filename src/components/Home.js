import React ,{useContext,useEffect}from 'react'
import Contact from './Contact'
import ContactForm from './ContactForm'
import ContactFilter from "./ContactFilter";
import AuthContext from '../context/auth/AuthContext'
const Home = (props) => {
    const authContext = useContext(AuthContext);
    useEffect(()=>{
        authContext.loadUser()

    },[])
    return (
        <div className="grid-2">
            <div>
                <ContactForm/>
            </div>
            <div>
                <ContactFilter/>
                <Contact/>
            </div>
            
        </div>
    )
}

export default Home
