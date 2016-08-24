import Vue from 'vue'
import vcAutocomplete from '../dist/build.js'

new Vue({
	el: '#app',
	data () {
		return {
            vm: null,
            id: "",
            autofocus: false,
            label: "label",
            name: "name",
            placeholder: "placeholder",
            url: "https://api.github.com/search/issues",
            page: '1',
            per_page: '10',
            target: "items",
            anchor: "body",
            parentModelKey: "vm"
        }
	},
    computed: {
        queryBase () {
            return `page=${this.page}&per_page=${this.per_page}&q`
        }
    },
    methods: {
        parser (data) {
            console.log(data)
            var arr = []
            for (let i = 0, len = data.items.length; i < len; i++) {
                var obj = {}
                var item = data.items[i]['body'] || data.items[i]['title']
                obj[this.anchor] = item.slice(0, 30)
                arr.push(obj)
            }
            return arr
        }
    },
    components: {
        vcAutocomplete
	}
})
