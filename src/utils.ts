import { IAppConfig, IOptions } from 'wei-type'
import { FrameworkLifeCycles, RegistrableApp } from 'qiankun';
import { Sandbox } from './sandbox'

export function appConfigAdapter(appConfig: IAppConfig): RegistrableApp {
  const qkAppConfig: RegistrableApp = {
    name: appConfig.name,
    entry: appConfig.entry as any,
    container: appConfig.container as any,
    activeRule: appConfig.activePath as any,
    props: appConfig.props,
  }

  return qkAppConfig
}

export type QKConfiguation = Pick<IOptions, 'sandbox' | 'prefetch'> & {
  sandbox: boolean | Sandbox
}

export type QKLifeCycles = FrameworkLifeCycles<object>

/** 支持 beforeLoad，但不支持 update 相关 */
const lifeCycleList: string[] = [
  'beforeLoad',
  'beforeMount',
  'afterMount',
  'beforeUnmount',
  'afterUnmount',
];

export function optionsAdapter(options: IOptions) {
  const sandbox = typeof options.sandbox === 'object'
    ? (options.sandbox as Sandbox).options
    : options.sandbox

  const convertOptions = {
    ...options,
    sandbox,
  }

  const lifeCycles: any = {}
  const configuation: any = {}

  Object.entries(convertOptions).map(([key, value]) => {
    lifeCycleList.indexOf(key) > -1
      ? (lifeCycles[key] = value)
      : (configuation[key] = value);
  })

  return {
    configuation: configuation as QKConfiguation,
    lifeCycles: lifeCycles as QKLifeCycles,
  }
}