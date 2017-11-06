import 'babel-polyfill'
import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import AmiServers from '@/components/AmiServers'
import * as mtype from '@/store/mutation-types'
import store from '@/store'
import Fixtures from './fixtures/AmiServers'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('AmiServers', () => {
  afterEach(() => {
    store.commit(mtype.CLEAR_AMISRV_LIST)
  })

  it('init with empty servers list', () => {
    const comp = mount(AmiServers, {store, localVue})
    expect(comp.contains('.ami-server')).to.equal(false)
  })

  it('creates one new server from AMI message', () => {
    Fixtures.oneServer.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(AmiServers, {store, localVue})
    expect(comp.contains('.ami-server')).to.equal(true)
    expect(comp.findAll('.ami-server').length).to.equal(1)
  })

  it('creates thee new servers from AMI messages', () => {
    Fixtures.threeServers.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(AmiServers, {store, localVue})
    expect(comp.findAll('.ami-server').length).to.equal(3)
  })

  it('update existing server', () => {
    Fixtures.oneServer.forEach(msg => store.dispatch('newMessage', msg))
    Fixtures.oneServer.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(AmiServers, {store, localVue})
    expect(comp.findAll('.ami-server').length).to.equal(1)
  })

  it('create server with two queues which belongs to the server', () => {
    Fixtures.oneSrvWithTwoQueues.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(AmiServers, {store, localVue})
    expect(comp.findAll('.ami-server').length).to.equal(1)
    expect(comp.findAll('.ami-server .queues-num').at(0).text().trim())
      .to.equal('2')
  })
})
