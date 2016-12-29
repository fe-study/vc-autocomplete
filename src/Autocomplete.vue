<template>
    <div class="vc-autocomplete-component form-group">
        <!--
        <label class="">{{ label }}</label>
        <div class="input-box">
            <input type="text" class="form-control" autocomplete="off"
                v-el:input
                :name="name"
                :placeholder="placeholder"
                v-model="vm"
                @input="input(vm)"
                @blur="hideAll"
                @keydown="keydown"
                @focus="focus"
            />
            <span class="clear-it glyphicon glyphicon-remove-circle" aria-hidden="true" @click="clear()"></span>
        </div>
        -->
        <vc-easyclearinput
            :name="name"
            type="text"
            :value.sync="shownValue"
            :placeholder="placeholder"
            :label="label"
            @input="input | debounce 300"
            :on-blur="handleBlur"
            :on-focus="handleFocus"
            @keydown="keydown"
            :on-clear="clear"
        >
        </vc-easyclearinput>
        <div class="autocomplete transition autocomplete-{{ name }}" id="autocomplete-{{ name }}" v-show="showList"> 
            <ul v-if="jsonList && jsonList.length > 0" class="dropdown-menu"> 
                <li v-for="data in jsonList" transition="showAll" :class="activeClass($index)"> 
                    <a href="#" @click.prevent="$emit('selectList',data)" @mousemove="mousemove($index)">
                        <span class="vc-autocomplete-item">{{ data[anchor] }} {{ data[anchorPlus] }}</span>
                    </a> 
                </li>
            </ul> 
            <ul class="dropdown-menu" v-if="showNoContentTip" style="text-align: center;padding: 10px;">没有匹配的{{ label }}数据</ul>
        </div>
    </div>
</template>

<style lang="less">
// container
.vc-autocomplete-component {
    position: relative;

    .input-box {
        display: inline-block;
        position: relative; // 更内聚的relative保证

        &:hover {
            .clear-it {
                visibility: visible;
            }
        }

        .clear-it {
            visibility: hidden;
            position: absolute;
            right: 6px;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            opacity: .3;
        }
    }
}

.transition, .autocomplete, .showAll-transition, .autocomplete ul, .autocomplete ul li a{
    transition:all 0.3s ease-out;
    -moz-transition:all 0.3s ease-out;
    -webkit-transition:all 0.3s ease-out;
    -o-transition:all 0.3s ease-out;
}

.autocomplete ul {
    width: auto;
    min-width: 100%;
    font-family: sans-serif;
    position: absolute;
    left: 50%;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
    list-style: none;
    background: #fff;
    padding: 1px;
    margin: 0;
    display: inline-block;
    margin-top: 10px;
}

/* 三角形 */
.autocomplete ul:before {
    content: "";
    display: block;
    position: absolute;
    height: 0;
    width: 0;
    border: 10px solid transparent;
    border-bottom: 10px solid rgba(0, 0, 0, 0.15);
    left: 46%;
    top: -20px
}
.autocomplete ul:after {
    content: "";
    display: block;
    position: absolute;
    height: 0;
    width: 0;
    border: 10px solid transparent;
    border-bottom: 10px solid #fff;
    left: 46%;
    top: -19px
}
.autocomplete ul li a {
    text-decoration: none;
    display: block;
    color: #2b2b2b;
    padding: 5px;
    padding-left: 10px;
}

.autocomplete ul li a:hover, .autocomplete ul li.focus-list a {
    color: white;
    background: #2F9AF7;
}

.autocomplete ul li a span {
    display: block;
    margin-top: 3px;
    color: grey;
    font-size: 13px;
}

.autocomplete ul li a:hover span, .autocomplete ul li.focus-list a span {
    color: white;
}

.showAll-transition {
    opacity: 1;
    height: 30px;
    overflow: hidden;
}

.showAll-enter {
    opacity: 0.3;
    height: 0;
}

.showAll-leave {
    display: none;
}
</style>

<script>
const COMPONENT_NS = 'AUTOCOMPLETE'

import vcEasyclearinput from '../../vc-easyclearinput/src/Easyclearinput.vue'

export default {
    name: 'vc-autocomplete',
    props: {
        // name for unique component identity, also as input dom's name attr
        name: String,
        // 是否聚焦
        autofocus: {
            type: Boolean,
            default: false 
        },
        fallback: { // 尽量表现的像一个input输入框
            type: Boolean,
            default: true,
        },
        autoSelect: {
            type: Boolean,
            default: false 
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: String,

        // 用于同步父组件
        parentModelKey: String, // v-model like, 用于同步父组件model, 传进字符串作为key

        // 比较模式
        mode: {
            type: String,
            default: 'remote'
        },

        // 本地补全待比较池
        store: {
            type: Array
        },
        /**
         * @param {String} target1 比较目标1,即输入值
         * @param {String} target2 比较目标2,即比较池中的item
         * @return {Number} result 比较结果,返回相似度,越小说明越接近
         */
        comparer: Function,

        // ajax请求地址
        url: {
            type: String,
            required: true
        },
        // 请求补充参数  e.g. 'city=131&word='
        param: {
            type: String,
            default: 'word'
        },
        // 可传入解析器,不传则用内置的getDeepData
        dataParser: Function,
        // 数据层级获取目标,由于每个api设计的返回结果的数据结构不一定一样,所以要求强制设置!default仅仅是个示例
        target: {
            type: String,
            required: true,
            default: 'data.list'
        },

        // 请求limit的key名，有默认值，可配置
        limitKey: {
            type: String,
            default: 'limit'
        },
        // add 'limit' query to AJAX URL which will be fetched
        limit: {
            type: String,
            default: ''
        },
        // 数据的锚点，即ajax返回的的每一个item中你需要取出来展示的特定key
        anchor: {
            type: String,
            required: true
        },
        // 补充锚点，此处不是太好，局限了组件只能扩展一个显示锚点
        anchorPlus: {
            type: String,
            default: 'district'
        }
    }, // end of props
    data () {
        return {
            shownValue: '', // 显示值 
            inputValue: "", // 输入值
            vm: null, // 用户下拉选择的item(一般为Object, fallback时为String输入值) 真正同步给外界的值
            userSelected: false,
            showList: false, // 是否显示下拉结果列表
            jsonList: [], // ajax的返回值的解析后的json列表
            json (data) {
                return JSON.parse(JSON.stringify(data))
            },
            showNoContentTip: false,
            focusListIndex: "" // focus的item游标
        }
    },
    created () {
        // sync parent model with $data.type
        this.shownValue = this.$parent.$data[this.parentModelKey]
        this.vm = this.$parent.$data[this.parentModelKey]
    },
    ready () {
        if (this.autofocus) {
            this.focusInput()
        }
    },
    watch: {
        autofocus (val) {
            this.focusInput()
        },
        vm (val, old) {
            // CORE: Sync parent model with this.vm
            return this.$parent.$data[this.parentModelKey] = val
        }
    },
    components: {
        vcEasyclearinput
    },
    methods: {
        /**
         * @param {String} a 比较目标1(item)
         * @param {String} b 比较目标2(one of compare-store item)
         * return {Number} 编辑距离 
         */
        editDistance (a, b) {
            if (a.indexOf(b) > -1 || b.indexOf(a) > -1) {
                return -1
            }
            let al = a.length + 1
            let bl = b.length + 1
            let result = []
            let temp = 0
            let i, j 

            // 创建一个二维数组
            ;for (i = 0; i < al; result[i] = [i++]) {}
            for (i = 0; i < bl; result[0][i] = i++) {}

            for (i = 1; i < al; i++) {
                for (j = 1; j < bl; j++) {
                    // 判断最上方和最左方数字是否相等
                    temp = a[i - 1] == b[j - 1] ? 0 : 1
                    // result[i - 1][j] + 1 左方数字
                    // result[i][j - 1] + 1 上方数字
                    // result[i - 1][j - 1] + temp 左上方数字
                    result[i][j] = Math.min(result[i - 1][j] + 1, result[i][j - 1] + 1, result[i - 1][j - 1] + temp)
                }
            }

            return result[i-1][j-1]
        },
        fetchLocal(inputVal, storeArr) {
            let comparer = comparer || this.editDistance
            let s = storeArr || this.store
            let ret = []
            for (let i = 0, len = s.length; i < len; i++) {
                let obj = {}
                obj[this.anchor] = s[i] // since `anchor` prop is required
                obj['distance'] = comparer(inputVal, s[i])
                ret.push(obj)
            }
            ret.sort((item, nextItem) => {
                return item['distance'] > nextItem['distance']
            })
            this.jsonList = ret
        },
        fetchRemote (inputVal) {
            if (this.url != null) {
                let msg = {
                    action: 'beforeAjax',
                    data: inputVal
                }
                this.$dispatch(COMPONENT_NS, msg, this.name)

                const xhr = new XMLHttpRequest()

                let limit
                if (this.limit !== '') {
                    this.limit = parseFloat(this.limit)
                    limit = this.limit !== "" ? '&' + this.limitKey + '=' + this.limit : ''
                } else {
                    limit = ''
                }

                let fullUrl = this.url + '?' + this.param + '=' + inputVal + limit // baseUrl + 请求参数 + 实时输入值 + limitQuery 
                xhr.open('GET', fullUrl)
                xhr.send(null)

                xhr.addEventListener('progress', (data) => {
                    if (data.lengthComputable) {
                        let msg = {
                            action: 'xhrProgress',
                            data: data
                        }
                        this.$dispatch(COMPONENT_NS, msg, this.name)
                    }
                })

                xhr.addEventListener('loadend', (data) => {
                    let json = JSON.parse(xhr.responseText)
                    // 有解析器就用，没有就用内置解析器
                    if (this.dataParser) {
                        json = this.dataParser(json)
                    } else {
                        json = this.getDeepData(json, this.target)
                    }

                    let msg = {
                        action: 'xhrLoaded',
                        data: json 
                    }
                    this.$dispatch(COMPONENT_NS, msg, this.name)
                    this.jsonList = json

                    if (json == null || json.length < 1) {
                        if (!this.fallback) {
                            this.showNoContentTip = true
                        }
                    } else {
                        this.showNoContentTip = false
                    }
                })

                xhr.addEventListener('error', (err) => {
                    console.error(err)
                })
            }
        },
        focusInput () {
            this.$els.input && this.$els.input.focus()
        },
        clear () {
            this.shownValue = ''
            this.vm = null
        },
        // 并不是每个api返回的结构、层级都是一样的，需要接受传参配置，然后递归解析
        getDeepData (data, target) {
            let levels = target.split('.')
            for (let i = 0, len = levels.length; i < len; i++) {
                data = data[levels[i]]
            }

            return data
        },
        // DOMEvent => @input
        input () {
            this.userSelected = false
            let val = this.shownValue
            this.inputValue = this.shownValue
            this.showList = true

            let msg = {
                action: 'input',
                data: val
            }
            if (this.fallback) {
                this.vm = val
            }
            this.$dispatch(COMPONENT_NS, msg, this.name)
            this.$emit('fetchData', val)

            // return this.$parent.$data[this.parentModelKey] = val
        },
        // DOMEvent => @dblclick
        showAll () {
            this.jsonList = []
            this.$emit('fetchData')

            let msg = {
                action: 'show',
                data: null
            }
            this.$dispatch(COMPONENT_NS, msg, this.name)

            this.showList = true
        },
        // DOMEvent => @blur
        hideAll (e) {

            let msg = {
                action: 'blur',
                data: e
            }
            this.$dispatch(COMPONENT_NS, msg, this.name)

            setTimeout(() => {
                this.showList = false

                let msg = {
                    action: 'hide',
                    data: null
                }
                this.$dispatch(COMPONENT_NS, msg, this.name)
            }, 250)
        },
        handleBlur (e) {
            if ( (this.shownValue !== '') && (this.vm == null || this.vm === '') ) {
                if (!this.autoSelect && !this.fallback) {
                    console.info('maybe you should use `fallback` or `autoSelect` mode to make the value as what you input!')
                }
            }
            this.hideAll(e)
            if (!this.userSelected && this.autoSelect) {
                this.vm = this.jsonList && this.jsonList[0]
                this.shownValue = this.vm[this.anchor]
                this.jsonList = []
            }
        },
        // DOMEvent => @focus
        handleFocus (e) {
            this.focusListIndex = 0

            let msg = {
                action: 'focus',
                data: e
            }
            this.$dispatch(COMPONENT_NS, msg, this.name)
        },
        // DOMEvent => @mousemove
        mousemove (i) {
            this.focusListIndex = i
        },
        // DOMEvent => @keydown
        keydown (e) {
            let key = e.keyCode

            // Disable when list isn't showing up
            if(!this.showList) return

            switch (key) {
                case 40: //down
                    this.focusListIndex++
                break
                case 38: //up
                    this.focusListIndex--
                break
                case 13: //enter
                    this.$emit('selectList', this.jsonList[this.focusListIndex])
                    this.showList = false
                break
                case 27: //esc
                    this.showList = false
                break
            }

            // When cursor out of range
            let listLength = this.jsonList && this.jsonList.length - 1
            this.focusListIndex = this.focusListIndex > listLength ? 0 : this.focusListIndex < 0 ? listLength : this.focusListIndex
        },
        // for active in all condition
        activeClass (i) {
            return {
                'focus-list': i === this.focusListIndex
            }
        }
    }, // end of methods
    events: {
        selectList (data) {
            this.userSelected = true
            data = this.json(data)

            // Put the selected data to vm(v-model) 
            this.vm = data
            this.shownValue = data[this.anchor]
            this.showList = false

            let msg = {
                action: 'selected',
                data: data
            }
            this.$dispatch(COMPONENT_NS, msg, this.name)
        },
        fetchData (inputVal) {
            if (inputVal == null || inputVal === '') return
            if (this.mode === 'remote') {
                this.fetchRemote(inputVal)
            } else if (this.mode === 'local') {
                this.fetchLocal(inputVal)
            } else {
                console.warn('maybe no this mode!')
            }
        }
    } // end of events
}
</script>
