import React from 'react';
import {
    Button,
    Form,
    Label,
    Input,
    Row,
    Col,
    CardBody,
    Card,
    Container,
    Modal,
    ModalBody,
    ModalHeader,
} from 'reactstrap';
//import styled from 'styled-components';
import { withSnackbar } from 'notistack';
import Cookies from 'js-cookie';
const initialState = {
    id: '',
    account: '',
    money: '',
    user: [],
    dataway4: [],
    accountError: '',
    moneyError: '',
    dataselect: [],
    token: Cookies.get('small-giving') ? Cookies.get('small-giving') : "",
};
class Naptienthem extends React.Component {
    state = initialState;
    componentDidMount() {
        this.getUser();
        this.getdataselect();
    }
    getUser = () => {
        if (this.state.token !== "") {
            let config = {
                method: "POST",
                body: JSON.stringify({
                    token: this.state.token
                })
            }
            fetch(`http://apis.bav.edu.vn/smallgiving/checktoken.php`, config)
                .then((response) => response.json())
                .then((data) => {
                    this.setState({
                        user: data
                    })
                })
        }
    }
    getdatainsert() {
        const isValid = this.validate();
        if (isValid) {
            let config1 = {
                method: "POST",
                body: JSON.stringify({
                    idKhaoSat: this.state.account,
                    idCTV: this.state.user.idNguoiDung,
                    SoTien: this.state.money,
                }),
            };
            fetch('http://apis.bav.edu.vn/smallgiving/trangquantri/admin/naptien/khaosat.php', config1)
                .then(response => response.json())
                .then((data) => {
                    if (data.message === "success") {
                        this.setState({
                            dataway4: data
                        }, () => this.naptienWay4())

                    } else {
                        this.props.enqueueSnackbar('Thất bại', {
                            anchorOrigin: {
                                vertical: "top",
                                horizontal: "right"
                            },
                            variant: 'error',
                        });
                    }
                });
            //this.setState(initialState);
        }
    }
    naptienWay4() {
        let config2 = {
            method: "POST",
            body: JSON.stringify({
                ClientNumber: this.state.account,
                SoTien: this.state.money,
            }),
        };
        fetch('http://apis.bav.edu.vn/smallgiving/apiway4/naptien.php', config2)
            .then(response => response.json())
            .then((data) => {
                if (data.message === "success") {
                    this.props.enqueueSnackbar('Thành công!', {
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "right"
                        },
                        variant: 'success',
                    });
                    window.location.reload();

                } else {

                    this.props.enqueueSnackbar('Thất bại', {
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "right"
                        },
                        variant: 'error',
                    });

                }
            });
    }
    handleChange = event => {
        const isCheckbox = event.target.type === 'checkbox';
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value,
        });
    };
    validate = () => {
        let accountError = '';
        let moneyError = '';

        if (!this.state.account) {
            accountError = 'Bạn cần chọn một tài khoản';
        }
        if (!this.state.money) {
            moneyError = 'Bạn cần nhập một số tiền';
        }
        if (accountError || moneyError) {
            this.setState({ accountError, moneyError });
            return false;
        }
        return true;
    };
    handleSubmit = event => {
        event.preventDefault();
    };
    getdataselect = async () => {
        fetch('http://apis.bav.edu.vn/smallgiving/trangquantri/showkhaosat.php')
            .then(response => response.json())
            .then(dataselect => {
                this.setState(
                    {
                        dataselect: dataselect,
                    },
                    () => console.log('kiemtradulieu', this.state.dataselect),
                );
            });
    };
    render() {
        return (
            <Modal isOpen={this.props.show}>
                <ModalHeader className="text-danger" toggle={this.props.onHide}>
                    Thêm mới nạp tiền tài khoản khảo sát
        </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col xl={12} lg={12} md={12}>
                                <Card>
                                    <CardBody className="pd-rancach">
                                        <Form>
                                            <Row>
                                                <Col md={3}>
                                                    <Label for="exampleEmail"> Mã giao dịch</Label>
                                                </Col>
                                                <Col md={9}>
                                                    <Input
                                                        disabled="true"
                                                        type="email"
                                                        name="id"
                                                        value={this.state.id} />
                                                </Col>
                                            </Row>
                                        </Form>
                                        <Form>
                                            <Row>
                                                <Col md={3}>
                                                    <Label for="exampleSelect">
                                                        Tài khoản khảo sát <span className="red-text">*</span>
                                                    </Label>
                                                </Col>
                                                <Col md={9}>
                                                    <div className="error-text">
                                                        {this.state.accountError}
                                                    </div>
                                                    <Input
                                                        type="select"
                                                        name="account"
                                                        value={this.state.account}
                                                        onChange={val => {
                                                            this.setState({
                                                                account: val.target.value,
                                                            });
                                                        }}
                                                    ><option></option>
                                                        {this.state.dataselect.map(Item => {
                                                            return <option>{Item.idKhaoSat}</option>;
                                                        })}
                                                    </Input>
                                                </Col>
                                            </Row>
                                        </Form>
                                        <Form>
                                            <Row>
                                                <Col md={3}>
                                                    <Label for="exampleNumber">
                                                        Số tiền nạp<span className="red-text">*</span>
                                                    </Label>
                                                </Col>
                                                <Col md={9}>
                                                    <div className="error-text">
                                                        {this.state.moneyError}
                                                    </div>
                                                    <Input
                                                        type="number"
                                                        name="money"
                                                        value={this.state.money}
                                                        onChange={val => {
                                                            this.setState({
                                                                money: val.target.value,
                                                                moneyError: ""
                                                            });
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <div className="center-text-submit">
                            <Container>
                                <Button color="danger" type="submit" pill
                                    className="px-4 my-3"
                                    onClick={() => this.getdatainsert()}
                                >
                                    Nạp
                </Button>

                            </Container>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}
export default withSnackbar(Naptienthem);
