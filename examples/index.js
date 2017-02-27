import Vue from 'vue'
import vcAutocomplete from '../src'

new Vue({
	el: '#app',
	data () {
		return {
            bools: {
                true: true,
                false: false
            },
            vm: null,
            id: "",
            autofocus: false,
            autoSelect: false,
            label: "label",
            name: "name",
            placeholder: "尝试输入vue, api慢，请耐心等待",
            url: "https://api.github.com/search/issues",
            page: '1',
            per_page: '10',
            target: "items",
            anchor: "body",
            parentModelKey: "vm",
            mode: 'remote',
            store: [],
            storeStr: '今天是星期五,今天是周五,明天咱们去钓鱼吧,明天咱们去玩游戏,明天咱们吃火锅,下周今天是星期几,明天天气怎么样, 啦啦啦啦啦啦啦'
        }
	},
    ready () {
        this.storeStr = this.store.join(',')
    },
    methods: {
        remote () {
            this.mode = 'remote'
            this.placeholder = '尝试输入vue, api慢，请耐心等待'
            this.vm = ''
        },
        local () {
            this.mode = 'local'
            this.placeholder = '尝试输入: 明咱钓鱼, 吃火锅'
            this.vm = ''
        },
        parser (data) {
            if (data && data.items) {
                var arr = []
                for (let i = 0, len = data.items.length; i < len; i++) {
                    var obj = {}
                    var item = data.items[i]['body'] || data.items[i]['title']
                    obj[this.anchor] = item.slice(0, 30)
                    arr.push(obj)
                }
                return arr
            }
        }
    },
    computed: {
        store () {
            return this.storeStr.split(',')
        },
        queryBase () {
            return `page=${this.page}&per_page=${this.per_page}&q`
        }
    },
    components: {
        vcAutocomplete
	}
})
