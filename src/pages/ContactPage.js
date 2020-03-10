import Page from 'components/Page';
import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, FormText, Input, Label, Row, } from 'reactstrap';

const ContactPage = () => {
    return ( < Page className = "ContactPage"
        title = "Liên hệ và góp ý" >
        <
        Row >
        <
        Col xl = { 6 }
        lg = { 12 }
        md = { 12 } >
        <
        Card >
        <
        CardHeader > Mọi ý kiến thắc mắc vui lòng liên hệ < /CardHeader>  <
        CardBody >
        <
        Form >
        <
        FormGroup >
        <
        Label
        for = "exampleEmail" > Số điện thoại: 0999999999 < /Label>  <
        /FormGroup>  <
        FormGroup >
        <
        Label
        for = "exampleEmail" > Họ tên: Trần Thị B < /Label>  <
        /FormGroup>  <
        FormGroup >
        <
        Label
        for = "exampleEmail" > Chức vụ: Tình nguyện viên tư vấn < /Label>  <
        /FormGroup>  <
        /Form>  <
        /CardBody>  <
        /Card>  <
        /Col> <
        Col xl = { 6 }
        lg = { 12 }
        md = { 12 } >
        <
        Card >
        <
        CardHeader > Rất mong nhận được sự góp ý của bạn < /CardHeader>  <
        CardBody >
        <
        Form >
        <
        FormGroup row >
        <
        Label
        for = "exampleEmail"
        sm = { 2 } > Email < /Label>  <
        Col sm = { 10 } >
        <
        Input type = "email"
        name = "email"
        placeholder = "Nhập email" / >
        <
        /Col>  <
        /FormGroup>  <
        FormGroup row >
        <
        Label
        for = "examplePassword"
        sm = { 2 } > SĐT < /Label>  <
        Col sm = { 10 } >
        <
        Input type = "password"
        name = "password"
        placeholder = "Nhập SĐT" / >
        <
        /Col>  <
        /FormGroup>  <
        FormGroup row >
        <
        Label
        for = "exampleSelectMulti"
        sm = { 2 } > Nội dung < /Label>  <
        Col sm = { 10 } >
        <
        Input type = "textarea"
        name = "text"
        multiple / >
        <
        /Col>  <
        /FormGroup>   <
        FormGroup check row >
        <
        Col sm = {
            { size: 10, offset: 2 } } > < Button > Gửi < /Button> </Col >
        <
        /FormGroup>  <
        /Form>  <
        /CardBody>  <
        /Card>  <
        /Col>  <
        /Row>

        <
        Row >
        <
        Col xl = { 6 }
        lg = { 12 }
        md = { 12 } >
        <
        /Col>

        <
        Col xl = { 6 }
        lg = { 12 }
        md = { 12 } >
        <
        /Col>  <
        /Row> <
        Row >
        <
        Col xl = { 6 }
        lg = { 12 }
        md = { 12 } >
        <
        /Col>

        <
        Col xl = { 6 }
        lg = { 12 }
        md = { 12 } >
        <
        /Col>  <
        /Row>

        <
        Row >
        <
        Col xl = { 6 }
        lg = { 12 }
        md = { 12 } >
        <
        /Col> <
        Col xl = { 6 }
        lg = { 12 }
        md = { 12 } >
        <
        /Col>  <
        /Row>  <
        /Page>
    );
};

export default ContactPage;