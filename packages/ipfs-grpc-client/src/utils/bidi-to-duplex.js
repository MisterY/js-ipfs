'use strict'

const pushable = require('it-pushable')
const errCode = require('err-code')
const toHeaders = require('./to-headers')
const transport = require('../grpc/transport')

/**
 * @param {*} service
 * @param {import('@improbable-eng/grpc-web').grpc.Client<any, any>} client
 * @param {AsyncIterable<any>} source
 */
async function sendMessages (service, client, source) {
  for await (const obj of source) {
    client.send({
      serializeBinary: () => service.requestType.serializeBinary(obj)
    })
  }
}

/**
 * Bidirectional streams are many-to-many operations so returns a sink
 * for the caller to write client messages into and a source to read
 * server messages from.
 *
 * @param {import('@improbable-eng/grpc-web').grpc} grpc - an @improbable-eng/grpc-web instance
 * @param {*} service - an @improbable-eng/grpc-web service
 * @param {import('../types').RPCOptions<any>} options
 * @returns {{ source: AsyncIterable<any>, sink: import('it-pushable').Pushable<any> }}
 **/
module.exports = function bidiToDuplex (grpc, service, options) {
  // @ts-ignore
  const source = pushable()

  // @ts-ignore
  const sink = pushable()

  const client = grpc.client(service, {
    ...options,
    transport: transport({
      agent: options.agent
    })
  })
  client.onMessage(message => {
    sink.push(message)
  })
  client.onEnd((status, message, trailers) => {
    let err

    if (status) {
      const error = new Error(message)

      err = errCode(error, trailers.get('grpc-code')[0], {
        status
      })

      err.stack = trailers.get('grpc-stack')[0] || error.stack
    }

    sink.end(err)
  })

  sendMessages(service, client, source)
    .catch(err => {
      sink.end(err)
    })
    .finally(() => {
      client.finishSend()
    })

  client.start(toHeaders(options.metadata))

  return {
    sink: source,
    source: sink
  }
}
