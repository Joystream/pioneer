import { filter, firstValueFrom, map, Observable } from 'rxjs'

import { MetadataDef } from '@/api/types'

import { deserializeMessage } from '../models/payload'
import { PostMessage, RawWorkerMessageEvent } from '../types'

export type ClientAsyncMessage = {
  messageType: 'chain-metadata'
  payload: undefined
}

export type WorkerAsyncMessage = {
  messageType: 'chain-metadata'
  payload: MetadataDef
}

export interface AsyncProps {
  chainMetadata: Promise<MetadataDef>
}

export const _async = (
  messages: Observable<RawWorkerMessageEvent>,
  postMessage: PostMessage<ClientAsyncMessage>
): AsyncProps => {
  let chainMetadata: Promise<MetadataDef>

  return {
    get chainMetadata(): Promise<MetadataDef> {
      if (!chainMetadata) chainMetadata = getAsync('chain-metadata')
      return chainMetadata
    },
  }

  function getAsync(messageType: ClientAsyncMessage['messageType']): Promise<WorkerAsyncMessage['payload']> {
    postMessage({ messageType, payload: undefined })
    return firstValueFrom(
      messages.pipe(
        filter(({ data }) => data.messageType === 'chain-metadata'),
        deserializeMessage<WorkerAsyncMessage>(),
        map(({ payload }) => payload)
      )
    )
  }
}
