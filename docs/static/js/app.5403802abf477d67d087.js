webpackJsonp([0],{"+g97":function(e,t){},"5Pt7":function(e,t){},"88SP":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("7+uW"),r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]},a=n("VU/8")({name:"app"},r,!1,function(e){n("vCVQ")},null,null).exports,i=n("/ocq"),s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"main"},[n("h1",[e._v("Vue XO")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.userName,expression:"userName"}],attrs:{autocomplete:"off",type:"text",name:"username",id:"username",placeholder:"Username"},domProps:{value:e.userName},on:{input:function(t){t.target.composing||(e.userName=t.target.value)}}}),n("br"),n("br"),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.room,expression:"room"}],attrs:{autocomplete:"off",type:"text",name:"room",id:"room",placeholder:"Room"},domProps:{value:e.room},on:{input:function(t){t.target.composing||(e.room=t.target.value)}}}),n("br"),n("br"),e._v(" "),n("router-link",{staticClass:"button",attrs:{to:{name:"game",params:{userName:e.userName,room:e.room}}}},[e._v("\n  Let's Play!\n  ")])],1)},staticRenderFns:[]},m=n("VU/8")({name:"mainEl",data:function(){return{userName:"",room:""}}},s,!1,function(e){n("5Pt7")},null,null).exports,l={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"tile"},[this._v(this._s(this.symbol))])},staticRenderFns:[]},c={name:"checkerboard",components:{tile:n("VU/8")({name:"tile",props:["symbol"],data:function(){return{}}},l,!1,function(e){n("lyIV")},"data-v-79cf1a51",null).exports},props:["symbol","room"],data:function(){return{canMove:!1,fields:{1:{mark:"",frozen:!1},2:{mark:"",frozen:!1},3:{mark:"",frozen:!1},4:{mark:"",frozen:!1},5:{mark:"",frozen:!1},6:{mark:"",frozen:!1},7:{mark:"",frozen:!1},8:{mark:"",frozen:!1},9:{mark:"",frozen:!1}}}},methods:{addSymbol:function(e){if(this.canMove){var t=e.target.id,n=this.fields;return n[t].frozen?(console.log("tile "+t+" not empty"),0):(n[t].mark=this.symbol,n[t].frozen=!0,this.$socket.emit("sendFields",this.fields,this.room),this.canMove=!1,1)}}},created:function(){"x"===this.symbol&&(this.canMove=!0)},sockets:{receiveFields:function(e){this.fields=e,this.canMove=!0},freezePlayers:function(){console.log("You are freezed!! XD"),this.canMove=!1}}},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"checkerboard"},[n("tile",{attrs:{id:"1",symbol:e.fields[1].mark},nativeOn:{click:function(t){e.addSymbol(t)}}}),e._v(" "),n("tile",{attrs:{id:"2",symbol:e.fields[2].mark},nativeOn:{click:function(t){e.addSymbol(t)}}}),e._v(" "),n("tile",{attrs:{id:"3",symbol:e.fields[3].mark},nativeOn:{click:function(t){e.addSymbol(t)}}}),e._v(" "),n("tile",{attrs:{id:"4",symbol:e.fields[4].mark},nativeOn:{click:function(t){e.addSymbol(t)}}}),e._v(" "),n("tile",{attrs:{id:"5",symbol:e.fields[5].mark},nativeOn:{click:function(t){e.addSymbol(t)}}}),e._v(" "),n("tile",{attrs:{id:"6",symbol:e.fields[6].mark},nativeOn:{click:function(t){e.addSymbol(t)}}}),e._v(" "),n("tile",{attrs:{id:"7",symbol:e.fields[7].mark},nativeOn:{click:function(t){e.addSymbol(t)}}}),e._v(" "),n("tile",{attrs:{id:"8",symbol:e.fields[8].mark},nativeOn:{click:function(t){e.addSymbol(t)}}}),e._v(" "),n("tile",{attrs:{id:"9",symbol:e.fields[9].mark},nativeOn:{click:function(t){e.addSymbol(t)}}})],1)},staticRenderFns:[]},d={name:"game",components:{checkerboard:n("VU/8")(c,u,!1,function(e){n("88SP")},"data-v-4362b1a0",null).exports},data:function(){return{userName:this.$route.params.userName,players:{},room:this.$route.params.room,symbol:"",winner:""}},mounted:function(){this.room&&this.userName||this.$router.replace("/")},created:function(){var e=this.userName;this.$socket.emit("join-room",this.room,e)},methods:{leaveRoom:function(){console.log("leaving room "+this.room),this.$socket.emit("leaveRoom",this.room)}},sockets:{symbolFromServer:function(e){this.symbol=e,console.log("Got symbol: "+e)},roomPlayers:function(e){this.players=e},annouceWinner:function(e){this.winner=e}}},f={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"game"},[n("h1",[e._v("Game")]),e._v(" "),this.winner?n("h2",[e._v("The winner is: "+e._s(this.winner))]):e._e(),e._v(" "),this.symbol?e._e():n("h2",[e._v("Waiting for player to join")]),e._v(" "),this.symbol?n("h3",[e._v("Players:")]):e._e(),e._v(" "),n("div",e._l(e.players,function(t){return n("span",{key:t.nick},[e._v("\r\n        "+e._s(t.nick)+": "),n("i",[e._v(e._s(t.mark))])])})),e._v(" "),this.symbol?n("checkerboard",{attrs:{symbol:e.symbol,room:e.room}}):e._e(),e._v(" "),n("br"),e._v(" "),n("router-link",{attrs:{to:{name:"Main"}}},[n("button",{on:{click:e.leaveRoom}},[e._v("Back")])])],1)},staticRenderFns:[]},v=n("VU/8")(d,f,!1,function(e){n("+g97")},null,null).exports;o.a.use(i.a);var h=new i.a({mode:"history",base:"/vue_XO/",routes:[{path:"/",name:"Main",component:m},{path:"/game",name:"game",component:v}]}),p=n("hMcO"),y=n.n(p);o.a.config.productionTip=!1,o.a.use(y.a,"https://hyperxo.herokuapp.com/"),new o.a({el:"#app",router:h,template:"<App/>",components:{App:a}})},lyIV:function(e,t){},vCVQ:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.5403802abf477d67d087.js.map