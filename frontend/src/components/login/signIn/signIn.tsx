import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./SignIn.css";
import { useAppDispatch } from "../../../redux/store";
import { signIn } from "../../../redux/Authentication/authSlice";
import Toast from "../incorrectSignIn/incorrectSignIn";
import { useNavigate } from "react-router";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Checkbox } from "antd";
import camera from "../../../assets/images/camera1.png";
const SignInForm = () => {
  const navigation = useNavigate();

  const [showToast, setShowToast] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const login = async (e) => {
    console.log(e);
    const emailx = e.email;
    const pass = e.password;

    dispatch(
      signIn({
        email: emailx,
        password: pass,
      })
    ).then((res) => {
      console.log("res", res);
      if (res.type === "SignIn/rejected") {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } else {
        navigation("/");
      }
    });
  };

  return (
    <div>
      <div className="container">
        <div
          className="row d-flex justify-lg-content-center align-items-lg-center"
          style={{ height: "80vh" }}
        >
          <div className="col-md-12   offset-sm-1  offset-0  offset-md-0 offset-lg-4 col-lg-4    col-sm-12 login-form">
            <Form
              name="normal_login"
              className="form"
              initialValues={{
                remember: true,
              }}
              onFinish={login}
            >
              <div className="text-center">
                <img src={camera} className="camera" width="150" alt="" />
              </div>
              <Form.Item
                name="email"
                className="mt-5"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  // ref={passwordRef}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <div style={{ display: "flex", alignItems: "center" }}>
                <button type="submit" className="btn  LoginBtn">
                  Login
                </button>
              </div>
            </Form>
          </div>
        </div>
        <div style={{ textAlign: "center", width: "25%", margin: "0px auto" }}>
          {showToast ? <Toast /> : null}
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
