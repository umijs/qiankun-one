import { createMicroApp, Sandbox } from '../../src'

const container = '#app-root-container'

const sandbox = new Sandbox({
  // strictStyleIsolation: true,
})

const app = createMicroApp(
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
    sandbox: sandbox as any,
  }
)

app.mount()


setTimeout(() => {
  app.update({
    title: 'app1-update'
  })
}, 1000)


setTimeout(() => {
  // console.log(app)
  app.unmount()
}, 2000)
