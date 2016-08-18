jest.dontMock ('../src/components/PostsList.js')

import React from 'react/addons'
import ReactDom from 'react-dom'
import TestUtils from 'react-addons-test-utils'
const PostsList = require ('../src/components/PostsList')
const ShallowRenderer = TestUtils.createRenderer ();

describe ('PostsList', () => {
  it ('should have pageIndex', () => {
    ShallowRenderer.render (<PostsList/>)
    let output = ShallowRenderer.getRenderOutput()
    console.log (output)
    expect (PostsList.pageIndex).toEqual(0)
  })
    // var postsList = TestUtils.renderIntoDocument (
    //     <PostsList/>
    // )
    //
    // var postsListNode = ReactDom.findDOMNode (postsList)

})
