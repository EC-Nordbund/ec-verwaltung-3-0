import { setVapidDetails, sendNotification } from './web-push'
// @ts-expect-error
import * as config from '../config.json'

setVapidDetails(
  'mailto:app@ec-nordbund.de',
  config.publicKey,
  config.privateKey
)

export function push(subs: any[]) {
  subs.forEach(s => {
    sendNotification(s, '{"title": "test titel", "body": "hier kommt der body"}')
  })
}
