import { setup, start, Sandbox } from '../../src'

const container = '#app-root-container'

const sandbox = new Sandbox({
  // strictStyleIsolation: true,
})

setup([
  {
    name: 'app1',
    entry: '/assets/app-1/index.html',
    activePath: 'app1',
    container,
    props: {
      title: 'app1-title',
    }
  },
  {
    name: 'app2',
    entry: '/assets/app-2/index.html',
    activePath: 'app2',
    container,
  }
], {
  sandbox: sandbox as any,
  prefetch: true,

  beforeMount(app) {
    console.log('beforeMount', app)
  },
  afterMount(app) {
    console.log('beforeMount', app)
  },
  beforeUnmount(app) {
    console.log('beforeUnmount', app)
  },
  afterUnmount(app) {
    console.log('afterUnmount', app)
  },
})


start()