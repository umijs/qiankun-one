import { IAppConfig, IOptions, IApp, IAppManifest } from 'wei-type';
import { loadMicroApp, MicroApp as IMicroApp } from 'qiankun';

import { appConfigAdapter, optionsAdapter } from './utils'

class MicroApp implements IApp {
  public name: string
  public entry: string | IAppManifest
  public container: string | HTMLElement
  public activePath: string
  public props: object

  private _options: IOptions

  private _microApp: IMicroApp | null
  private _updatingPromise: Promise<any>

  constructor(appConfig: IAppConfig, options: IOptions) {
    const config: any = appConfigAdapter(appConfig);

    /** 初始化 public 属性 */
    this.name = config.name
    this.entry = config.entry
    this.container = config.container
    this.activePath = config.activePath
    this.props = config.props

    this._options = options
    this._microApp = null
    this._updatingPromise = Promise.resolve()
  }

  load() {
    console.warn('[qiankun-one]', 'qiankun not support load yet')
  }

  async mount() {
    const { lifeCycles, configuation } = optionsAdapter(this._options);

    const microApp = loadMicroApp(
      {
        name: this.name,
        entry: this.entry,
        container: this.container,
        props: this.props,
      },
      configuation,
      lifeCycles,
    )

    this._microApp = microApp
    this._updatingPromise = microApp.mountPromise
  }

  update(props: object) {
    const microApp = this._microApp

    if (microApp === null) {
      console.warn('[qiankun-wei]', `${this.name} update before mount`)
      return
    }

    const canUpdate = microApp.update && microApp.getStatus() === 'MOUNTED';

    if (!canUpdate) {
      console.warn('[qiankun-wei]', `${this.name} can't update`)
      return
    }

    // 确保 update 顺序
    this._updatingPromise = this._updatingPromise.then(() => {
      microApp.update!(props)
    })
  }

  async unmount() {
    const microApp = this._microApp
    if (microApp === null) {
      console.warn('[qiankun-wei]', `${this.name} unmount before mount`)
      return
    }

    // 需确保 unmout 的时候已经 mount
    microApp.mountPromise.then(() => microApp.unmount())
  }
}


export function createMicroApp(appConfig: IAppConfig, options: IOptions): MicroApp {
  return new MicroApp(appConfig, options)
}