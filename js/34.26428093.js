"use strict";(self["webpackChunkmrpotato"]=self["webpackChunkmrpotato"]||[]).push([[34],{8847:function(t,a,e){e.d(a,{Z:function(){return h}});var o=e(3396),r=e(9242),c=e(7139);const s={class:"page-banner px-3"},d=(0,o._)("div",{class:"background-image"},null,-1),l={class:"banner-text text-center text-black"},i=(0,o._)("h3",{class:"h1 mb-4"},[(0,o.Uk)("歡慶開幕"),(0,o._)("br"),(0,o.Uk)("邀您一起吃得更健康")],-1),n={class:"underLine"};function u(t,a,e,u,p,b){return(0,o.wg)(),(0,o.iD)("div",s,[d,(0,o._)("div",l,[i,(0,o._)("p",n,[(0,o.Uk)(" 結帳輸入優惠碼: "),(0,o._)("a",{onClick:a[0]||(a[0]=(0,r.iM)((t=>b.copyCouponCode(p.couponCode)),["prevent"])),href:"#",class:"text-primary fw-bold"},(0,c.zw)(p.couponCode),1),(0,o.Uk)("，享全品項5折優惠! ")]),(0,o._)("button",{onClick:a[1]||(a[1]=t=>b.copyCouponCode(p.couponCode)),type:"button",class:"btn btn-warning text-black"}," 複製優惠碼 ")])])}var p={name:"PageBanner",data(){return{couponCode:"MrPotato"}},methods:{copyCouponCode(t){const a=this;navigator.clipboard.writeText(t).then((()=>{a.$store.dispatch("alertModules/updateMessage",{message:"已複製優惠碼",status:!0})}))}}},b=e(89);const g=(0,b.Z)(p,[["render",u]]);var h=g},5215:function(t,a,e){e.d(a,{Z:function(){return x}});var o=e(3396),r=e(7139),c=e(9242);const s={class:"card"},d={class:"card-img"},l=["onClick"],i=["src","alt"],n={class:"card-body"},u={class:"d-flex justify-content-between"},p={class:"card-title"},b=["onClick"],g=["onClick"],h=(0,o._)("i",{class:"fa-solid fa-heart"},null,-1),m=[h],v={class:"d-flex justify-content-between"},_=["onClick"],f={class:"card-footer"},y=["onClick"];function w(t,a,e,h,w,C){return(0,o.wg)(),(0,o.iD)("div",{class:(0,r.C_)([{"row-cols-lg-4":!C.path.includes("product_list")},"row row-cols-2 row-cols-lg-3 g-4 product-item"])},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.productData,(a=>((0,o.wg)(),(0,o.iD)("div",{key:a.id},[(0,o._)("div",s,[(0,o._)("div",d,[(0,o._)("a",{onClick:(0,c.iM)((t=>C.goToProductPage(a.id)),["prevent"]),href:"#",class:"img-transform"},[(0,o._)("img",{src:a.imageUrl,alt:a.title,class:"card-img-top"},null,8,i)],8,l)]),(0,o._)("div",n,[(0,o._)("div",u,[(0,o._)("h5",p,[(0,o._)("a",{onClick:(0,c.iM)((t=>C.goToProductPage(a.id)),["prevent"]),href:"#"},(0,r.zw)(a.title),9,b)]),(0,o._)("a",{onClick:(0,c.iM)((t=>C.addToFavorite(a.id,a)),["prevent"]),href:"#","aria-label":"favoriteProduct",class:(0,r.C_)({"text-primary":t.favoriteProducts.includes(a.id)})},m,10,g)]),(0,o._)("div",v,[(0,o._)("a",{onClick:(0,c.iM)((t=>C.goToProductPage(a.id)),["prevent"]),href:"#"},"營養成份",8,_),(0,o._)("span",null,(0,r.zw)(t.$filters.currency(a.price)),1)])]),(0,o._)("div",f,[(0,o._)("button",{onClick:t=>C.addToCart(a.id),type:"button",class:"btn"},"加入購物車",8,y)])])])))),128))],2)}e(7658);var C=e(65),P={name:"ProductsItem",props:["productData"],methods:{...(0,C.nv)("cartsModules",["getCart"]),goToProductPage(t){this.$router.push({path:`/product_page/${t}`})},addToCart(t,a=1){this.$store.dispatch("cartsModules/addToCart",{id:t,qty:a})},updateCart(t,a,e){this.$store.dispatch("cartsModules/updateCart",{id:t,qty:a,cartId:e})},addToFavorite(t,a){this.$store.dispatch("productsModules/addToFavorite",{id:t,item:a})}},computed:{...(0,C.Se)("productsModules",["favoriteProducts"]),...(0,C.Se)("cartsModules",["cart"]),path(){return this.$route.path}},created(){this.getCart()}},k=e(89);const T=(0,k.Z)(P,[["render",w]]);var x=T},4034:function(t,a,e){e.r(a),e.d(a,{default:function(){return X}});var o=e(3396),r=e(9242),c=e(7139);const s={class:"product-page container mb-4 pt-md-6 pb-6"},d={class:"row justify-content-center"},l={class:"col-md-4 d-flex flex-column justify-content-center py-3"},i={"aria-label":"current page",class:"d-md-none"},n={class:"breadcrumb"},u={class:"breadcrumb-item"},p={class:"breadcrumb-item"},b={class:"breadcrumb-item active","aria-current":"page"},g=["src","alt"],h={class:"col-md-4"},m={"aria-label":"current page",class:"d-none d-md-block"},v={class:"breadcrumb"},_={class:"breadcrumb-item"},f={class:"breadcrumb-item"},y={class:"breadcrumb-item active","aria-current":"page"},w={class:"d-flex align-items-center justify-content-between"},C={class:"my-4 fw-bolder"},P=(0,o._)("i",{class:"fa-solid fa-heart"},null,-1),k=[P],T={class:"fs-5"},x={class:"fs-3 fw-bold mb-0 text-end"},M={class:"d-flex justify-content-end"},$={class:"btn-toolbar my-4",role:"toolbar","aria-label":"Toolbar with button groups"},z={class:"input-group",role:"group","aria-label":"quantity input"},D={class:"btn-group ms-2",role:"group","aria-label":"submit button"},F=(0,o._)("i",{class:"bi bi-cart-fill"},null,-1),q={class:"table"},U=(0,o._)("th",{scope:"row"},"熱量",-1),I=(0,o._)("th",{scope:"row"},"蛋白質",-1),j=(0,o._)("th",{scope:"row"},"碳水化合物",-1),Z=(0,o._)("th",{scope:"row"},"脂肪",-1),O=(0,o._)("th",{scope:"row"},"鈉",-1),S=(0,o._)("span",{class:"text-danger"},"*營養成份僅供參考。",-1),B=(0,o.uE)('<div class="col-md-8 my-md-8 my-6"><div class="accordion" id="notesAccordion"><div class="accordion-item"><h2 class="accordion-header" id="headingOne"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne"> # 商品買錯了，可以退換貨嗎? </button></h2><div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#notesAccordionExample"><div class="accordion-body"><p> 如果您在購買當下、外送核對餐點時、用餐時發現商品瑕疵貨品項錯誤，請立即連繫我們，將為您提供退換貨。 </p><span class="text-danger"> 商品運送中可能會有包裝歪斜、保溫的問題，訂餐表示已同意以上風險，如有相關的問題發生，將不提供退換貨。 </span></div></div></div><div class="accordion-item"><h2 class="accordion-header" id="headingTwo"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> # 商品隔餐保存方法 </button></h2><div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#notesAccordionExample"><div class="accordion-body"><p> Mr.Potato所有產品皆為當下新鮮現做，如有需要隔餐食用，請務必將產品放入冷藏(冷凍)保存，並在需要用餐時充分加熱。 </p><ul><li><strong>冷藏保存</strong>：最多保存兩天，盡量盡早食用完畢。</li><li><strong>冷凍保存</strong>：可以保存較長時間，基於衛生安全，建議不要超過一周。 </li></ul></div></div></div><div class="accordion-item"><h2 class="accordion-header" id="headingThree"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"> # 隔夜餐盒加熱技巧 </button></h2><div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#notesAccordionExample"><div class="accordion-body"><p>Mr.Potato 提供的餐盒皆為熟食，隔餐食用僅需要加熱，以下提供參考方法：</p><ul><li><strong>微波</strong>：將產品退冰並移到盤中，700W微波3分鐘，加熱時間可能因微波爐不同而異。 </li><li><strong>電鍋</strong>：將產品移到盤中，放入1/2杯水（150ml），待電鍋跳起。 </li><li><strong>烤箱</strong>：將產品移到盤中，180度加熱6分鐘或到達食用溫度。</li></ul></div></div></div></div></div>',1),W={class:"container py-4 my-5 my-lg-8"},A={class:"row justify-content-center"},E={class:"col-md-8","data-aos":"fade-zoom-in","data-aos-offset":"0","data-aos-duration":"800","data-aos-anchor-placement":"top-center"},L={class:"text-center text-primary mb-6 h3"},H={key:0},J={key:1};function K(t,a,e,P,K,N){const V=(0,o.up)("PageBanner"),Y=(0,o.up)("router-link"),G=(0,o.up)("ProductsItem");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o.Wm)(V),(0,o._)("div",s,[(0,o._)("div",d,[(0,o._)("div",l,[(0,o._)("nav",i,[(0,o._)("ol",n,[(0,o._)("li",u,[(0,o.Wm)(Y,{to:"/"},{default:(0,o.w5)((()=>[(0,o.Uk)("首頁")])),_:1})]),(0,o._)("li",p,[(0,o._)("a",{onClick:a[0]||(a[0]=(0,r.iM)((t=>N.goToProductList(K.product.category)),["prevent"])),href:"#"},(0,c.zw)(K.product.category),1)]),(0,o._)("li",b,(0,c.zw)(K.product.title),1)])]),(0,o._)("img",{src:K.product.imageUrl,alt:K.product.title,class:"img-thumbnail bigImage"},null,8,g)]),(0,o._)("div",h,[(0,o._)("nav",m,[(0,o._)("ol",v,[(0,o._)("li",_,[(0,o.Wm)(Y,{to:"/"},{default:(0,o.w5)((()=>[(0,o.Uk)("首頁")])),_:1})]),(0,o._)("li",f,[(0,o._)("a",{onClick:a[1]||(a[1]=(0,r.iM)((t=>N.goToProductList(K.product.category)),["prevent"])),href:"#"},(0,c.zw)(K.product.category),1)]),(0,o._)("li",y,(0,c.zw)(K.product.title),1)])]),(0,o._)("div",w,[(0,o._)("h2",C,(0,c.zw)(K.product.title),1),(0,o._)("a",{onClick:a[2]||(a[2]=(0,r.iM)((t=>N.addToFavorite(K.product.id,K.product)),["prevent"])),href:"#","aria-label":"favoriteProduct",class:(0,c.C_)(["h2",{"text-primary":t.favoriteProducts.includes(K.product.id)}])},k,2)]),(0,o._)("p",T,(0,c.zw)(K.product.description),1),(0,o._)("p",x,(0,c.zw)(t.$filters.currency(K.product.price)),1),(0,o._)("div",M,[(0,o._)("div",$,[(0,o._)("div",z,[(0,o.wy)((0,o._)("input",{"onUpdate:modelValue":a[3]||(a[3]=t=>K.qty=t),type:"number",class:"form-control quantity",min:"1",placeholder:"1","aria-label":"quantity","aria-describedby":"quantity"},null,512),[[r.nr,K.qty]])]),(0,o._)("div",D,[(0,o._)("button",{onClick:a[4]||(a[4]=t=>N.addToCart(K.product.id,K.qty)),type:"button",class:"btn btn-primary text-white"},[F,(0,o.Uk)("加入購物車 ")])])])]),(0,o._)("small",null,[(0,o._)("table",q,[(0,o._)("tbody",null,[(0,o._)("tr",null,[U,(0,o._)("td",null,(0,c.zw)(K.nutrientFacts.kcal),1)]),(0,o._)("tr",null,[I,(0,o._)("td",null,(0,c.zw)(K.nutrientFacts.protein),1)]),(0,o._)("tr",null,[j,(0,o._)("td",null,(0,c.zw)(K.nutrientFacts.carbs),1)]),(0,o._)("tr",null,[Z,(0,o._)("td",null,(0,c.zw)(K.nutrientFacts.fat),1)]),(0,o._)("tr",null,[O,(0,o._)("td",null,(0,c.zw)(K.nutrientFacts.sodium),1)])])]),S])]),B])]),(0,o._)("div",W,[(0,o._)("div",A,[(0,o._)("div",E,[(0,o._)("h4",L,["純素主義"===K.product.category?((0,o.wg)(),(0,o.iD)("span",H,"搭配主食，營養更均衡")):((0,o.wg)(),(0,o.iD)("span",J,"來點沙拉，補充膳食纖維"))]),(0,o.Wm)(G,{productData:N.recommendedProducts},null,8,["productData"])])])])])}e(7658);var N=e(65),V=e(8847),Y=e(5215),G={name:"ProductPage",components:{PageBanner:V.Z,ProductsItem:Y.Z},data(){return{product:{},nutrientFacts:[],path:"",qty:1}},methods:{...(0,N.nv)("productsModules",["getProducts"]),getProduct(t){const a=this,e=`https://vue-course-api.hexschool.io/api/tommy726/product/${t}`;a.$http.get(e).then((t=>{a.product=t.data.product,a.nutrientFacts=JSON.parse(a.product.content)})).catch((()=>{a.$store.dispatch("alertModules/updateMessage",{message:"資料取得失敗，請確認api是否正確",status:!1})}))},getPageData(){const t=this;t.getProduct(t.productId),t.getProducts(),window.scrollTo(0,0)},goToProductList(t){const a=this;switch(t){case"純素主義":a.path="vegetarian";break;case"原肉至上":a.path="meat";break;case"就愛海味":a.path="seafood";break;default:a.path="all";break}a.$router.push({path:`/product_list/${a.path}`})},addToCart(t,a=1){this.$store.dispatch("cartsModules/addToCart",{id:t,qty:a})},addToFavorite(t,a){this.$store.dispatch("productsModules/addToFavorite",{id:t,item:a})}},computed:{...(0,N.Se)("productsModules",["lunchBoxProducts"]),...(0,N.Se)("productsModules",["saladProducts"]),...(0,N.Se)("productsModules",["favoriteProducts"]),productId(){return this.$route.params.productId},recommendedProducts(){const t=this;let a={};return a="純素主義"===t.product.category?t.lunchBoxProducts:t.saladProducts,a}},created(){this.getPageData()},watch:{$route(t){t.path.includes("/product_page")&&this.getPageData()}}},Q=e(89);const R=(0,Q.Z)(G,[["render",K]]);var X=R}}]);
//# sourceMappingURL=34.26428093.js.map