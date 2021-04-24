import React,{useState,useContext,useEffect} from 'react'
import AlertContext from '../context/alert/AlertContext'
import AuthContext from '../context/auth/AuthContext'
const Register = (props) => {
    const alertContext=useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:'',
    });
    useEffect(() => {
        if(authContext.isAuthenticated){
            props.history.push('/')
        }
        if(authContext.error==='user already exists'){
            alertContext.setAlert(authContext.error,'danger')
            authContext.clearErrors()

        }
    }, [authContext.error,authContext.isAuthenticated]);

    const {name,email,password,password2}=user
    const onChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        if(name===''|| email===''||password===''){
            alertContext.setAlert('please enter all fields',"danger")
        }
        else if(password!==password2){
            alertContext.setAlert('password don\'t match' ,"danger")
        }else{
            authContext.register({
                name,
                email,
                password
            })

        }
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name"
                    onChange={onChange} 
                    />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"
                    onChange={onChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" 
                    onChange={onChange} minLength='6' 
                    />
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="password" name="password2"  id="confirmpassword"
                    onChange={onChange} minLength='6' 
                    />
                </div>
                <div>
                    <input type="submit" value="Register" className="btn btn-primary btn-block"/>
                </div>
            </form>
        </div>
    )
}

export default Register
