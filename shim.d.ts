import type { ProtocolWithReturn } from 'webext-bridge'
import { translatePayload } from '~/background/controller/tranlate.controller'
import { TextNode } from '~/background/translator/Translate.abstract'
import { TranslateSetting } from '~/contentScripts/state/setting.state'
import { Status } from '~/contentScripts/state/status.state'
declare module 'webext-bridge' {
  export interface ProtocolMap {
    // define message protocol types
    // see https://github.com/antfu/webext-bridge#type-safe-protocols
    'tab-prev': { title: string | undefined }
    'get-current-tab': ProtocolWithReturn<{ tabId: number }, { title?: string }>
    "translate": ProtocolWithReturn<translatePayload, TextNode[]>
    "getSetting_c":ProtocolWithReturn<null,TranslateSetting>
  }
}
