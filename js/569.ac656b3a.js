"use strict";(self["webpackChunkmrpotato"]=self["webpackChunkmrpotato"]||[]).push([[569],{8847:function(t,e,o){o.d(e,{Z:function(){return f}});var a=o(3396),r=o(9242),s=o(7139);const c={class:"page-banner px-3"},d=(0,a._)("div",{class:"background-image"},null,-1),i={class:"banner-text text-center text-black"},l=(0,a._)("h3",{class:"h1 mb-4"},[(0,a.Uk)("歡慶開幕"),(0,a._)("br"),(0,a.Uk)("邀您一起吃得更健康")],-1),n={class:"underLine"};function u(t,e,o,u,p,g){return(0,a.wg)(),(0,a.iD)("div",c,[d,(0,a._)("div",i,[l,(0,a._)("p",n,[(0,a.Uk)(" 結帳輸入優惠碼: "),(0,a._)("a",{onClick:e[0]||(e[0]=(0,r.iM)((t=>g.copyCouponCode(p.couponCode)),["prevent"])),href:"#",class:"text-primary fw-bold"},(0,s.zw)(p.couponCode),1),(0,a.Uk)("，享全品項5折優惠! ")]),(0,a._)("button",{onClick:e[1]||(e[1]=t=>g.copyCouponCode(p.couponCode)),type:"button",class:"btn btn-warning text-black"}," 複製優惠碼 ")])])}var p={name:"PageBanner",data(){return{couponCode:"MrPotato"}},methods:{copyCouponCode(t){const e=this;navigator.clipboard.writeText(t).then((()=>{e.$store.dispatch("alertModules/updateMessage",{message:"已複製優惠碼",status:!0})}))}}},g=o(89);const m=(0,g.Z)(p,[["render",u]]);var f=m},5215:function(t,e,o){o.d(e,{Z:function(){return x}});var a=o(3396),r=o(7139),s=o(9242);const c={class:"card"},d={class:"card-img"},i=["onClick"],l=["src","alt"],n={class:"card-body"},u={class:"d-flex justify-content-between"},p={class:"card-title"},g=["onClick"],m=["onClick"],f=(0,a._)("i",{class:"fa-solid fa-heart"},null,-1),v=[f],C={class:"d-flex justify-content-between"},_=["onClick"],h={class:"card-footer"},k=["onClick"];function y(t,e,o,f,y,w){return(0,a.wg)(),(0,a.iD)("div",{class:(0,r.C_)([{"row-cols-lg-4":!w.path.includes("product_list")},"row row-cols-2 row-cols-lg-3 g-4 product-item"])},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(o.productData,(e=>((0,a.wg)(),(0,a.iD)("div",{key:e.id},[(0,a._)("div",c,[(0,a._)("div",d,[(0,a._)("a",{onClick:(0,s.iM)((t=>w.goToProductPage(e.id)),["prevent"]),href:"#",class:"img-transform"},[(0,a._)("img",{src:e.imageUrl,alt:e.title,class:"card-img-top"},null,8,l)],8,i)]),(0,a._)("div",n,[(0,a._)("div",u,[(0,a._)("h5",p,[(0,a._)("a",{onClick:(0,s.iM)((t=>w.goToProductPage(e.id)),["prevent"]),href:"#"},(0,r.zw)(e.title),9,g)]),(0,a._)("a",{onClick:(0,s.iM)((t=>w.addToFavorite(e.id,e)),["prevent"]),href:"#","aria-label":"favoriteProduct",class:(0,r.C_)({"text-primary":t.favoriteProducts.includes(e.id)})},v,10,m)]),(0,a._)("div",C,[(0,a._)("a",{onClick:(0,s.iM)((t=>w.goToProductPage(e.id)),["prevent"]),href:"#"},"營養成份",8,_),(0,a._)("span",null,(0,r.zw)(t.$filters.currency(e.price)),1)])]),(0,a._)("div",h,[(0,a._)("button",{onClick:t=>w.addToCart(e.id),type:"button",class:"btn"},"加入購物車",8,k)])])])))),128))],2)}o(7658);var w=o(65),b={name:"ProductsItem",props:["productData"],methods:{...(0,w.nv)("cartsModules",["getCart"]),goToProductPage(t){this.$router.push({path:`/product_page/${t}`})},addToCart(t,e=1){this.$store.dispatch("cartsModules/addToCart",{id:t,qty:e})},updateCart(t,e,o){this.$store.dispatch("cartsModules/updateCart",{id:t,qty:e,cartId:o})},addToFavorite(t,e){this.$store.dispatch("productsModules/addToFavorite",{id:t,item:e})}},computed:{...(0,w.Se)("productsModules",["favoriteProducts"]),...(0,w.Se)("cartsModules",["cart"]),path(){return this.$route.path}},created(){this.getCart()}},P=o(89);const M=(0,P.Z)(b,[["render",y]]);var x=M},9569:function(t,e,o){o.r(e),o.d(e,{default:function(){return k}});var a=o(3396),r=o(7139);const s={class:"flex-grow-1"},c={class:"container my-4 my-md-8"},d={class:"row justify-content-center"},i={class:"col-md-3 mb-6 product-list"},l={class:"top sticky-md-top"},n=(0,a._)("h3",null,"Categories",-1),u={class:"list-group flex-row flex-md-column justify-content-between"},p={class:"col-md-7"};function g(t,e,o,g,m,f){const v=(0,a.up)("PageBanner"),C=(0,a.up)("router-link"),_=(0,a.up)("ProductsItem");return(0,a.wg)(),(0,a.iD)("div",s,[(0,a.Wm)(v),(0,a._)("div",c,[(0,a._)("div",d,[(0,a._)("div",i,[(0,a._)("div",l,[n,(0,a._)("div",u,[(0,a.Wm)(C,{class:(0,r.C_)(["list-group-item",{active:"all"==f.productCategory}]),to:"all"},{default:(0,a.w5)((()=>[(0,a.Uk)("所有產品")])),_:1},8,["class"]),(0,a.Wm)(C,{class:(0,r.C_)(["list-group-item",{active:"vegetarian"==f.productCategory}]),to:"vegetarian"},{default:(0,a.w5)((()=>[(0,a.Uk)("純素主義")])),_:1},8,["class"]),(0,a.Wm)(C,{class:(0,r.C_)(["list-group-item",{active:"meat"==f.productCategory}]),to:"meat"},{default:(0,a.w5)((()=>[(0,a.Uk)("原肉至上")])),_:1},8,["class"]),(0,a.Wm)(C,{class:(0,r.C_)(["list-group-item",{active:"seafood"==f.productCategory}]),to:"seafood"},{default:(0,a.w5)((()=>[(0,a.Uk)("就愛海味")])),_:1},8,["class"])])])]),(0,a._)("div",p,[(0,a.Wm)(_,{productData:f.filterCategory},null,8,["productData"])])])])])}var m=o(65),f=o(8847),v=o(5215),C={name:"ProductList",components:{PageBanner:f.Z,ProductsItem:v.Z},data(){return{categories:{all:"all",vegetarian:"純素主義",meat:"原肉至上",seafood:"就愛海味"}}},methods:{...(0,m.nv)("productsModules",["getProducts"])},computed:{...(0,m.Se)("productsModules",["filterProducts"]),filterCategory(){const t=this;let e={};return e=t.productCategory===`${t.categories.all}`?t.filterProducts:t.filterProducts.filter((e=>e.category===`${t.categories[t.productCategory]}`)),e},productCategory(){return this.$route.params.productCategory}},created(){this.getProducts()}},_=o(89);const h=(0,_.Z)(C,[["render",g]]);var k=h}}]);
//# sourceMappingURL=569.ac656b3a.js.map