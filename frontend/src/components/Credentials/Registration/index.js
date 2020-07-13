import React from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {connect, useDispatch} from "react-redux";


const Registration = (props) => {

    /*const history = useHistory();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: "",
  });
  console.log(userInfo);
  const onChangeHandler = (event, property) => {
    const value = event.currentTarget.value;
    setUserInfo({ ...userInfo, [property]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(sendCode(userInfo));

    if (response.status < 300) {
      history.push("/auth/signup/sent");
    } else {
      console.log("error", response);
    }
  };*/


    return (
        <div>
                <div>Validation</div>
                <form>
                        <input placeholder="email" type="email" required/>
                        <input placeholder="validation code" type="number" required/>
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

export default connect(mapStateToProps)(Registration);