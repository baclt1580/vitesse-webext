import type { ProtocolWithReturn } from 'webext-bridge'
import { translatePayload } from '~/background/controller/tranlate.controller'
import { TextNode } from '~/background/translator/Translate.abstract'
declare module 'webext-bridge' {
  export interface ProtocolMap {
    // define message protocol types
    // see https://github.com/antfu/webext-bridge#type-safe-protocols
    'tab-prev': { title: string | undefined }
    'get-current-tab': ProtocolWithReturn<{ tabId: number }, { title?: string }>
    "translate": ProtocolWithReturn<translatePayload, TextNode[]>
  }
}
