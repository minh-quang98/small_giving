// import logo200Image from 'assets/img/logo/logo_200.png';
// import PropTypes from 'prop-types';
// import React from 'react';
// import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
//
// class AuthForm extends React.Component {
//   get isLogin() {
//     return this.props.authState === STATE_LOGIN;
//   }
//
//   get isSignup() {
//     return this.props.authState === STATE_SIGNUP;
//   }
//
//   changeAuthState = authState => event => {
//     event.preventDefault();
//
//     this.props.onChangeAuthState(authState);
//   };
//
//   handleSubmit = event => {
//     event.preventDefault();
//   };
//
//   renderButtonText() {
//     const { buttonText } = this.props;
//
//     if (!buttonText && this.isLogin) {
//       return 'Đăng nhập';
//     }
//
//     if (!buttonText && this.isSignup) {
//       return 'Đăng xuất';
//     }
//
//     return buttonText;
//   }
//
//   render() {
//     const {
//       showLogo,
//       usernameLabel,
//       usernameInputProps,
//       passwordLabel,
//       passwordInputProps,
//       confirmPasswordLabel,
//       confirmPasswordInputProps,
//       children,
//       onLogoClick,
//     } = this.props;
//
//     return (
//       <Form onSubmit={this.handleSubmit}>
//         {showLogo && (
//           <div className="text-center pb-4">
//             <img
//               src={logo200Image}
//               className="rounded"
//               style={{ width: 80, height: 80, cursor: 'pointer' }}
//               alt="logo"
//               onClick={onLogoClick}
//             />
//           </div>
//         )}
//         <FormGroup>
//           <Label for={usernameLabel}>{usernameLabel}</Label>
//           <Input {...usernameInputProps} />
//         </FormGroup>
//         <FormGroup>
//           <Label for={passwordLabel}>{passwordLabel}</Label>
//           <Input {...passwordInputProps} />
//         </FormGroup>
//         {this.isSignup && (
//           <FormGroup>
//             <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
//             <Input {...confirmPasswordInputProps} />
//           </FormGroup>
//         )}
//         <FormGroup check>
//           <Label check>
//             <Input type="checkbox" />{' '}
//             {this.isSignup ? 'Tôi đồng ý với các điều khoản' : 'Ghi nhớ mật khẩu'}
//           </Label>
//         </FormGroup>
//         <hr />
//         <Button
//           size="lg"
//           className=" border-0"
//           block
//           onClick={this.handleSubmit}>
//           {this.renderButtonText()}
//         </Button>
//
//         <div className="text-center pt-1">
//           <h6>or</h6>
//           <h6>
//             {this.isSignup ? (
//               <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
//                 Đăng nhập
//               </a>
//             ) : (
//               <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
//                 Đăng ký
//               </a>
//             )}
//           </h6>
//         </div>
//
//         {children}
//       </Form>
//     );
//   }
// }
//
// export const STATE_LOGIN = 'LOGIN';
// export const STATE_SIGNUP = 'SIGNUP';
//
// AuthForm.propTypes = {
//   authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
//   showLogo: PropTypes.bool,
//   usernameLabel: PropTypes.string,
//   usernameInputProps: PropTypes.object,
//   passwordLabel: PropTypes.string,
//   passwordInputProps: PropTypes.object,
//   confirmPasswordLabel: PropTypes.string,
//   confirmPasswordInputProps: PropTypes.object,
//   onLogoClick: PropTypes.func,
// };
//
// AuthForm.defaultProps = {
//   authState: 'LOGIN',
//   showLogo: true,
//   usernameLabel: 'Email',
//   usernameInputProps: {
//     type: 'email',
//     placeholder: 'Nhập email',
//   },
//   passwordLabel: 'Mật khẩu',
//   passwordInputProps: {
//     type: 'password',
//     placeholder: 'Nhập mật khẩu',
//   },
//   confirmPasswordLabel: 'Xác nhận mật khẩu',
//   confirmPasswordInputProps: {
//     type: 'password',
//     placeholder: 'Xác nhận mật khẩu',
//   },
//   onLogoClick: () => {},
// };
//
// export default AuthForm;
