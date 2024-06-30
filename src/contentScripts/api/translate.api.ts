import { translatePayload } from '~/background/controller/tranlate.controller'
import { sendMessage } from 'webext-bridge/content-script';
export const translate=(payload:translatePayload )=>sendMessage("translate",payload,"background")