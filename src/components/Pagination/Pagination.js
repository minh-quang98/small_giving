import React from 'react';
import ReactPagination from 'react-js-pagination';

class Pagination extends React.Component {
  render() {
    return (
      <nav aria-label="Page navigation" className="nav-pagination">
        <ReactPagination activePage={this.props.activePage}
                         itemClass={`page-item`}
                         linkClass={`page-link mr-1`}
                         itemsCountPerPage={this.props.itemsCountPerPage}
                         totalItemsCount={this.props.totalItemsCount}
                         onChange={(e) => this.props.changeHandler(e)}/>
      </nav>
    );
  }
}

export default Pagination;
