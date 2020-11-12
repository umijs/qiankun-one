# qiankun-one

> Follow 阿里巴巴统一微前端规范的 qiankun 版本

## 与 qiankun 的关系

19年微前端框架如雨后春笋般出现，在开源界和阿里内部都有着不同的业务实践。同时一些对微前端有定制化需求的部门想快速复用，但技术选型存在很高的门槛，对想要进入的部门成本非常大。

为了解决微前端标准不统一的问题，同时推动微前端技术方向的发展。前端委员会层面横向拉通各部门一同共建落地了微前端标准。qiankun 作为微前端开源项目的先驱部队，为了最大程度的保证用户体验，让用户平滑过渡，落地了 qiankun-one 版本。

## Usage

### 安装依赖

```shell
$ npm i qiankun-one --save
```

### 开始使用

```jsx
import { IAppConfig, IAppManifest, IOptions, IApp } from 'qiankun-one'

const appConfig: IAppConfig = {
  name: "wei-micro-app-example1",
  entry: [
    "//wei.alicdn.com/micro-app-example/0.1.0/index.js",
    "//wei.alicdn.com/micro-app-example/0.1.0/index.css"
  ],
  activePath: '/demo1',
  // 传递下发的props
  props: {
    title: 'currentTitle'
  },
  // 根据 string 运行时查找DOM节点
  container: "#root-slave",
}
```

## API

### 路由配置化规范

```jsx
import { setup, start } from 'qiankun-one';
import Sandbox from '@ali/sandbox';

setup({
    appConfigs: [{
    name: "wei-micro-app-example1",
    entry: [
      "//wei.alicdn.com/micro-app-example/0.1.0/index.js",
      "//wei.alicdn.com/micro-app-example/0.1.0/index.css"
    ],
    activePath: '/demo1',

    // 传递下发的props
    props: {
      title: 'currentTitle'
    },
   
    // 根据 string 运行时查找DOM节点
    container: "#root-slave",
  }, {
    name: "wei-micro-app-example2",
    entry: {
      "scripts": [
        "//wei.alicdn.com/micro-app-example/0.1.0/chunk-libs.js",
        "//wei.alicdn.com/micro-app-example/0.1.0/index.js"
      ],
      "styles": [
        "//wei.alicdn.com/micro-app-example/0.1.0/chunk-libs.css",
        "//wei.alicdn.com/micro-app-example/0.1.0/index.css"
      ]
    },
    activePath: '/demo2',
  }, {
    name: "wei-micro-app-example3",
    entry: "//wei.alicdn.com/micro-app-example/0.1.0/index.html",
    activePath: '/demo3',
  }],
  options: {
    sandbox: new Sandbox(),
    prefetch: true,

    // 生命周期钩子函数
    beforeMount: (app) => {},
    // ...
  },
})
start();
```

### 注册及运行函数规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| setup  | 注册 app 微应用函数 | IConfig  | 是 | [] |
| start  | 开始运行微应用函数 | -  | 是 | - |

### IConfig - 微应用全局配置规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| appConfigs  | 微应用配置集 | IAppConfig[]  | 是 | - |
| options  | 额外的配置 | IOptions  | 是 | - |

### IAppConfig - app 配置规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| name  | 微应用名称，用以标识一个微应用。 | string  | 是 | - |
| entry  | 微应用的资源信息描述。 | `string | [string, string] | <IAppManifest>`  | 是 | - |
| activePath  | 微应用受当前路由影响的激活规则。 | IActivePath  | 是 | - |
| container  | 微应用挂载的节点。 | HTMLElement  | 是 | - |
| props  | 微应用传入的参数 | object   | 是 | - |

### IOptions - 微应用配置规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| sandbox  | 是否启用内置的沙箱隔离，或者使用自定义的沙箱实例。 | `boolean | ISandbox `  | 否 | false  |
| prefetch  | 是否预加载微应用的资源。 | boolean  | 否 | false |
| activePath  | 微应用受当前路由影响的激活规则。 | IActivePath  | 是 | - |
| container  | 微应用挂载的节点。 | HTMLElement  | 是 | - |
| props  | 微应用传入的参数 | object   | 是 | - |
| beforeMount  | 微应用生命周期 - 加载前 | -   | - | - |
| afterMount  | 微应用生命周期 - 加载后 | - | - | - |
| beforeUnmount  | 微应用生命周期 -卸载前 | - | - | - |
| afterUnmount  | 微应用生命周期 - 卸载后 | - | - | - |
| beforeUpdate  | 微应用生命周期 -更新前 | - | - | - |
| afterUpdate  | 微应用生命周期 - 更新后 | - | - | - |

### IAppManifest - entry 配置规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| script  | js 相关资源 | string[]  | 是 | -  |
| styles  | css 相关资源  | string[]  | 是 | - |

### 手动加载规范

```jsx
import React, { useEffect, useRef } from 'react'
import { createMicroApp } from 'qiankun-one';
interface IApp extends Required<IAppConfig> {
  load(): void;
  mount(container: HTMLElement, props?: object): void;
  unmount(): void;
  update(props?: object): void;
}
const APP = () => {
  const containerRef: React.MutableRefObject<any> = useRef();
  
  useEffect(() => {
    const WidgetInstance: IApp = createMicroApp({
      name: 'widgetName',
      container: containerRef.current,
      entry: [
        "//wei.alicdn.com/micro-app-example/0.1.0/index.js",
        "//wei.alicdn.com/micro-app-example/0.1.0/index.css"
      ],
    }, {
      sandbox: true,
      prefetch: true
    })
    WidgetInstance.load();
  }, [])
  
  return (<div ref={containerRef}></div>)
}
```

### 注册函数规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| createMicroApp  | 注册 app 微应用入口 | IConfig  | 是 | [] |


### 返回实例规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| load  | 加载子应用 | -  | - | - |
| mount  | 子应用生命周期 - 装载后触发 | `HTMLElement , Props `  | - | - |
| unmount  | 子应用生命周期 - 卸载后触发 | -  | - | - |
| update  | 子应用生命周期 - 更新时触发 | props  | - | - |










