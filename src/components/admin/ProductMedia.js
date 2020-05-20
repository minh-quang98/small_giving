import React from 'react';
import PropTypes from 'utils/propTypes';

import { Media, Row } from 'reactstrap';
//import LinesEllipsis from 'react-lines-ellipsis';
import Typography from 'components/Typography';

class ProductMedia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getActivities();
  }

  getActivities = async () => {
    fetch('https://misappmobile.000webhostapp.com/trangquantri/hoatdongmoi.php')
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            data: data,
          },
          () => console.log('kiemtradulieu', this.state.data),
        );
      });
  };
  render() {
    return (
      <Row>
        {this.state.data.map((Item, index) => {
          return (
            <Media className="activities-fix">
              <Media left>
                <Media
                  object
                  src="https://cdn.vietnammoi.vn/stores/news_dataimages/vudt/092017/20/10/5742_MY_TAM_BEN_TRE_VU_LAN_24.jpg"
                  className="rounded mr-2 mb-2"
                  style={{ width: 100, height: 'auto' }}
                />
              </Media>
              <Media body className="overflow-hidden">
                <Media heading tag="h5" className="text-truncate">
                  {Item.TenHoatDong}
                </Media>
                <p className="text-muted text-truncate ">{Item.NoiDung}</p>
              </Media>
              <Media right className="align-self-center">
                {Item.ChiDK && typeof Item.ChiDK === 'string' ? (
                  <Typography type="h4">{Item.ChiDK}</Typography>
                ) : (
                  Item.ChiDK
                )}
              </Media>
            </Media>
          );
        })}
      </Row>
    );
  }
}

ProductMedia.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  right: PropTypes.node,
};

export default ProductMedia;
