# qiankun-one

> 根据阿里巴巴统一微前端规范的适配的 qiankun 版本

## 与 qiankun 的关系

19 年在阿里内部伴随各 BU 业务的发展，出现了 qiankun、icestark、alfa 等微前端框架，可满足各自温饱使用，但是周边生态建设很难相互使用，包括后续的互通使用，阿里巴巴前端委员会拉通各部们弄微前端的同学成立共建组，分成统一规范、推荐框架、管控治理、生态周边建设 4 个方向

目前统一微前端规范初版已落地完成，为保证用户使用体验，暂不对原 qiankun 进行大升级防止存量业务问题，故跟进规范完成 qiankun 的上层接口规范适配产出 qiankun-one 框架供有需要的同学使用

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
| name  | 微应用名称，用以标识一个微应用 | string  | 是 | - |
| entry  | 微应用的资源信息描述 | `string/[string, string]/<IAppManifest>`  | 是 | - |
| activePath  | 微应用受当前路由影响的激活规则 | IActivePath  | 是 | - |
| container  | 微应用挂载的节点 | HTMLElement  | 是 | - |
| props  | 微应用传入的参数 | object   | 是 | - |

### IOptions - 微应用配置规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| sandbox  | 是否启用内置的沙箱隔离，或者使用自定义的沙箱实例。 | `boolean/ISandbox `  | 否 | false  |
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
| mount  | 子应用生命周期 - 装载后触发 | `HTMLElement/Props `  | - | - |
| unmount  | 子应用生命周期 - 卸载后触发 | -  | - | - |
| update  | 子应用生命周期 - 更新时触发 | props  | - | - |










