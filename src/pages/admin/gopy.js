import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, Col, Row, Table } from 'reactstrap';

const tableTypes = ['hover'];
const dataError = [
  {
    e1: "",
    e2: "",
    e3: "Chưa có dữ liệu",
    e4: "",
    e5: "",

  }
]
class gopy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataError: [],
      dataerror: false,
    };
  }
  componentDidMount() {
    this.getdata();
  }

  getdata = async () => {
    fetch('http://smallgiving.cf/mobileapp/trangquantri/showgopy.php')
      .then(response => response.json())
      .then(data => {
        if (data.message === "No post found") {
          this.setState({ dataerror: true, dataError: dataError });
        } else {
          this.setState(
            {
              dataerror: false,
              data: data,
            },
            () => console.log('kiemtradulieu', this.state.data),
          );
        }

      });
  };
  render() {
    return (
      <Page
        className="gopy"
        title="Quản trị góp ý"
        breadcrumbs={[{ name: 'quản trị góp ý', active: true }]}
      >
        {tableTypes.map((tableType, index) => (
          <Row key={index}>
            <Col>
              <Card className="mb-3">
                <CardBody>
                  <Table {...{ [tableType || 'hover']: true }}>
                    <thead>
                      <tr className="table-danger">
                        <th>ID</th>
                        <th>Tên nhà hảo tâm</th>
                        <th> SĐT</th>
                        <th>Email</th>
                        <th>Nội dung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.dataerror ?
                        this.state.dataError.map(Item => {
                          return (
                            <tr>
                              <td>{Item.e1}</td>
                              <td>{Item.e2}</td>
                              <td>{Item.e3}</td>
                              <td>{Item.e4}</td>
                              <td>{Item.e5}</td>
                            </tr>
                          );
                        }) : this.state.data.map(Item => {
                          return (
                            <tr>
                              <td>{Item.idGopY}</td>
                              <td>{Item.TenNguoiDung}</td>
                              <td>{Item.SDT}</td>
                              <td>{Item.Email}</td>
                              <td>{Item.NoiDung}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ))}
      </Page>
    );
  }
}
export default gopy;
