import { mount, RouterLinkStub } from '@vue/test-utils'
import EmptyList from '@/components/EmptyList'

describe('EmptyList', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(EmptyList, { stubs: { NuxtLink: RouterLinkStub } })
    expect(wrapper.vm).toBeTruthy()
  })
})
