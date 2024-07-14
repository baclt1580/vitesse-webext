import type { ProtocolWithReturn } from 'webext-bridge'
import { Tabs } from 'webextension-polyfill'
import { translatePayload } from '~/background/controller/tranlate.controller'
import { TextNode } from '~/background/translator/Translate.abstract'
import { TranslateSetting } from '~/contentScripts/state/setting.state'
import { Status } from '~/contentScripts/state/status.state'
declare module 'webext-bridge' {
  export interface ProtocolMap {
    "translate": ProtocolWithReturn<translatePayload, TextNode[]>
  }
}
