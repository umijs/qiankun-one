interface ISandboxOption {
  /**
   * 严格样式隔离（基于 Shadow DOM）
   */
  strictStyleIsolation?: boolean
  /**
   * 实验性样式隔离（基于 CSS Transformer）
   */
  experimentalStyleIsolation?: boolean
  /**
   * 宽松模式（使用快照机制的旧沙箱）
   * @deprecated
   */
  loose?: boolean
}

/**
 * qiankun 沙箱配置
 * @description 注意：目前这只是一份配置，而不是真正的独立沙箱
 */
export class Sandbox {
  /**
   * 沙箱配置
   */
  options: ISandboxOption

  constructor(options?: ISandboxOption) {
    this.options = options || {}
  }
}
