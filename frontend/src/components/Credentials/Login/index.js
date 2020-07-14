import React from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {connect, useDispatch} from "react-redux";


const Login = (props) => {
    /*const { authReducer } = props;
  console.log("authReducer", authReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  console.log("loginInfo", loginInfo);
  const handleEmail = (e) => {
    const value = e.currentTarget.value;
    setloginInfo({
      ...loginInfo,
      email: value,
    });
  };

  const handlePassword = (e) => {
    const value = e.currentTarget.value;
    setloginInfo({
      ...loginInfo,
      password: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("in the submit");
    const response = await dispatch(sendLoginAction(loginInfo));
    if (response.status < 300) {
      history.push("/");
    }
  };*/

    return (
        <div>
                <div>Login</div>
                <form>
                        <input placeholder="email" type="email" required/>
                        <input placeholder="password" type="password" required/>
                </form>
        </div>
   );
};


const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(Login);