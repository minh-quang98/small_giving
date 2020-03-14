import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Col, Row, Media
} from 'reactstrap';

import Page from 'components/Page';



class NewsPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      detailNew1: false,
      detailNew2: false
    }
  }

  hanldeShowDetail1 () {
    this.setState({
      detailNew1: true
    })
  }

  hanldeShowDetail2 () {
    this.setState({
      detailNew2: true
    })
  }

  hanldeHideDetail1 () {
    this.setState({
      detailNew1: false
    })
  }

  hanldeHideDetail2 () {
    this.setState({
      detailNew2: false
    })
  }

  render () {
    // let {fakeData, activeIndex} = this.state
    return (
      <Page title="Tin tức" >
        <Row>
          <Col lg="6" md="12" sm="12" xs="12">
            <Card>
              <CardBody>
                <CardTitle style={{fontSize: 25}}>Sự kiện người già neo đơn</CardTitle>
                <CardSubtitle>12/02/2020</CardSubtitle>

              </CardBody>
              <Media
                object
                src='img/News/NGND.jpg'
                style={{ width: '100%', height: '100%' }}
              />
              <CardBody>
                {this.state.detailNew1
                  ?<div>
                    <CardText>Đó là tựa đề một bài viết được đăng trên trang thông tin điện tử của báo New York Times
                      số ra gần đây. Tác giả bài viết này cho biết ngay cả khi sự bùng nổ của các vụ tự tử ở Hàn Quốc
                      ngày càng gia tăng, trường hợp tự tử của một cụ bà 78 tuổi đã tạo ra một cú sốc cho những ai nghe
                      thấy. Sự việc này đã thu hút rất nhiều quan tâm của dư luận cũng như đã tạo ra nhiều cuộc tranh
                      cãi trên các phương tiện truyền thông</CardText>
                    <div style={{cursor: 'pointer'}} onClick={()=>this.hanldeHideDetail1()}>
                      Thu gọn
                    </div>
                  </div>
                  : <div style={{cursor: 'pointer'}} onClick={()=>this.hanldeShowDetail1()}>
                    Xem thêm
                  </div>
                }
              </CardBody>
            </Card>
          </Col>

          <Col lg="6" md="12" sm="12" xs="12">
            <Card>
              <CardBody>
                <CardTitle style={{fontSize: 25}}>Trẻ em mồ côi</CardTitle>
                <CardSubtitle>10/03/2020</CardSubtitle>
              </CardBody>
              <Media
                object
                src='img/News/TMC.png'
                style={{ width: '100%', height: '100%' }}
              />
              <CardBody>
                {this.state.detailNew2
                  ?<div>
                    <CardText>‘Từ bé mọi người hay nhầm con là người Trung Quốc nhưng con cảm giác mình không thuộc về
                      nơi đó. Con hỏi bố mẹ nuôi về gốc gác bản thân. Thật bất ngờ khi họ tiết lộ, đã xin con ở Việt Nam.
                      Con tự hào vì điều đó. Giờ đây, con đang đặt chân lên quê hương mình, bắt đầu hành trình tìm mẹ.
                      Mẹ đợi con nhé...'.</CardText>
                    <div style={{cursor: 'pointer'}} onClick={()=>this.hanldeHideDetail2()}>
                      Thu gọn
                    </div>
                  </div>
                  : <div style={{cursor: 'pointer'}} onClick={()=>this.hanldeShowDetail2()}>
                    Xem thêm
                  </div>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
};

export default NewsPage;
