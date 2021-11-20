import axios  from 'axios'

export const actions = {
    //----------------------------------------
    //  GET RestAPI call
    //----------------------------------------
    async RestGet({commit}, args)
    {
      let retObj = {}

      try{
        let response = await axios.get(
        args.url,
        {
          headers:args.header
        })
        if(response.status == 200){
          retObj["status"]  = response.status
          retObj["data"]  = response.data
          return retObj
        }
        else
        {
          retObj["status"]  = response.status
          return retObj
        }
      }
      catch(error)
      {
        if(error.response == null)
        {
          retObj["status"]  = 404
          retObj["data"]  = null
          return retObj     
        }
        retObj["status"]  = error.response.status
        retObj["data"]  = error.response.data
        return retObj
      }
    },

    //----------------------------------------
    //  Post RestAPI call
    //----------------------------------------
    async RestPost({commit}, args)
    {
      let retObj = {}

      try{
        let response = await axios.post(
          args.url, 
          args.body,
          {
            headers:args.header
          }
        )
        if(response.status == 200){
          retObj["status"]  = response.status
          retObj["data"]  = response.data
          return retObj
        }
        else
        {
          retObj["status"]  = response.status
          return retObj
        }
      }
      catch(error)
      {
        retObj["status"]  = "404"
        return retObj
      }
    }

}