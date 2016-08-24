<template>
    <div class="vc-autocomplete-component form-group">
        <label class="">{{ label }}</label>
        <div class="input-box">
            <input v-el:input type="text" :id="id" class="form-control" autocomplete="off" :class="class" :name="name" :placeholder="placeholder" v-model="vm" @input="input(vm) | debounce 300" @blur="hideAll" @keydown="keydown" @focus="focus" />
            <span class="clear-it glyphicon glyphicon-remove-circle" aria-hidden="true" @click="clear()"></span>
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
export default {
    props: {
        name: String, // name for unique component identity, also as input dom's name attr
        id: String, // input dom's id attr
        class: String, // input dom's class attr
        autofocus: {
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
        // 可传入解析器,不传则用内置的getDeepData
        dataParser: Function,
        // 数据层级获取目标,由于每个api设计的返回结果的数据结构不一定一样,所以要求强制设置!default仅仅是个示例
        target: {
            type: String,
            required: true,
            default: 'data.list'
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
    data: function () {
        return {
            vm: "", // 输入值
            showList: false, // 是否显示下拉结果列表
            jsonList: [], // ajax的返回值的解析后的json列表
            json: function (data) {
                return JSON.parse(JSON.stringify(data))
            },
            showNoContentTip: false,
            focusListIndex: "" // focus的item游标
        }
    },
    created: function () {
        // sync parent model with $data.type
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
        vm: function (val, old) {
            // CORE: Sync parent model with this.vm
            return this.$parent.$data[this.parentModelKey] = val
        }
    },
    methods: {
        focusInput () {
            this.$els.input && this.$els.input.focus()
        },
        clear: function () {
            this.vm = ''
        },
        // 并不是每个api返回的结构、层级都是一样的，需要接受传参配置，然后递归解析
        getDeepData: function (data, target) {
            var levels = target.split('.')
            for (var i = 0, len = levels.length; i < len; i++) {
                data = data[levels[i]]
            }

            return data
        },
        // domEvent => @input
        input: function (val) {
            this.showList = true

            var msg = {
                action: 'input',
                data: val
            }
            this.$dispatch('AUTOCOMPLETE', msg, this.name)
            this.$emit('fetchData', val)

            return this.$parent.$data[this.parentModelKey] = val
        },
        // domEvent => @dblclick
        showAll: function () {
            this.jsonList = []
            this.$emit('fetchData')

            var msg = {
                action: 'show',
                data: null
            }
            this.$dispatch('AUTOCOMPLETE', msg, this.name)

            this.showList = true
        },
        // domEvent => @blur
        hideAll: function (e) {
            var self = this

            var msg = {
                action: 'blur',
                data: e
            }
            this.$dispatch('AUTOCOMPLETE', msg, this.name)

            setTimeout(function () {
                self.showList = false

                var msg = {
                    action: 'hide',
                    data: null
                }
                self.$dispatch('AUTOCOMPLETE', msg, self.name)
            }, 250)
        },
        // domEvent => @focus
        focus: function (e) {
            this.focusListIndex = 0

            var msg = {
                action: 'focus',
                data: e
            }
            this.$dispatch('AUTOCOMPLETE', msg, this.name)
        },
        // domEvent => @mousemove
        mousemove: function (i) {
            this.focusListIndex = i
        },
        // domEvent => @keydown
        keydown: function (e) {
            var key = e.keyCode

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
            var listLength = this.jsonList && this.jsonList.length - 1
            this.focusListIndex = this.focusListIndex > listLength ? 0 : this.focusListIndex < 0 ? listLength : this.focusListIndex
        },
        // for active in all condition
        activeClass: function (i) {
            return {
                'focus-list': i === this.focusListIndex
            }
        }
    }, // end of methods
    events: {
        selectList: function (data) {
            var data = this.json(data)

            // Put the selected data to vm(v-model) 
            this.vm = data[this.anchor]
            this.showList = false

            var msg = {
                action: 'selected',
                data: data
            }
            this.$dispatch('AUTOCOMPLETE', msg, this.name)
        },
        fetchData: function (inputVal) {
            if (!inputVal) return
            var self = this

            if (this.url != null) {
                var msg = {
                    action: 'beforeAjax',
                    data: inputVal
                }
                this.$dispatch('AUTOCOMPLETE', msg, self.name)

                var ajax = new XMLHttpRequest()

                var limit
                if (this.$get('limit') !== '') {
                    this.limit = parseFloat(this.limit)
                    limit = this.limit !== "" ? '&' + this.limitKey + '=' + this.limit : ''
                } else {
                    limit = ''
                }

                var fullUrl = this.url + '?' + this.param + '=' + inputVal + limit // baseUrl + 请求参数 + 实时输入值 + limitQuery 
                ajax.open('GET', fullUrl)
                ajax.send(null)

                ajax.addEventListener('progress', function (data) {
                    if (data.lengthComputable) {
                        var msg = {
                            action: 'ajaxProgress',
                            data: data
                        }
                        self.$dispatch('AUTOCOMPLETE', msg, self.name)
                    }
                })

                ajax.addEventListener('loadend', function (data) {
                    var json = JSON.parse(this.responseText)
                    // 有解析器就用，没有就用内置解析器
                    if (self.dataParser) {
                        json = self.dataParser(json)
                    } else {
                        json = self.getDeepData(json, self.target)
                    }

                    var msg = {
                        action: 'ajaxLoaded',
                        data: json 
                    }
                    self.$dispatch('AUTOCOMPLETE', msg, this.name)
                    self.jsonList = json
                    if (json == null || json.length < 1) {
                        self.showNoContentTip = true
                    } else {
                        self.showNoContentTip = false
                    }
                })
            }
        }
    } // end of events
}
</script>
