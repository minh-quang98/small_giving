import React from 'react';
import {
  Col, Row, Media,
} from 'reactstrap';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Page from 'components/Page';
import moment from 'moment';
import NEBN from 'assets/img/news-banner.png';
import NGND from 'assets/img/NGND.jpg';
import { Link } from 'react-router-dom';

class NewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      detailNew1: false,
      detailNew2: false,
      data: [],
      chooseId: '',
    };
  }

  componentDidMount() {
    this.getNew();
  }

  getNew = async () => {
    fetch('http://smallgiving.cf/mobileapp/Tinhoatdong/tinhoatdong.php')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
        },
        );
      });
  };

  handleExpandClick = () => {
    this.setState({
      expanded: true,
    });
  };
  handleExpandClickClose = () => {
    this.setState({
      expanded: false,
    });
  };

  hanldeShowDetail1() {
    this.setState({
      detailNew1: true,
    });
  }

  hanldeShowDetail2() {
    this.setState({
      detailNew2: true,
    });
  }

  hanldeHideDetail1() {
    this.setState({
      detailNew1: false,
    });
  }

  hanldeHideDetail2() {
    this.setState({
      detailNew2: false,
    });
  }

  render() {
    // let {fakeData, activeIndex} = this.state
    return (
      <Page
        className="bcquyengop"
        title="Tin tức"
        breadcrumbs={[
          { name: 'Tin tức' },

        ]}
      >
        <Row>
          <Col lg="1"></Col>
          <Col lg="10" md="12" sm="12" xs="12" className="fix-new-1">
            {this.state.data.map((Item, index) => {
              return (
                <Col md="12" sm="12" xs="12" className="fix-new">
                  <Card>
                    <CardHeader
                      className="text-truncate"
                      avatar={
                        <Avatar style={{ backgroundColor: '#ae1f17' }} aria-label="recipe">
                          SG
                        </Avatar>
                      }
                      title={Item.TenTin}
                      subheader={
                        // moment(Item.ThoiGian).format('DD-MM-YYYY')
                        Item.ThoiGian

                      }
                    />
                    <div className="fix-img">
                      <Media
                        object
                        src={Item.Anh}
                        className="rounded mr-2 mb-2"
                        style={{ width: '100%' }}
                      />
                    </div>

                    <CardActions disableSpacing>
                      {/*<IconButton aria-label="add to favorites">*/}
                      {/*  <FavoriteIcon />*/}
                      {/*</IconButton>*/}
                      {/*<IconButton aria-label="share">*/}
                      {/*  <ShareIcon />*/}
                      {/*</IconButton>*/}
                      <Link to={{
                        pathname: '/news-detail',
                        search: `?idTinTuc=${Item.idTin}`,
                        state: {
                          idTinTuc: Item.idTin
                        }
                      }}>
                        Xem chi tiết
                      </Link>
                    </CardActions>
                  </Card>
                </Col>
              );
            })}
          </Col>
          {/*<Col lg="2" md="12" sm="12" xs="12"></Col>*/}

        </Row>
      </Page>
    );
  }
};

export default NewsPage;
