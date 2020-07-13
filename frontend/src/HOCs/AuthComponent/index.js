import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

const authComponent = (WrappedComponent) => (props) => {
  const { push } = useHistory();
  const {
    state: { token },
  } = props;

  useEffect(() => {
    if (!token) push("/");
  }, [token, push]);

  return <WrappedComponent />;
};

const mapStateToProps = (state) => {
  return {
    state: state.authReducer,
  };
};

export default compose(connect(mapStateToProps), authComponent);
