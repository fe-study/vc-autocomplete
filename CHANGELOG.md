<h1 align="center">vc-autocomplete- @changelog</h1>

## 0.5.1

`2017-01-23`

- 修复关键词无返回结果情况下直接 `enter` 导致的报错

## 0.5.0

`2017-01-06`

- fix `methods#handleBlur` bug，加强了类型检查，此处jsonList的清空时机值得商榷

## 0.4.0

`2016-12-29`

- 增加 `autoSelect(default: false)` 和 `fallback(default: true)` 属性，分别代表输入框失去焦点后默认选择请求到的第一个item和无数据降级到普通输入框
- 增加了清除 `jsonList` 时机
- 给出了推荐使用 `fallback|autoSelect` 模式的时机
- 去除了 `loadend` 事件中处理中的诸多设计，比如清除 `vm` ，同步 `shownValue` 等


## 0.3.0

`2016-10-21`

`break change`

- 内置 `vm` 变更，不再为 `data[anchor]` 形式，改为复杂代表整个用户下拉选中项的对象
- 内置三层value，`shownValue`: 展示的值, `inputValue`: 输入的值, `vm`: 用户选择的项(Object | String)

## 0.2.9

`2016-08-29`

- 新增本地补全功能，新增 `store`, `mode`, `comparer` 属性
- 内置最短编辑路径算法作为默认本地补全比较器
- 内置输入框升级为 `vc-easyclearinput` 组件，更好的输入体验(但打包代码变大一点点)
- es6化，整理代码，完善demo

## 0.2.1

`2016-08-24`

- 新增 `dataParser` 解析器属性，不传则自动使用内置解析器解析ajax返回数据
- 代码整理，风格整理，删除无用代码

## 0.2.0

`2016--08-04`

- 空输入不发起请求, 改变暂无{{ label }}数据的文案和显示逻辑，避免对用户的迷惑，仅仅在确实无数据的时候才显示

## 0.1.1

`2016-07-29`

- dispatch风格改为 => AUTOCOMPLETE, msg, name

## 0.1.0

`2016-07-20`

- props(同时重置了顺序, dom相关, parentModel, ajax)
  - label变为组件外部label
  - limitLabel => limitKey
  - model => parentModelKey

- data:
  - type => vm
  - cleanUp => json
  - json => jsonList
  - focusList => focusListIndex

- dispatch风格全部换成 => 'AUTOCOMPLETE:' + name + ':' + action

- 优化实现
- 顺序重置
- 增加注释
- 格式化代码

## 0.0.1

`2016-05-10`

- init

