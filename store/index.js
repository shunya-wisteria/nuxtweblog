export const state = () => ({
  pageInfo:{
    title : "",
    subTitle : "",
    author : "",
    portalEyecatch : "",
    portalEyecatchCom : "",
    pickupEntry : null
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
  }
}