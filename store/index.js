export const state = () => ({
  pageInfo:{
    title : "",
    subTitle : "",
    author : "",
    portalEyecatch : "",
    portalEyecatchCom : "",
    pickupEntry : null,
    topLink1 : null,
    topLink2: null,
    topLink3: null
  }
})

// Getter
export const getters = {
  PageInfo(state)
  {
    return state.pageInfo
  },
}

export const mutations = {
  setPageTitle(state, payload)
  {
    state.pageInfo.title = payload
  },
  setSubTitle(state, payload)
  {
    state.pageInfo.subTitle = payload
  },
  setAuthor(state, payload)
  {
    state.pageInfo.author = payload
  },
  setPortalEyecatch(state, payload)
  {
    state.pageInfo.portalEyecatch = payload
  },
  setPortalEyecatchCom(state, payload)
  {
    state.pageInfo.portalEyecatchCom = payload
  },
  setPickupEntry(state, payload)
  {
    state.pageInfo.pickupEntry = payload
  },
  setTopLink1(state, payload)
  {
    state.pageInfo.topLink1 = payload
  },
  setTopLink2(state, payload)
  {
    state.pageInfo.topLink2 = payload
  },
  setTopLink3(state, payload)
  {
    state.pageInfo.topLink3 = payload
  }
}

// Actions
export const actions = {
  SetPageTitle({commit}, title)
  {
    commit('setPageTitle', title)
  },
  SetSubTitle({commit}, subTitle)
  {
    commit('setSubTitle', subTitle)
  },
  SetAuthor({commit}, author)
  {
    commit('setAuthor', author)
  },
  SetPortalEyecatch({commit}, author)
  {
    commit('setPortalEyecatch', author)
  },
  SetPortalEyecatchCom({commit}, author)
  {
    commit('setPortalEyecatchCom', author)
  },
  SetPickupEntry({commit}, pickup)
  {
    commit('setPickupEntry', pickup)
  },
  SetTopLink1({commit}, toplink)
  {
    commit('setTopLink1', toplink)
  },
  SetTopLink2({commit}, toplink)
  {
    commit('setTopLink2', toplink)
  },
  SetTopLink3({commit}, toplink)
  {
    commit('setTopLink3', toplink)
  },
}