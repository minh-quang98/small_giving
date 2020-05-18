// import React from 'react';
// import styled from 'styled-components';
// import ee from 'event-emitter';
// import {
//     FaBell
//   } from 'react-icons/fa';
// const Container =styled.div`
//     background-color: #ae1f17;
//     color: #ffffff;
//     padding:8px;
//     position: absolute;
//     border: 1px solid #ae1f17;
//     border-radius: 5px;
//     top : ${props => props.top}px;
//     right: -120px;
//     z-index: 999;
//     transition: top 0.5s ease;
//     > i {
//
//     }
// `;
// const emitter = new ee();
//
// export const notifydefeat = (msg) => {
//     emitter.emit('notification', msg);
// }
//  export default class NotificationDefeat extends React.Component {
//      constructor(props){
//          super(props);
//          this.state={
//              top:-200,
//              msg: '',
//          };
//          this.timeout =null;
//          emitter.on('notification', (msg) => {
//              this.onShow(msg);
//
//
//          });
//      }
//
//      onShow =(msg) => {
//          if(this.timeout){
//              clearTimeout(this.timeout);
//              this.setState({
//                  top:-200
//              }, () => {
//                  this.timeout = setTimeout(() => {
//                      this.showNotification(msg);
//                  }, 500);
//
//              });
//          } else {
//             this.showNotification(msg);
//          }
//
//      }
//
//      showNotification =(msg) =>{
//          this.setState({
//              top: -55,
//              msg
//          }, () => {
//              this.timeout= setTimeout(() => {
//                  this.setState({
//                      top:-200,
//                  });
//              }, 3000);
//          });
//      }
//      render(){
//          return(
//
//                 <Container top={this.state.top} ><FaBell/> Thất bại!<i className="fa fa-bell"></i></Container>
//
//
//
//          );
//      }
//  }
