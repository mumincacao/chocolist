(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{580:function(e){e.exports=JSON.parse('{"type":"array","items":{"type":"object","required":["name","list"],"properties":{"name":{"type":"string"},"list":{"type":"array","items":{"type":"object","required":["name","checked"],"properties":{"name":{"type":"string"},"checked":{"type":"boolean"}}}}}}}')},620:function(e,t,r){"use strict";r.r(t);var n=r(18),o=(r(21),r(39),r(42),r(276),r(72),r(536)),l=r.n(o),c=r(486),d=r(0),v=r(580),m={merge:"まーじ",replace:"りぷれいす"},f=d.a.extend({data:function(){return{type:m.merge,file:null,url:"#",fileName:"",loading:!1}},computed:{importType:function(){return m}},methods:{upload:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var data,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.file){t.next=2;break}return t.abrupt("return");case 2:return e.loading=!0,t.t0=JSON,t.next=6,e.file.text();case 6:if(t.t1=t.sent,data=t.t0.parse.call(t.t0,t.t1),(new l.a).compile(v)(data)){t.next=12;break}return e.loading=!1,t.abrupt("return");case 12:return r=(e.type===m.merge?"merge":"replace")+"Import",t.next=15,e.$store.dispatch(r,data);case 15:e.file=null,e.loading=!1;case 17:case"end":return t.stop()}}),t)})))()},download:function(){this.loading=!0,this.fileName="ちょこっとりすと"+Object(c.a)("-yyyy-mm-dd.HHMMss")+".json",this.url=URL.createObjectURL(new Blob([JSON.stringify(this.$store.state.list)],{type:"text/json"})),this.loading=!1}}}),y=r(89),_=r(120),h=r.n(_),w=r(207),x=r(466),k=r(457),V=r(614),j=r(624),O=r(489),N=r(527),J=r(528),S=r(615),R=r(446),component=Object(y.a)(f,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-row",{attrs:{justify:"center",align:"center"}},[r("v-col",{attrs:{cols:"12",sm:"8",md:"6"}},[r("v-card",{attrs:{elevation:"5"}},[r("v-card-title",[e._v("いんぽーと")]),e._v(" "),r("v-card-text",[r("p",[e._v("JSON 形式のふぁいるからでーたを読み込みます。")]),e._v(" "),r("p",[e._v("\n          でーたふぁいるの書式は"),r("a",{attrs:{href:"/api/schema/chocolist.json"}},[e._v("JSON Schema")]),e._v("で定義されています。\n        ")]),e._v(" "),r("v-form",[r("v-radio-group",{attrs:{label:"読み込み形式",row:""},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}},e._l(e.importType,(function(e){return r("v-radio",{key:e,attrs:{value:e,label:e}})})),1),e._v(" "),r("v-file-input",{attrs:{accept:"text/json",label:"ふぁいるを選択してください","show-size":""},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}})],1)],1),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{on:{click:e.upload}},[e._v("読み込む")])],1)],1)],1),e._v(" "),r("v-col",{attrs:{cols:"12",sm:"8",md:"6"}},[r("v-card",{attrs:{elevation:"5"}},[r("v-card-title",[e._v("えくすぽーと")]),e._v(" "),r("v-card-text",[r("p",[e._v("JSON 形式でだうんろーどします。")]),e._v(" "),r("p",[e._v("\n          TEXT\n          形式や特定ぐるーぷのみが必要な時は対象ぐるーぷの一覧画面からできます。\n        ")])]),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{attrs:{href:e.url,download:e.fileName,loading:e.loading},on:{click:e.download}},[e._v("だうんろーど")])],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;h()(component,{VBtn:w.a,VCard:x.a,VCardActions:k.a,VCardText:k.b,VCardTitle:k.c,VCol:V.a,VFileInput:j.a,VForm:O.a,VRadio:N.a,VRadioGroup:J.a,VRow:S.a,VSpacer:R.a})}}]);