import Page from 'components/Page';
import React from 'react';
import ReactToExcel from 'react-html-table-to-excel';
import {
    Card,
    CardBody,
    Col,
    Row,
    Table,
    Form,
    Label,
    Input,
    Button,
} from 'reactstrap';
const tableTypes = ['hover'];
const initialState = {
    startdate: '',
    enddate: '',
    name: '',
    data: [],
    dataError: [],
    tong: [],
    tongError: [],
    datashow: [],
    dataerror: false,
};
const dataError = [
    {
        id: "",
        TenKhaoSat: " Chưa có dữ liệu",
        SoTien: "",
    }
]
const tongError = [
    {
        id: "1",
        tong: " 0",
    }
]
class bcnaptien extends React.Component {
    state = initialState;
    componentDidMount() {
        this.getdata();
    }
    getdata = async () => {
        fetch('http://smallgiving.cf/mobileapp/trangquantri/showkhaosat.php')
            .then(response => response.json())
            .then(datashow => {
                this.setState(
                    {
                        datashow: datashow,
                    },
                    () => console.log('kiemtradulieu', this.state.datashow),
                );
            });
    };
    getdatabaocao() {
        const isValid = this.validate();
        if (isValid) {
            let config = {
                method: "POST",
                body: JSON.stringify({
                    ThoiGian1: this.state.startdate,
                    ThoiGian2: this.state.enddate,
                    TenKhaoSat: this.state.name
                }),
            };
            fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/baocao/naptienks.php', config)
                .then(response => response.json())
                .then(data => {
                    if (data.message === "No post found") {
                        this.setState({ dataerror: true, dataError: dataError });
                    }
                    else {
                        this.setState(
                            {
                                dataerror: false,
                                data: data,
                            }, () => this.getdatatong(),
                        );

                    }

                });
        }
    }
    getdatatong() {
        let config2 = {
            method: "POST",
            body: JSON.stringify({
                ThoiGian1: this.state.startdate,
                ThoiGian2: this.state.enddate,
                TenKhaoSat: this.state.name,
            }),
        };
        fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/baocao/tongnaptienks.php', config2)
            .then(response => response.json())
            .then(tong => {
                this.setState(
                    {
                        tong: tong,
                    }, () => console.log('kiemtradulieu', this.state.tong),
                );
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
        let startdateError = '';
        let enddateError = '';

        if (!this.state.startdate) {
            startdateError = 'Bạn cần chọn một mốc thời gian';
        }
        if (!this.state.enddate) {
            enddateError = 'Bạn cần chọn một mốc thời gian';
        }
        if (this.state.startdate >= this.state.enddate) {
            enddateError = 'Mốc thời gian không hợp lệ';
        }
        if (startdateError || enddateError) {
            this.setState({ startdateError, enddateError });
            return false;
        }
        return true;
    };
    handleSubmit = event => {
        event.preventDefault();
        //const isValid = this.validate();
        //if (isValid) {
        //console.log(this.state);
        //clear form
        //this.setState(initialState);
        //}
    };
    render() {
        return (
            <Page
                className="bcnaptien"
                title="Tổng tiền nạp"
                breadcrumbs={[
                    { name: 'báo cáo' },
                    { name: 'giao dịch nạp tiền tài khoản khảo sát', active: true },
                ]}
            >
                {tableTypes.map((tableType, index) => (
                    <Form onSubmit={this.handleSubmit}>
                        <Row key={index}>
                            <Col>
                                <Card className="mb-3">
                                    <CardBody>
                                        <Row>
                                            <Col xl={6} lg={12} md={12}>
                                                <Form>
                                                    <Row>
                                                        <Col md={3}>
                                                            <Label for="exampleDate">
                                                                Từ ngày <span className="red-text">*</span>
                                                            </Label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <div className="error-text">
                                                                {this.state.startdateError}
                                                            </div>
                                                            <Input
                                                                type="date"
                                                                name="startdate"
                                                                value={this.state.startdate}
                                                                onChange={(val) => {
                                                                    this.setState({
                                                                        startdate: val.target.value,
                                                                        startdateError: "",
                                                                    })
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                                <Form>
                                                    <Row>
                                                        <Col md={3}>
                                                            <Label for="exampleDate">
                                                                Tài khoản khảo sát
                                                            </Label>
                                                        </Col>
                                                        <Col md={9}>

                                                            <Input
                                                                type="select"
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={(val) => {
                                                                    this.setState({
                                                                        name: val.target.value
                                                                    })
                                                                }}
                                                            ><option></option>
                                                                {this.state.datashow.map((Item, index) => (

                                                                    <option>{Item.TenKhaoSat}</option>
                                                                )
                                                                )}
                                                            </Input>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                            <Col xl={6} lg={12} md={12}>
                                                <Form>
                                                    <Row>
                                                        <Col md={3}>
                                                            <Label for="exampleDate">
                                                                Đến ngày <span className="red-text">*</span>
                                                            </Label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <div className="error-text">
                                                                {this.state.enddateError}
                                                            </div>
                                                            <Input
                                                                type="date"
                                                                name="enddate"
                                                                value={this.state.enddate}
                                                                onChange={(val) => {
                                                                    this.setState({
                                                                        enddate: val.target.value,
                                                                        enddateError: "",
                                                                    })
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                        <Table
                                            {...{ [tableType || 'hover']: true }}
                                            id="table-to-xls-1"
                                        >
                                            <thead>
                                                <tr className="table-danger">
                                                    <th>ID</th>
                                                    <th>Tài khoản khảo sát</th>
                                                    <th>Số tiền nạp</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {this.state.dataerror ?
                                                    this.state.dataError.map(Item => {
                                                        return (
                                                            <tr>
                                                                <td>{Item.id}</td>
                                                                <td>{Item.TenKhaoSat}</td>
                                                                <td>{Item.SoTien}</td>
                                                            </tr>
                                                        );
                                                    }) : this.state.data.map(Item => {
                                                        return (
                                                            <tr>
                                                                <td>{Item.idGiaoDich}</td>
                                                                <td>{Item.TenKhaoSat}</td>
                                                                <td>{Item.SoTien}</td>
                                                            </tr>
                                                        );
                                                    })}

                                            </tbody>
                                            <Row className="alig-right">
                                                <Col md={6} className="sum-left">
                                                    <div className="sum"> Tổng tiền</div>
                                                </Col>
                                                <Col md={6} className="sum-right">
                                                    {this.state.dataerror ?
                                                        this.state.tongError.map(Item => {
                                                            return (
                                                                <div className="sum">{Item.tong}</div>
                                                            );
                                                        }) : this.state.tong.map(Item => {
                                                            return (
                                                                <div className="sum">{Item.tong}</div>
                                                            );
                                                        })
                                                    }
                                                </Col>
                                            </Row>

                                        </Table>
                                        <Table {...{ [tableType || 'hover']: true }}>

                                        </Table>
                                        <div className="button-bottom">
                                            <Row>
                                                <Col md={6} className="center">
                                                    <Button
                                                        className="submit-refix"
                                                        type="submit"
                                                        color="danger"
                                                        size="lg"
                                                        onClick={() => this.getdatabaocao()}
                                                    >
                                                        Báo cáo
                          </Button>
                                                </Col>
                                                <Col md={6} className="center">
                                                    <ReactToExcel
                                                        outline
                                                        color="danger"
                                                        size="lg"
                                                        className="btn btn-excel-report"
                                                        table="table-to-xls-1"
                                                        filename="baocao"
                                                        sheet="sheet 1"
                                                        buttonText="Xuất Excel"
                                                    ></ReactToExcel>
                                                </Col>
                                            </Row>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                ))}
            </Page>
        );
    }
}
export default bcnaptien;
