export default {
    data() {
        return {
            showPopup: false, //顯示加入願望清單
            showRemove: false, //顯示移除願望清單
        };

    },
    props: ["goods"],
    methods: {
        afterDiscount(i) {
            return Math.floor(this.goods[i].ORIGINAL_PRICE * this.goods[i].DISCOUNT_PERCENTAGE);
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
        toggleHeart(item) {          
            
            axios.defaults.withCredentials = true;
            axios.post(php_url + 'login_status.php')
                .then((response) => {
                    let isLogin = response.data.isLogin;
                    if(isLogin){
                        let id = response.data.member_ID;
                        let wishitem = item.GAME_ID;                        
                        axios.get(php_url + `add_to_wishlist.php?id=${id}&wishitem=${wishitem}`)
                        
                        item.clicked = !item.clicked;
                        this.showPopup = item.clicked;
                        this.showRemove = !item.clicked;
                        setTimeout(() => {
                            this.showPopup = false;
                            this.showRemove = false;
                        }, 1500); // 在 1500 毫秒後隱藏，可根據需要進行調整
                    }else{
                        alert("請先登入會員");
                        window.location.href = './login.html'
                    }
                    
                })
        },
        goProductPage(id) {
            location.href = `./product_information.html?id=${id}`;

        },
    },
    template:
        `
    <div class="each_good col-3" v-for="(item, index) in goods" :key="index" @click="goProductPage(item.GAME_ID)">
        <a>
            <div class="goods_top" data-test="{{item.GAME_NAME}}"> 
                <img :src="item.GAME_COVER" :alt="item.GAME_NAME">                                   
                <span v-show="item.DISCOUNT_PERCENTAGE > 0 " class="discount">-{{100 - item.DISCOUNT_PERCENTAGE * 100}}%</span>
                <i
                    class="bi"
                    :class="{
                    'bi-suit-heart': !item.hovered,
                    'bi-suit-heart-fill': item.hovered || item.clicked ,
                    'bi-suit-heart-clicked': item.clicked
                    }"
                    @mouseenter="hoverHeart(item)"
                    @mouseleave="leaveHeart(item)"
                    @click.stop="toggleHeart(item)"
                ></i>
            </div>                            
            <div class="goods_text">
                <h3>{{item.GAME_NAME}}</h3>
                <span class="price" v-show="item.DISCOUNT_PERCENTAGE > 0">\${{afterDiscount(index)}}</span>
                <span class="price_original" :class="{'line_throught':item.DISCOUNT_PERCENTAGE > 0}">\${{item.ORIGINAL_PRICE}}</span>
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