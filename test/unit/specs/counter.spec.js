/* eslint-disable no-unused-vars */
import { shallowMount } from '@vue/test-utils'
import Counter from 'pages/counter'
beforeEach(() => {
  const wrapper = shallowMount(Counter)
  jest.resetModules()
  jest.clearAllMocks()
})
describe('计数器', () => {
  // 现在挂载组件，你便得到了这个包裹器
  const wrapper = shallowMount(Counter)
  // 渲然测试
  it('渲染正确的标记', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })
  it('按钮存在', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
  // 组件内部数据+点击事件 测试
  it('点击按钮应该使得计数递增', () => {
    expect(wrapper.vm.count).toBe(0)
    const button = wrapper.find('.btn1')
    button.trigger('click')
    expect(wrapper.vm.count).toBe(1)
  })
})
