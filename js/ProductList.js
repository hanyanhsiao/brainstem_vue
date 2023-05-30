export default{
    data(){
        return{
            showPopup: false, //顯示加入願望清單
            showRemove: false, //顯示移除願望清單
        };

    },
    props:["goods"],
    methods:{
        afterDiscount(i){                            
            return Math.floor(this.goods[i].originalPrice * this.goods[i].discount);                                      
        },
        hoverHeart(item) {
            if (!item.clicked) {                        
                item.hovered = true;
            }
        },
        leaveHeart(item) {
            if (!item.clicked) {
                item.hovered = false;
            }
        },
        toggleHeart(item){
            console.log(this)
            item.clicked = !item.clicked;
            this.showPopup = item.clicked;
            this.showRemove = !item.clicked;
            setTimeout(()=>{
                this.showPopup = false;
                this.showRemove = false;
            }, 1500); // 在 1500 毫秒後隱藏，可根據需要進行調整
        },
    },
    template:
    `
    <div class="each_good col-3" v-for="(item, index) in goods" :key="index">
        <a href="./product_information.html">
            <div class="goods_top"> 
                <img :src="item.img" :alt="item.name">                                   
                <span class="discount">-{{100 - item.discount * 100}}%</span>
                <i
                    class="bi"
                    :class="{
                    'bi-suit-heart': !item.hovered,
                    'bi-suit-heart-fill': item.hovered || item.clicked ,
                    'bi-suit-heart-clicked': item.clicked
                    }"
                    @mouseenter="hoverHeart(item)"
                    @mouseleave="leaveHeart(item)"
                    @click.prevent="toggleHeart(item)"
                ></i>
            </div>                            
            <div class="goods_text">
                <h3>{{item.name}}</h3>
                <span class="price">\${{afterDiscount(index)}}</span>
                <span class="price_original">\${{item.originalPrice}}</span>
            </div>              
        </a>                         
    </div>
    <div class="heart_popup" :class="{'active':showPopup}">
        <i class="bi bi-check-circle"></i>
        <h2>已加入願望清單</h2>
    </div>      
    <div class="heart_remove" :class="{'active':showRemove}">
        <i class="bi bi-trash"></i>
        <h2>已從願望清單移除</h2>
    </div>
    `
}