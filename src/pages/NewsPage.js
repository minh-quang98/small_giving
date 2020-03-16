import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Col, Row, Media
} from 'reactstrap';

import Page from 'components/Page';
import moment from 'moment';

class NewsPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      detailNew1: false,
      detailNew2: false,
      fakeDate: [
        {
          title: "Sự kiện người già neo đơn",
          date: moment("12/22/2020").format("DD-MM-YYYY"),
          img: 'img/News/NGND.jpg',
          detail: "Đó là tựa đề một bài viết được đăng trên trang thông tin điện tử của báo New York Times\n" +
            "                      số ra gần đây. Tác giả bài viết này cho biết ngay cả khi sự bùng nổ của các vụ tự tử ở Hàn Quốc\n" +
            "                      ngày càng gia tăng, trường hợp tự tử của một cụ bà 78 tuổi đã tạo ra một cú sốc cho những ai nghe\n" +
            "                      thấy. Sự việc này đã thu hút rất nhiều quan tâm của dư luận cũng như đã tạo ra nhiều cuộc tranh\n" +
            "                      cãi trên các phương tiện truyền thông",

        },
        {
          title: "Trẻ em mồ côi",
          date: moment("10/03/2020").format("DD-MM-YYYY"),
          img: 'img/News/TMC.png',
          detail: "Từ bé mọi người hay nhầm con là người Trung Quốc nhưng con cảm giác mình không thuộc về\n" +
            "                      nơi đó. Con hỏi bố mẹ nuôi về gốc gác bản thân. Thật bất ngờ khi họ tiết lộ, đã xin con ở Việt Nam.\n" +
            "                      Con tự hào vì điều đó. Giờ đây, con đang đặt chân lên quê hương mình, bắt đầu hành trình tìm mẹ.\n" +
            "                      Mẹ đợi con nhé...",

        },
      ]
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
          {this.state.fakeDate.map((item, index) => (
            <Col lg="6" md="12" sm="12" xs="12">
              <Card>
                <CardBody>
                  <CardTitle style={{fontSize: 25}}>{item.title}</CardTitle>
                  <CardSubtitle>{item.date}</CardSubtitle>

                </CardBody>
                <Media
                  object
                  src={item.img}
                  style={{ width: '100%', height: '100%' }}
                />
                <CardBody>
                  {this.state.detailNew1
                    ?<div>
                      <CardText>{item.detail}</CardText>
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
          ))}
        </Row>
      </Page>
    );
  }
};

export default NewsPage;
