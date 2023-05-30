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
            saleActivities:[ //促銷活動
                {
                    id:1,
                    name:"燒腦解謎"
                },
                {
                    id:2,
                    name:"夏季特賣"
                },
                {
                    id:3,
                    name:"角色扮演"
                },
                {
                    id:4,
                    name:"射擊遊戲"
                },
                {
                    id:5,
                    name:"太空探險"
                },
                {
                    id:6,
                    name:"恐怖遊戲"
                }
            ],  
            gameCategories:[ //遊戲類別
                {
                    id:1,
                    name:"動作"
                },
                {
                    id:2,
                    name:"冒險"
                },
                {
                    id:3,
                    name:"奇幻"
                },
                {
                    id:4,
                    name:"休閒"
                },
                {
                    id:5,
                    name:"恐怖"
                },
                {
                    id:6,
                    name:"驚悚"
                },
                {
                    id:7,
                    name:"解謎"
                },
                {
                    id:8,
                    name:"策略"
                },
                {
                    id:9,
                    name:"懸疑"
                },
                {
                    id:10,
                    name:"模擬"
                },
                {
                    id:11,
                    name:"運動"
                },
                {
                    id:12,
                    name:"競速"
                },
                {
                    id:13,
                    name:"成人"
                },
                {
                    id:14,
                    name:"超現實"
                },
                {
                    id:15,
                    name:"角色扮演"
                },
                {
                    id:16,
                    name:"卡牌遊戲"
                },
                {
                    id:17,
                    name:"開放世界"
                },
                {
                    id:18,
                    name:"免費遊玩"
                },
                {
                    id:19,
                    name:"獨立製作"
                },
                {
                    id:20,
                    name:"彈幕射擊"
                },
                
            ],
            gameModes:[ //遊戲模式
                {
                    id:1,
                    name:"單人"
                },
                {
                    id:2,
                    name:"多人"
                },
                {
                    id:3,
                    name:"合作"
                },
            ]
        };
    },
    props:["goodslist"],
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
                case 'mode':                                                
                    let m_index = this.modeFilterList.indexOf(tag);
                    if(m_index > -1){
                        this.modeFilterList.splice(m_index, 1);
                    }else{
                        this.modeFilterList.push(tag);
                    }
                    break;
                
                default:
                    return
            }

            // console.log(goodslist);



        },
        //移除標籤
        removeTag(tag){
            const index = this.selectedTags.indexOf(tag);
            if(index > -1){
                this.selectedTags.splice(index, 1);
            }
        },

        //價格選擇推上標籤
        updateSelectedTags(tag) {
            if(this.inputMinPrice >= this.inputMaxPrice){
                alert("最低金額應小於最高金額!");
                return 
            }

            
            // if(tag  == 'min'){
                console.log(this.selectedTags)
                let targetMin = this.selectedTags.filter(function(tag){
                    console.log("我是tag" + tag)
                    console.log(tag.startsWith('最低金額'))
                    return tag.startsWith('最低金額')
                })
                console.log("min")
               
                console.log(targetMin[0])
                console.log(this.selectedTags)
                let targetMinIndex = this.selectedTags.indexOf(targetMin[0])
                console.log(targetMinIndex)
                this.selectedTags.splice(targetMinIndex,1)
            // }

            // if(tag  == 'max'){
                let targetMax = this.selectedTags.filter(function(tag){
                    return tag.startsWith('最高金額')
                })
    
                console.log("max")
                
    
                let targetMaxIndex = this.selectedTags.indexOf(targetMax[0])
                console.log(targetMaxIndex)
                this.selectedTags.splice(targetMaxIndex,1)
            // }
            

            
            console.log(this.selectedTags)

            
                if (this.inputMinPrice!== null && this.inputMinPrice !== '') {
                    this.minPriceTag = '最低金額：' + this.inputMinPrice + '元';

                    

                    // if(tag  == 'min'){
                        this.selectedTags.push(this.minPriceTag);
                        console.log(this.selectedTags)
                    // }
                }
            


                if (this.inputMaxPrice !== null && this.inputMaxPrice !== '') {

                    this.maxPriceTag = '最高金額：' + this.inputMaxPrice + '元';

                    

                    // if(!this.selectedTags.includes(this.maxPriceTag) && tag  == 'max'){
                        this.selectedTags.push(this.maxPriceTag);
                        console.log(this.selectedTags)
                    // }
                }
            

           
            // if (this.inputMaxPrice !== null && this.inputMaxPrice !== '') {
            //     this.maxPriceTag = '最高金額：' + this.inputMaxPrice + '元';
            //     this.selectedTags.push(this.maxPriceTag);
            // }
        },
        //清除全部標籤
        clearTags() {
            this.selectedTags = [];
            
            this.inputMaxPrice=null;
            this.inputMinPrice=null;
        },
        applySelection() {
        // 執行篩選邏輯
        }
    },
    template:`
    <nav class="product_sidebar col-3">
        <div class="tag_choose" :class="{'show':selectedTags.length > 0}">已選擇的標籤 <span class="clear" @click="clearTags">清除全部</span></div>
        <div id="tags_container">
            <span class="tag" v-for="tag in selectedTags" :key="tag">
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
                        v-for="activity in saleActivities" 
                        :key="activity.id" 
                        @click="toggleTag(activity.name, 'sale')" 
                        :class="{'checked':selectedTags.includes(activity.name)}">
                        <span>{{activity.name}}</span>
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
                        v-for="category in gameCategories" 
                        :key="category.id" 
                        @click="toggleTag(category.name, 'cate')" 
                        :class="{'checked':selectedTags.includes(category.name)}">
                        <span>{{category.name}}</span>
                        <i class="bi bi-check-lg check-icon"></i>
                    </li>
                </ul>
            </li>

            <li>
                <div class="button" @click="toggleList('modeList')" :class="{'active':listVisible === 'modeList'}">遊戲模式
                    <i class="bi bi-chevron-down arrow" :class="{'rotate':listVisible === 'modeList'}"></i>
                </div>
                <ul class="mode_list" v-show="listVisible === 'modeList'">
                    <li class="item" 
                        v-for="mode in gameModes" 
                        :key="mode.id" 
                        @click="toggleTag(mode.name, 'mode')" 
                        :class="{'checked':selectedTags.includes(mode.name)}">
                        <span>{{mode.name}}</span>
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