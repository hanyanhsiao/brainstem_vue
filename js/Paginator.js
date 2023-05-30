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
        },
        nextPage() {
            this.$emit('next-page'); // 触发父组件的倒退一页事件
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