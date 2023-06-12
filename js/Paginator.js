export default{
    data(){
        return{

        };
    },
    props:["totalPages","currentPage"],
    methods:{
        goToPage(page) {
            this.$emit('page-change', page); // 觸發父元素的頁碼切換事件
        },
        previousPage() {
            this.$emit('previous-page'); // 触发父组件的倒退一页事件
            this.$nextTick(() => {
                const productList = document.getElementById('product-list');
                if (productList) {
                window.scrollTo({
                    top: productList.offsetTop,
                    behavior: 'smooth', // 使用平滑滾動效果
                });
                }
            });
        },
        nextPage() {
            this.$emit('next-page'); // 触发父组件的倒退一页事件
            this.$nextTick(() => {
                const productList = document.getElementById('product-list');
                if (productList) {
                window.scrollTo({
                    top: productList.offsetTop,
                    behavior: 'smooth', // 使用平滑滾動效果
                });
                }
            });
        },
        
        
    },
    template:`
    <nav class="pages">
        <ul class="product_pages">
            <li class="each_page" v-if="currentPage != 1" @click="previousPage"><i class="bi bi-chevron-left"></i></li>
            <li 
                class="each_page" 
                v-for="page in totalPages" 
                :key="page" 
                @click="goToPage(page)"
                :class="{'active': page == currentPage}"
                >{{page}}</li>
            <li class="each_page" v-if="currentPage != totalPages" @click="nextPage"><i class="bi bi-chevron-right"></i></li>
        </ul>
    </nav>
    `
}