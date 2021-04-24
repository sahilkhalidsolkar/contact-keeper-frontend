import React,{useState,useContext,useEffect} from 'react'
import AlertContext from '../context/alert/AlertContext'
import AuthContext from '../context/auth/AuthContext'

const Login = (props) => {

    const alertContext=useContext(AlertContext)
    const authContext = useContext(AuthContext)

    const [user, setUser] = useState({
        email:'',
        password:''
    });
    useEffect(() => {
        if(authContext.isAuthenticated){
            props.history.push('/')
        }
        if(authContext.error==='invalid credentials'){
            alertContext.setAlert(authContext.error,'danger')
            authContext.clearErrors()

        }
    }, [authContext.error,authContext.isAuthenticated]);
    const onChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        if(email===''||password===''){
            alertContext.setAlert('please enter all fields',"danger")
        }else{
            authContext.login({
                email,
                password
            })

        }
    }

    const {email,password}=user
    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"
                    onChange={onChange} required
                    />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" 
                    onChange={onChange} required
                    />
                    
                </div>
                <div>
                    <input type="submit" value="Login" className="btn btn-primary btn-block"/>
                </div>
            </form>
        </div>
    )
}

export default Login
