(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{246:function(e,t,a){"use strict";var n=a(61),r=a(15),l=a(4),c=a.n(l),s=a(0),i=a.n(s),o=(a(33),{h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6","display-1":"h1","display-2":"h1","display-3":"h1","display-4":"h1",p:"p",lead:"p",blockquote:"blockquote"}),m=function(e){var t,a=e.tag,l=e.className,s=e.type,m=Object(r.a)(e,["tag","className","type"]),u=c()(Object(n.a)({},s,!!s),l);return t=a||(!a&&o[s]?o[s]:"p"),i.a.createElement(t,Object.assign({},m,{className:u}))};m.defaultProps={type:"p"},t.a=m},247:function(e,t,a){"use strict";var n=a(15),r=a(0),l=a.n(r),c=(a(33),a(46)),s=a(308),i=a(309),o=a(246),m=c.a.create("page"),u=function(e){var t=e.title,a=e.breadcrumbs,r=e.tag,c=e.className,u=e.children,d=Object(n.a)(e,["title","breadcrumbs","tag","className","children"]),p=m.b("px-3",c);return l.a.createElement(r,Object.assign({className:p},d),l.a.createElement("div",{className:m.e("header")},t&&"string"===typeof t?l.a.createElement(o.a,{type:"h3",className:m.e("title")},t):t,a&&l.a.createElement(s.a,{className:m.e("breadcrumb")},l.a.createElement(i.a,null,"Home"),a.length&&a.map(function(e,t){var a=e.name,n=e.active;return l.a.createElement(i.a,{key:t,active:n},a)}))),u)};u.defaultProps={tag:"div",title:""},t.a=u},258:function(e,t,a){"use strict";a.d(t,"b",function(){return o}),a.d(t,"a",function(){return m});var n=a(2),r=a(304),l=a.n(r),c=a(0),s=a.n(c),i=s.a.createContext({});i.Consumer,i.Provider;function o(e,t){var a=Object(c.useContext)(i);return e||a[t]||t}function m(e,t){"string"===typeof t&&(t={prefix:t});var a=e.prototype&&e.prototype.isReactComponent,r=t,c=r.prefix,i=r.forwardRefAs,m=void 0===i?a?"ref":"innerRef":i;return l()(function(t,a){var r=Object(n.a)({},t);r[m]=a;var l=o(r.bsPrefix,c);return s.a.createElement(e,Object(n.a)({},r,{bsPrefix:l}))},{displayName:"Bootstrap("+(e.displayName||e.name)+")"})}},272:function(e,t,a){"use strict";var n=a(2),r=a(7),l=a(0),c=a.n(l),s=a(1),i=a.n(s),o=a(4),m=a.n(o),u=a(3),d={className:i.a.string,cssModule:i.a.object,size:i.a.string,bordered:i.a.bool,borderless:i.a.bool,striped:i.a.bool,inverse:Object(u.h)(i.a.bool,'Please use the prop "dark"'),dark:i.a.bool,hover:i.a.bool,responsive:i.a.oneOfType([i.a.bool,i.a.string]),tag:u.p,responsiveTag:u.p,innerRef:i.a.oneOfType([i.a.func,i.a.string,i.a.object])},p=function(e){var t=e.className,a=e.cssModule,l=e.size,s=e.bordered,i=e.borderless,o=e.striped,d=e.inverse,p=e.dark,f=e.hover,h=e.responsive,b=e.tag,v=e.responsiveTag,E=e.innerRef,g=Object(r.a)(e,["className","cssModule","size","bordered","borderless","striped","inverse","dark","hover","responsive","tag","responsiveTag","innerRef"]),N=Object(u.l)(m()(t,"table",!!l&&"table-"+l,!!s&&"table-bordered",!!i&&"table-borderless",!!o&&"table-striped",!(!p&&!d)&&"table-dark",!!f&&"table-hover"),a),y=c.a.createElement(b,Object(n.a)({},g,{ref:E,className:N}));if(h){var x=!0===h?"table-responsive":"table-responsive-"+h;return c.a.createElement(v,{className:x},y)}return y};p.propTypes=d,p.defaultProps={tag:"table",responsiveTag:"div"},t.a=p},304:function(e,t,a){"use strict";t.__esModule=!0,t.default=function(e,t){var a=void 0===t?{}:t,n=a.propTypes,l=a.defaultProps,c=a.allowFallback,s=void 0!==c&&c,i=a.displayName,o=void 0===i?e.name||e.displayName:i,m=function(t,a){return e(t,a)};return Object.assign(r.default.forwardRef||!s?r.default.forwardRef(m):function(e){return m(e,null)},{displayName:o,propTypes:n,defaultProps:l})};var n,r=(n=a(0))&&n.__esModule?n:{default:n}},603:function(e,t,a){"use strict";a.r(t);var n=a(24),r=a(25),l=a(27),c=a(26),s=a(28),i=a(247),o=a(0),m=a.n(o),u=a(310),d=a(311),p=a(272),f=a(211),h=a(213),b=a(255),v=a(260),E=a.n(v),g=a(2),N=a(7),y=a(4),x=a.n(y),T=a(258),j=a(12);var O=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return t.filter(function(e){return null!=e}).reduce(function(e,t){if("function"!==typeof t)throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");return null===e?t:function(){for(var a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];e.apply(this,n),t.apply(this,n)}},null)};function w(e){return!e||"#"===e.trim()}var P=m.a.forwardRef(function(e,t){var a=e.as,n=void 0===a?"a":a,r=e.disabled,l=e.onKeyDown,c=Object(N.a)(e,["as","disabled","onKeyDown"]),s=function(e){var t=c.href,a=c.onClick;(r||w(t))&&e.preventDefault(),r?e.stopPropagation():a&&a(e)};return w(c.href)&&(c.role=c.role||"button",c.href=c.href||"#"),r&&(c.tabIndex=-1,c["aria-disabled"]=!0),m.a.createElement(n,Object(g.a)({ref:t},c,{onClick:s,onKeyDown:O(function(e){" "===e.key&&(e.preventDefault(),s(e))},l)}))});P.displayName="SafeAnchor";var k=P,C=m.a.forwardRef(function(e,t){var a=e.active,n=e.disabled,r=e.className,l=e.style,c=e.activeLabel,s=e.children,i=Object(N.a)(e,["active","disabled","className","style","activeLabel","children"]),o=a||n?"span":k;return m.a.createElement("li",{ref:t,style:l,className:x()(r,"page-item",{active:a,disabled:n})},m.a.createElement(o,Object(g.a)({className:"page-link",disabled:n},i),s,a&&c&&m.a.createElement("span",{className:"sr-only"},c)))});C.defaultProps={active:!1,disabled:!1,activeLabel:"(current)"},C.displayName="PageItem";var S=C;function R(e,t,a){var n,r;return void 0===a&&(a=e),r=n=function(e){function n(){return e.apply(this,arguments)||this}return Object(j.a)(n,e),n.prototype.render=function(){var e=this.props,n=e.children,r=Object(N.a)(e,["children"]);return delete r.active,m.a.createElement(C,r,m.a.createElement("span",{"aria-hidden":"true"},n||t),m.a.createElement("span",{className:"sr-only"},a))},n}(m.a.Component),n.displayName=e,r}var M=R("First","\xab"),z=R("Prev","\u2039","Previous"),D=R("Ellipsis","\u2026","More"),I=R("Next","\u203a"),Y=R("Last","\xbb"),A=m.a.forwardRef(function(e,t){var a=e.bsPrefix,n=e.className,r=e.children,l=e.size,c=Object(N.a)(e,["bsPrefix","className","children","size"]),s=Object(T.b)(a,"pagination");return m.a.createElement("ul",Object(g.a)({ref:t},c,{className:x()(n,s,l&&s+"-"+l)}),r)});A.First=M,A.Prev=z,A.Ellipsis=D,A.Item=S,A.Next=I,A.Last=Y;var L=A;function q(e,t,a,n){return{stt:e,ngayThang:t,tenChuongtrinh:a,soTien:n}}var V=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(c.a)(t).call(this,e))).handleChangePage=function(e){a.setState({pageNumber:e-1},function(){})},a.state={listdata:[q("1","02/02/2020","Ng\u01b0\u1eddi gi\xe0 neo \u0111\u01a1n","5000000"),q("2","01/03/2020","Gi\xfap \u0111\u1ee1 tr\u1ebb em ch\u1ea5t \u0111\u1ed9c m\xe0u da cam","20000000"),q("3","01/09/2020","Nh\u1eefng t\u1ea5m l\xf2ng cao c\u1ea3","1000000")],page:0,pageSize:10,totalItem:0},a}return Object(s.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.state,t=e.listdata,a=(e.page,e.totalItem);e.pageSize;return m.a.createElement(i.a,{title:"L\u1ecbch s\u1eed giao d\u1ecbch"},m.a.createElement(u.a,null,m.a.createElement(d.a,null,m.a.createElement(p.a,null,m.a.createElement("thead",null,m.a.createElement("tr",null,m.a.createElement("th",{className:"text-center"},"T\u1ed5ng chi quy\xean g\xf3p"),m.a.createElement("th",{className:"text-center"},"T\u1ed5ng thu t\u1eeb kh\u1ea3o s\xe1t"),m.a.createElement("th",{className:"text-center"},"T\u1ed5ng d\u01b0 c\xf2n l\u1ea1i"))),m.a.createElement("thead",null,m.a.createElement("tr",null,m.a.createElement("th",{className:"text-center"},"10.00.000 VN\u0110"),m.a.createElement("th",{className:"text-center"},"300.000 VN\u0110"),m.a.createElement("th",{className:"text-center"},"2.000.000 VN\u0110")))))),m.a.createElement(u.a,null,m.a.createElement(d.a,{xl:6,lg:12,md:12},m.a.createElement(f.a,{style:{marginTop:10}},m.a.createElement(h.a,{style:{color:"#ae1f17",fontSize:"18px",textAlign:"center",marginTop:10}},m.a.createElement("b",null,"Giao d\u1ecbch cho quy\xean g\xf3p")),m.a.createElement(p.a,{bordered:!0,responsive:!0},m.a.createElement("thead",null,m.a.createElement("tr",null,m.a.createElement("th",{className:"text-center"},"STT"),m.a.createElement("th",{className:"text-center"},"Ng\xe0y th\xe1ng"),m.a.createElement("th",{className:"text-center"},"T\xean ch\u01b0\u01a1ng tr\xecnh"),m.a.createElement("th",{className:"text-center"},"S\u1ed1 ti\u1ec1n chi quy\xean g\xf3p"))),t.map(function(e,t){return m.a.createElement("tbody",null,m.a.createElement("tr",null,m.a.createElement("th",{scope:"row",className:"text-center"},e.stt),m.a.createElement("td",{className:"text-center"},E()(e.ngayThang).format("DD/MM/YYYY")),m.a.createElement("td",null,e.tenChuongtrinh),m.a.createElement("td",{className:"text-right"},m.a.createElement(b.a,{value:e.soTien,displayType:"text",thousandSeparator:!0,suffix:"VN\u0110"}))))}),m.a.createElement("div",{className:"pagination-right"},m.a.createElement(L,null,m.a.createElement(L.Prev,null),m.a.createElement(L.Item,null,a),m.a.createElement(L.Next,null)))))),m.a.createElement(d.a,{xl:6,lg:12,md:12},m.a.createElement(f.a,{style:{marginTop:10}},m.a.createElement(h.a,{style:{color:"#ae1f17",fontSize:"18px",textAlign:"center",marginTop:10}},m.a.createElement("b",null,"Giao d\u1ecbch l\xe0m kh\u1ea3o s\xe1t")),m.a.createElement(p.a,{bordered:!0,responsive:!0},m.a.createElement("thead",null,m.a.createElement("tr",null,m.a.createElement("th",{className:"text-center"},"STT"),m.a.createElement("th",{className:"text-center"},"Ng\xe0y th\xe1ng"),m.a.createElement("th",{className:"text-center"},"t\xean Kh\u1ea3o s\xe1t"),m.a.createElement("th",{className:"text-center"},"S\u1ed1 ti\u1ec1n thu t\u1eeb kh\u1ea3o s\xe1t"))),t.map(function(e,t){return m.a.createElement("tbody",null,m.a.createElement("tr",null,m.a.createElement("th",{scope:"row",className:"text-center"},e.stt),m.a.createElement("td",{className:"text-center"},E()(e.ngayThang).format("DD/MM/YYYY")),m.a.createElement("td",null,e.tenChuongtrinh),m.a.createElement("td",{className:"text-right"},m.a.createElement(b.a,{value:e.soTien,displayType:"text",thousandSeparator:!0,suffix:"VN\u0110"}))))}),m.a.createElement("div",{className:"pagination-right"},m.a.createElement(L,null,m.a.createElement(L.Prev,null),m.a.createElement(L.Item,null,a),m.a.createElement(L.Next,null))))))))}}]),t}(m.a.Component);t.default=V}}]);
//# sourceMappingURL=14.dd22cb01.chunk.js.map