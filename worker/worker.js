import { API } from 'edge-api'
import { withAI } from 'schema.org.ai'

const api = new API({

})

api
  .all('*', withAI())
  .get('/', ({ }))


export default api