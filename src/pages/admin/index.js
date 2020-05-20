import React, { Component } from 'react';
import {Link, Switch, Route, Redirect} from "react-router-dom";
import trangchu from "./trangchu"
import tintuc from "./tintuc";
import AuthModalPage from "./AuthModalPage";
import nhomnd from './nhomnd';
import nd from "./nd";
import chuyentien from './chuyentien';
import xemdk from "./xemdk"
import khaosat from './khaosat';
import diemdanh from './diemdanh';
import hoatdong from './hoatdong';
import naptien from './naptien';
import bcquyengop from './bcquyengop';
import bctaitro from './bctaitro';
import bctaitro2 from './bctaitro2';
import bcnaptien from './bcnaptien';
import Phanquyen from "./phanquyen"
import gopy from './gopy';

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Switch>
          <Route path="/admin/trangchu" component={trangchu}/>
          <Route path="/admin/phanquyen" component={Phanquyen} />
          <Route path="/admin/login-modal" component={AuthModalPage} />
          <Route path="/admin/nd" component={nd} />
          <Route path="/admin/chuyentien" component={chuyentien} />
          <Route path="/admin/tintuc" component={tintuc} />
          <Route path="/admin/bcnaptien" component={bcnaptien} />
          <Route path="/admin/bcquyengop" component={bcquyengop} />
          <Route path="/admin/bctaitro" component={bctaitro} />
          <Route path="/admin/bctaitro2" component={bctaitro2} />
          <Route path="/admin/nhomnd" component={nhomnd} />
          <Route path="/admin/gopy" component={gopy} />
          <Route path="/admin/naptien" component={naptien} />
          <Route path="/admin/khaosat" component={khaosat} />
          <Route path="/admin/diemdanh" component={diemdanh} />
          <Route path="/admin/hoatdong" component={hoatdong} />
          <Route path="/admin/xemdk" component={xemdk} />
        </Switch>
    );
  }
}

export default Index;
