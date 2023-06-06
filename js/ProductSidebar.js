export default{
    data(){
        return{
            listVisible:null, 
            inputMinPrice:null,//最低價格輸入欄位
            inputMaxPrice:null,//最高價格輸入欄位
            minPriceTag:'', //最低價格儲存標籤
            maxPriceTag:'', //最高價格儲存標籤
            selectedTags:[], //已選擇的標籤
            saleFilterList:[],
            cateFilterList:[],
            modeFilterList:[],
            activityType:[],
            categoryType:[]
        };
    },
    props:["goodslist"],
    created(){
        axios.get(php_url + 'product_sidebar_data.php')
            .then((response) => {
                this.activityType = response.data["activity"];
                this.categoryType = response.data["category"];
        })
    },
    methods:{
        //下拉選單
        toggleList(listName){
            if(this.listVisible === listName){
                this.listVisible = null;
            }else{
                this.listVisible = listName;
            }
        },
        //是否選擇標籤
        toggleTag(tag, filterType){
            const index = this.selectedTags.indexOf(tag);
            if(index > -1){
                this.selectedTags.splice(index, 1);
            }else{
                this.selectedTags.push(tag);
            }

            //prepare filter array
            switch (filterType) {
                case 'sale':
                    let s_index = this.saleFilterList.indexOf(tag);
                    if(s_index > -1){
                        this.saleFilterList.splice(s_index, 1);
                    }else{
                        this.saleFilterList.push(tag);
                    }
                    break;
                case 'cate':
                    let c_index = this.cateFilterList.indexOf(tag);
                    if(c_index > -1){
                        this.cateFilterList.splice(c_index, 1);
                    }else{
                        this.cateFilterList.push(tag);
                    }
                    break;
                                
                default:
                    return
            }
            this.passFilterList();

        },
        //移除標籤
        removeTag(tag){
            console.log(tag)
            const index = this.selectedTags.indexOf(tag);
            if(index > -1){
                this.selectedTags.splice(index, 1);
            }

            let target_index = this.saleFilterList.indexOf(tag);
            if(target_index > -1){
                this.saleFilterList.splice(target_index, 1);
            }
            target_index = this.cateFilterList.indexOf(tag);
            if(target_index > -1){
                this.cateFilterList.splice(target_index, 1);
            }

            if(tag.startsWith("最低金額")){
                this.inputMinPrice = null;
            }

            if(tag.startsWith("最高金額")){
                this.inputMaxPrice = null;
            }


            this.passFilterList();
        },

        //價格選擇推上標籤
        updateSelectedTags(tag) {
            if(this.inputMinPrice >= this.inputMaxPrice){
                alert("最低金額應小於最高金額!");
                return 
            }

            let minTagIdx = 0
            for(let tag of this.selectedTags){
                if(tag.startsWith('最低金額')){
                    break;
                };
                minTagIdx++;
            }

            if(minTagIdx != (this.selectedTags.length)-1){
                this.selectedTags.splice(minTagIdx,1);
                if (this.inputMinPrice!== null && this.inputMinPrice !== '') {
                this.minPriceTag = '最低金額：' + this.inputMinPrice + '元';
                    this.selectedTags.push(this.minPriceTag);
                } 
            }

            let maxTagIdx = 0
            for(let tag of this.selectedTags){
                if(tag.startsWith('最高金額')){
                    break;
                };
                maxTagIdx++;
            }

            if(maxTagIdx != (this.selectedTags.length)-1){
                this.selectedTags.splice(maxTagIdx,1);
                if (this.inputMaxPrice !== null && this.inputMaxPrice !== '') {
                    this.maxPriceTag = '最高金額：' + this.inputMaxPrice + '元';
                    this.selectedTags.push(this.maxPriceTag);
                }
            }

            this.passFilterList();
            
        },
        //清除全部標籤
        clearTags() {
            this.selectedTags = [];            
            this.inputMaxPrice=null;
            this.inputMinPrice=null;
            this.passFilterList();
        },
        passFilterList(){
            let filterList = {
                "saleFilterList": this.saleFilterList,
                "cateFilterList": this.cateFilterList,
                "minPrice":this.inputMinPrice,
                "maxPrice":this.inputMaxPrice,
                "tag_list":this.selectedTags
            }
            console.log(this.selectedTags)
            this.$emit('filter-list', filterList);
        },
        applySelection() {
        // 執行篩選邏輯
        }
    },
    template:`
    <nav class="product_sidebar col-3">
        <div class="tag_choose" :class="{'show':selectedTags.length > 0}">已選擇的標籤 <span class="clear" @click="clearTags">清除全部</span></div>
        <div id="tags_container">
            <span class="tag" v-for="(tag, index) in selectedTags" :key="index">
                {{tag}}
                <i class="bi bi-x-lg" @click="removeTag(tag)"></i>
            </span>
        </div>
        <ul>
            <li>
                <div class="button" @click="toggleList('saleList')" :class="{'active':listVisible === 'saleList'}">限時促銷活動
                    <i class="bi bi-chevron-down arrow" :class="{'rotate':listVisible === 'saleList'}"></i>
                </div>
                <ul class="sale_list" v-show="listVisible === 'saleList'">
                    <li class="item" 
                        v-for="activity in activityType" 
                        :key="activity.id" 
                        @click="toggleTag(activity.ACTIVITY_NAME, 'sale')" 
                        :class="{'checked':selectedTags.includes(activity.ACTIVITY_NAME)}">
                        <span>{{activity.ACTIVITY_NAME}}</span>
                        <i class="bi bi-check-lg check-icon" ></i>
                    </li>
                </ul>
            </li>

            <li>
                <div class="button" @click="toggleList('cateList')" :class="{'active':listVisible === 'cateList'}">遊戲類型
                    <i class="bi bi-chevron-down arrow" :class="{'rotate':listVisible === 'cateList'}"></i>
                </div>
                <ul class="cate_list" v-show="listVisible === 'cateList'">
                    <li class="item" 
                        v-for="category in categoryType" 
                        :key="category.id" 
                        @click="toggleTag(category.CATEGORY_NAME, 'cate')" 
                        :class="{'checked':selectedTags.includes(category.CATEGORY_NAME)}">
                        <span>{{category.CATEGORY_NAME}}</span>
                        <i class="bi bi-check-lg check-icon"></i>
                    </li>
                </ul>
            </li>

            <li>
                <div class="button" @click="toggleList('priceList');toggleRotate" :class="{'active':listVisible === 'priceList'}">金額
                    <i class="bi bi-chevron-down arrow" :class="{'rotate':listVisible === 'priceList'}"></i>
                </div>
                <ul class="price_list" v-show="listVisible === 'priceList'">
                    <li class="item price_range" :class="{'checked':selectedTags.includes(minPriceTag)}">
                        <span for="minPrice">最低金額</span>
                        <input 
                            type="number" oninput="this.value = this.value.replace(/[^0-9]/g, '')" placeholder="請輸入正整數"
                            class="form-control" id="minPrice" 
                            v-model="inputMinPrice" 
                            @keyup.enter="updateSelectedTags('min')">
                    </li>
                    <li class="item price_range" :class="{'checked':selectedTags.includes(maxPriceTag)}">
                        <span for="maxPrice">最高金額</span>
                        <input 
                            type="number" oninput="this.value = this.value.replace(/[^0-9]/g, '')" placeholder="請輸入正整數"
                            class="form-control" id="maxPrice" 
                            v-model="inputMaxPrice" 
                            @keyup.enter="updateSelectedTags('max')"
                            >
                    </li>
                </ul>
            </li>
        </ul>
        <button class="apply_choose">套用</button>
    </nav>
    `
    
}