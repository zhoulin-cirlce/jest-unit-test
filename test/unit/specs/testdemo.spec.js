import {shallowMount, createLocalVue} from '@vue/test-utils'
import Question from 'components/question'
import axios from 'axios'
import {Button, Selector} from 'mand-mobile'
const mockData = {
  data: {
    answer: 'mock_yes',
    image: 'mock.png'
  }
}
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(mockData))
}))
let localVue = createLocalVue()
describe('Test for Question Component', () => {
  let wrapper
  // 清空mock状态
  beforeEach(() => {
    axios.get.mockClear()
    wrapper = shallowMount(Question, {
      // mock子组件
      localVue,
      stubs: {
        'md-button': Button,
        'md-selector': Selector
      }
    })
  })
  afterEach(() => {
    wrapper.destroy()
  })
  it('test value', () => {
    expect(wrapper.vm.inputValue).toBe('ok?')
  })
  it('快照', () => {
    // 在test/__snapshots__/文件下生成question.spec.js.snap
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
  // 点击按钮后调用了 getAnswer 方法
  it('点击调用mock的getAnswer方法', () => {
    const mockFn = jest.fn()
    // mock getAnswer方法
    // eslint-disable-next-line standard/object-curly-even-spacing
    wrapper.setMethods({ getAnswer: mockFn})
    wrapper.find('button').trigger('click')
    expect(mockFn())
  })

  // 点击按钮后调用了axios.get方法
  it('方法是否被调用', () => {
    wrapper.find('button').trigger('click')
    expect(axios.get).toBeCalledWith('api/view')
  })

  it('测试接口返回结果是否一致', () => {
    return wrapper.vm.getAnswer().then(res => {
      expect(res.data.answer).toEqual(mockData.data.answer)
      // 如果then里面处理了answer值,可以直接验证值
      // expect(wrapper.vm.answer).toEqual(mockData.data.answer+'111')
    })
  })
  it('同一个方法多次mock(如每次调用返回的值都不一样0)', async () => {
    const mockResult = {askType: '0'}
    const mockFn = jest.fn(() => (Promise.resolve(mockResult)))
    axios.post = mockFn
    // 执行
    await wrapper.vm.getResult()
    // 断言
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.askType).toBe('type_0')
  })
  it('同一个方法多次mock(如每次调用返回的值都不一样1)', async () => {
    const mockResult = {askType: '1'}
    const mockFn = jest.fn(() => (Promise.resolve(mockResult)))
    axios.post = mockFn
    // 执行
    await wrapper.vm.getResult()
    // 断言
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.askType).toBe('type_1')
  })
  it('局部作用域再次mock axios.get Function', () => {
    const _mockData = {
      data: {
        answer: 'isanswer',
        image: 'isimg.png'
      }
    }
    const mockFn = jest.fn(() => (Promise.resolve(_mockData)))
    axios.get = mockFn
    return wrapper.vm.getAnswerFormat().then(res => {
      expect(res.data.answer).toEqual(_mockData.data.answer)
      expect('second_' + res.data.answer).toEqual(wrapper.vm.answer)
    })
  })
})
