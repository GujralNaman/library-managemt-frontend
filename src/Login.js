import React, {useState} from 'react'
import './assets/style/login.css'
// import login from './assets/img/login-2.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("email:",email);
    // console.log("password:",password);

    let body = {email,password};
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/login", body);
      const data = res.data;
      console.log("my token:-",data.token)

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem("user", JSON.stringify(user))

      if(data.user.role === 'admin'){
        navigate("/adminDashboard")
      }
      else if(data.user.role === 'owner'){
        navigate("/ownerDashboard")
      }
      else{
        navigate("/createissuerequest")
      }
    }
    catch(e) {
      console.log(e)
      let errorText = e?.response?.data?.error || e?.response?.data?.message;
      setError(errorText);
      console.log(e?.response?.data?.error)
    }

    setEmail('');
    setPassword('');
  }
  return (
    <div className="parent-div">

      <div className="left-div">
        {/* <img src={login} alt="login img" /> */}
      </div>

      <div className="right-div">
        <div className="container">
          <div className="screen">
            <div className="screen__content">
            <h2 className='my-login'>Login</h2>
              <form className="login" onSubmit={handleSubmit}>
                
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input type="email" className="login__input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input type="password" className="login__input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <button className="button login__submit">
                  <span className="button__text">Log In Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
              <h4 className='error'>{error}</h4>
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Login
