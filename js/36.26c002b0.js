"use strict";(self["webpackChunkmrpotato"]=self["webpackChunkmrpotato"]||[]).push([[36],{8847:function(t,e,o){o.d(e,{Z:function(){return g}});var r=o(3396),a=o(9242),s=o(7139);const c={class:"page-banner px-3"},n=(0,r._)("div",{class:"background-image"},null,-1),i={class:"banner-text text-center text-black"},d=(0,r._)("h3",{class:"h1 mb-4"},[(0,r.Uk)("歡慶開幕"),(0,r._)("br"),(0,r.Uk)("邀您一起吃得更健康")],-1),l={class:"underLine"};function u(t,e,o,u,p,v){return(0,r.wg)(),(0,r.iD)("div",c,[n,(0,r._)("div",i,[d,(0,r._)("p",l,[(0,r.Uk)(" 結帳輸入優惠碼: "),(0,r._)("a",{onClick:e[0]||(e[0]=(0,a.iM)((t=>v.copyCouponCode(p.couponCode)),["prevent"])),href:"#",class:"text-primary fw-bold"},(0,s.zw)(p.couponCode),1),(0,r.Uk)("，享全品項5折優惠! ")]),(0,r._)("button",{onClick:e[1]||(e[1]=t=>v.copyCouponCode(p.couponCode)),type:"button",class:"btn btn-warning text-black"}," 複製優惠碼 ")])])}var p={name:"PageBanner",data(){return{couponCode:"MrPotato"}},methods:{copyCouponCode(t){const e=this;navigator.clipboard.writeText(t).then((()=>{e.$store.dispatch("alertModules/updateMessage",{message:"已複製優惠碼",status:!0})}))}}},v=o(89);const f=(0,v.Z)(p,[["render",u]]);var g=f},5215:function(t,e,o){o.d(e,{Z:function(){return x}});var r=o(3396),a=o(7139),s=o(9242);const c={class:"card"},n={class:"card-img"},i=["onClick"],d=["src","alt"],l={class:"card-body"},u={class:"d-flex justify-content-between"},p={class:"card-title"},v=["onClick"],f=["onClick"],g=(0,r._)("i",{class:"fa-solid fa-heart"},null,-1),m=[g],h={class:"d-flex justify-content-between"},_=["onClick"],C={class:"card-footer"},b=["onClick"];function k(t,e,o,g,k,w){return(0,r.wg)(),(0,r.iD)("div",{class:(0,a.C_)([{"row-cols-lg-4":!w.path.includes("product_list")},"row row-cols-2 row-cols-lg-3 g-4 product-item"])},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(o.productData,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e.id},[(0,r._)("div",c,[(0,r._)("div",n,[(0,r._)("a",{onClick:(0,s.iM)((t=>w.goToProductPage(e.id)),["prevent"]),href:"#",class:"img-transform"},[(0,r._)("img",{src:e.imageUrl,alt:e.title,class:"card-img-top"},null,8,d)],8,i)]),(0,r._)("div",l,[(0,r._)("div",u,[(0,r._)("h5",p,[(0,r._)("a",{onClick:(0,s.iM)((t=>w.goToProductPage(e.id)),["prevent"]),href:"#"},(0,a.zw)(e.title),9,v)]),(0,r._)("a",{onClick:(0,s.iM)((t=>w.addToFavorite(e.id,e)),["prevent"]),href:"#","aria-label":"favoriteProduct",class:(0,a.C_)({"text-primary":t.favoriteProducts.includes(e.id)})},m,10,f)]),(0,r._)("div",h,[(0,r._)("a",{onClick:(0,s.iM)((t=>w.goToProductPage(e.id)),["prevent"]),href:"#"},"營養成份",8,_),(0,r._)("span",null,(0,a.zw)(t.$filters.currency(e.price)),1)])]),(0,r._)("div",C,[(0,r._)("button",{onClick:t=>w.addToCart(e.id),type:"button",class:"btn"},"加入購物車",8,b)])])])))),128))],2)}o(7658);var w=o(65),y={name:"ProductsItem",props:["productData"],methods:{...(0,w.nv)("cartsModules",["getCart"]),goToProductPage(t){this.$router.push({path:`/product_page/${t}`})},addToCart(t,e=1){this.$store.dispatch("cartsModules/addToCart",{id:t,qty:e})},updateCart(t,e,o){this.$store.dispatch("cartsModules/updateCart",{id:t,qty:e,cartId:o})},addToFavorite(t,e){this.$store.dispatch("productsModules/addToFavorite",{id:t,item:e})}},computed:{...(0,w.Se)("productsModules",["favoriteProducts"]),...(0,w.Se)("cartsModules",["cart"]),path(){return this.$route.path}},created(){this.getCart()}},P=o(89);const M=(0,P.Z)(y,[["render",k]]);var x=M},1036:function(t,e,o){o.r(e),o.d(e,{default:function(){return _}});var r=o(3396);const a={class:"flex-grow-1"},s={class:"container py-4 my-5 my-lg-8"},c={class:"row justify-content-center"},n={class:"col-md-8"},i=(0,r._)("h2",{class:"h1 mb-4 mb-md-8"},"收藏商品",-1),d={key:0,class:"text-center my-6"},l=(0,r._)("h3",{class:"mb-5"},"目前沒有收藏中的商品!",-1);function u(t,e,o,u,p,v){const f=(0,r.up)("PageBanner"),g=(0,r.up)("ProductsItem"),m=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("div",a,[(0,r.Wm)(f),(0,r._)("div",s,[(0,r._)("div",c,[(0,r._)("div",n,[i,(0,r.Wm)(g,{productData:v.filterFavorite},null,8,["productData"]),v.filterFavorite.length?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("div",d,[l,(0,r.Wm)(m,{to:"/product_list/all",class:"btn btn-primary text-white"},{default:(0,r.w5)((()=>[(0,r.Uk)(" 點我去逛逛 ")])),_:1})]))])])])])}var p=o(65),v=o(8847),f=o(5215),g={name:"FavoriteProduct",components:{PageBanner:v.Z,ProductsItem:f.Z},computed:{...(0,p.Se)("productsModules",["favoriteProducts"]),filterFavorite(){const t=this,e=t.favoriteProducts.filter((t=>1===t.is_enabled));return e}}},m=o(89);const h=(0,m.Z)(g,[["render",u]]);var _=h}}]);
//# sourceMappingURL=36.26c002b0.js.map