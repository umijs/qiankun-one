import { registerMicroApps, start as qiankunStart } from 'qiankun'
import { IAppConfig, IOptions } from 'wei-type'

import { appConfigAdapter, optionsAdapter, QKConfiguation } from './utils'

let stratConfiguation: QKConfiguation | null = null

export function setup(appConfigs: IAppConfig[], options: IOptions) {
  const apps = appConfigs.map(app => appConfigAdapter(app));
  const { lifeCycles, configuation } = optionsAdapter(options);

  stratConfiguation = configuation;

  registerMicroApps(
    apps,
    lifeCycles,
  )
}

export function start() {
  if (stratConfiguation === null) {
    console.warn('[qiankun-one]', 'start should after setup')
    return
  }

  qiankunStart(stratConfiguation)
}