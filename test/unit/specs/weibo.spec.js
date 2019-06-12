import SineWeibo from 'pages/weibo'
import {mount} from '@vue/test-utils'
// 创建测试套件
describe('SinaaWeibo.vue', () => {
// 创建测试实例------点击发布按钮，发布新内容&&个人微博数量+1
  it('点击发布按钮，发布新内容&&个人微博数量+1', () => {
    // 找到要测试的组件实例，进行挂载
    const wrapper = mount(SineWeibo)
    // 找到发表微博的输入内容
    // eslint-disable-next-line no-unused-vars
    const textArea = wrapper.find('.weibo-publish-wrapper textarea')
    // 发布按钮
    const buttonOfPublish = wrapper.find('.weibo-publish-wrapper button')
    // weiboNews是从mock中获取的数据，是微博的初始值
    const lengthOfWeiboNews = wrapper.vm.weiboNews.length
    // 右边的关注/粉丝/微博和其数量：2是微博数
    const countOfMyWeibo = wrapper.vm.profileData[2].num
    wrapper.setData({newWeiboContent: {
      imgUrl: '../../static/image/profile.jpg',
      name: 'Lee_tanghui',
      resource: '刚刚 来自 网页版微博',
      content: '欢迎来到我的微博',
      images: []
    }})
    buttonOfPublish.trigger('click')
    const lengthOfWeiboNewsAfterPublish = wrapper.vm.weiboNews.length
    const countOfMyWeiboAfterPublish = wrapper.vm.profileData[2].num
    // 断言: 发布后的微博条数是在原来的基础上+1；
    expect(lengthOfWeiboNewsAfterPublish).toEqual(lengthOfWeiboNews + 1)
    // 断言: 个人微博数量是在原来的基础上+1；
    expect(countOfMyWeiboAfterPublish).toEqual(countOfMyWeibo + 1)
  })
  // 测试实例：当文本框无内容时候，不能发表微博到列表，且弹出提示框
  it('当文本框中无内容时, 不能发布空微博到微博列表, 且弹出提示框', () => {
    const wrapper = mount(SineWeibo)
    // 找到发布框内容
    // eslint-disable-next-line no-unused-vars
    const textArea = wrapper.find('.weibo-publish-wrapper textarea')
    // 找到发布按钮
    const buttonOfPublish = wrapper.find('.weibo-publish-wrapper button')
    // 获取下方微博条数
    const lengthOfWeiboNews = wrapper.vm.weiboNews.length
    // 获取右边微博数
    const countOfMyWeibo = wrapper.vm.profileData[2].num
    // 设置发表微博，但是content的内容为空
    // 设置textArea的绑定数据为空
    wrapper.setData({newWeiboContent: {
      imgUrl: '../../static/image/profile.jpg',
      name: 'Lee_tanghui',
      resource: '刚刚 来自 网页版微博',
      content: '',
      images: []
    }})
    // 触发发布按钮
    buttonOfPublish.trigger('click')
    // 获取发表后的下方微博条数
    const lengthOfWeiboNewsAfterPublish = wrapper.vm.weiboNews.length
    // 获取发表后的下右边微博数
    const countOfMyWeiboAfterPublish = wrapper.vm.profileData[2].num
    // 断言：发表前后的微博条数是相等的
    // 断言: 没有发布新内容
    expect(lengthOfWeiboNewsAfterPublish).toEqual(lengthOfWeiboNews)
    // 断言: 个人微博数量不变
    expect(countOfMyWeiboAfterPublish).toEqual(countOfMyWeibo)
  })

  // 测试实例：当点击"关注", 个人头像下关注的数量会增加1个, 且按钮内字体变成"取消关注
  it('当点击"关注", 个人头像下关注的数量会增加1个, 且按钮内字体变成"取消关注', () => {
    // 获取wrapper
    const wrapper = mount(SineWeibo)
    // 获取“关注”button
    const buttonOfAddAttendion = wrapper.find('.add')
    // 获取右边的关注数量
    const countOfMyAttention = wrapper.vm.profileData[0].num
    // 触发“关注”button
    buttonOfAddAttendion.trigger('click')
    // 获取右边的关注数量
    const countOfMyAttentionAfterClick = wrapper.vm.profileData[0].num
    // 断言1：右边的关注数量等于原来的+1；
    expect(countOfMyAttentionAfterClick).toEqual(countOfMyAttention + 1)
    // 断言2：button的text变为“取消关注”
    expect(buttonOfAddAttendion.text()).toEqual('取消关注')
  })

  // 测试实例：当点击"取消关注", 个人头像下关注的数量会减少1个, 且按钮内字体变成"关注
  it('当点击"取消关注", 个人头像下关注的数量会减少1个, 且按钮内字体变成"关注', () => {
    const wrapper = mount(SineWeibo)
    // 找到“取消关注”按钮
    const buttonOfUnAttendion = wrapper.find('.cancel')
    // 获取右边关注人数
    const countOfMyAttention = wrapper.vm.profileData[0].num
    // 触发“取消关注”按钮的点击事件
    buttonOfUnAttendion.trigger('click')
    // 获取右边关注人数
    const countOfMyAttentionAfterClick = wrapper.vm.profileData[0].num
    //  断言1：右边的人数为原来的人数-1
    expect(countOfMyAttentionAfterClick).toEqual(countOfMyAttention - 1)
    //  断言2：cancel的text变成"关注"
    expect(buttonOfUnAttendion.text()).toEqual('关注')
  })

  it('当点击"收藏"时, 我的收藏会增加1个数量, 且按钮内文字变成"已收藏"', () => {
    const wrapper = mount(SineWeibo)
    const buttonOfCollect = wrapper.find('.uncollectedWeibo')
    const countOfMyCollect = Number(wrapper.find('.collect-num span').text())

    // 触发点击事件
    buttonOfCollect.trigger('click')
    const countOfMyCollectAfterClick = Number(wrapper.find('.collect-num span').text())

    // 断言: 我的收藏数量会加1
    expect(countOfMyCollectAfterClick).toEqual(countOfMyCollect + 1)
    // 断言: 按钮内文字变成已收藏
    expect(buttonOfCollect.text()).toEqual('已收藏')
  })

  it('当点击"已收藏"时, 我的收藏会减少1个数量, 且按钮内文字变成"收藏"', () => {
    const wrapper = mount(SineWeibo)
    const buttonOfUnCollect = wrapper.find('.collectedWeibo')
    const countOfMyCollect = Number(wrapper.find('.collect-num span').text())

    // 触发点击事件
    buttonOfUnCollect.trigger('click')
    const countOfMyCollectAfterClick = Number(wrapper.find('.collect-num span').text())

    // 断言: 我的收藏数量会减1
    expect(countOfMyCollectAfterClick).toEqual(countOfMyCollect - 1)
    // 断言: 按钮内文字变成已收藏
    expect(buttonOfUnCollect.text()).toEqual('收藏')
  })

  it('当点击"已收藏"时, 我的收藏会减少1个数量, 且按钮内文字变成"收藏"', () => {
    const wrapper = mount(SineWeibo)
    const buttonOfUnCollect = wrapper.find('.collectedWeibo')
    const countOfMyCollect = Number(wrapper.find('.collect-num span').text())

    // 触发点击事件
    buttonOfUnCollect.trigger('click')
    const countOfMyCollectAfterClick = Number(wrapper.find('.collect-num span').text())

    // 断言: 我的收藏数量会减1
    expect(countOfMyCollectAfterClick).toEqual(countOfMyCollect - 1)
    // 断言: 按钮内文字变成已收藏
    expect(buttonOfUnCollect.text()).toEqual('收藏')
  })

  it('当点击"赞", 我的赞会增加1个数量, 且按钮内文字变成"取消赞"', () => {
    const wrapper = mount(SineWeibo)
    const buttonOfLike = wrapper.find('.dislikedWeibo')
    const countOfMyLike = Number(wrapper.find('.like-num span').text())

    // 触发点击事件
    buttonOfLike.trigger('click')
    const countOfMyLikeAfterClick = Number(wrapper.find('.like-num span').text())

    // 断言: 我的赞会增加1个数量
    expect(countOfMyLikeAfterClick).toEqual(countOfMyLike + 1)
    // 断言: 按钮内文字变成取消赞
    expect(buttonOfLike.text()).toEqual('取消赞')
  })

  it('当点击"取消赞", 我的赞会减少1个数量, 且按钮内文字变成"赞"', () => {
    const wrapper = mount(SineWeibo)
    const buttonOfDislike = wrapper.find('.likedWeibo')
    const countOfMyLike = Number(wrapper.find('.like-num span').text())

    // 触发点击事件
    buttonOfDislike.trigger('click')
    const countOfMyLikeAfterClick = Number(wrapper.find('.like-num span').text())

    // 断言: 我的赞会增加1个数量
    expect(countOfMyLikeAfterClick).toEqual(countOfMyLike - 1)
    // 断言: 按钮内文字变成取消赞
    expect(buttonOfDislike.text()).toEqual('赞')
  })

  // -------------触发子组件的点击事件
  // import {ChildComponent} from 'mand-mobile'
  // it("须用emit触发",()=>{
  //   wrapper.find(ChildComponent).vm.$emit('click')
  //   expect(wrapper.vm.isClick).toBeTruthy()
  // })
  //
})
