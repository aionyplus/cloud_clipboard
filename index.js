addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const clipboard = {}

async function handleRequest(request) {
  const url = new URL(request.url)
  const name = url.pathname.split('/clipboard/')[1]

  if (request.method === 'POST') {
    const { content } = await request.json()
    clipboard[name] = content
    return new Response(JSON.stringify({ message: 'Content saved' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 201
    })
  } else if (request.method === 'GET') {
    const content = clipboard[name] || ''
    return new Response(JSON.stringify({ content }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } else {
    return new Response('Method Not Allowed', { status: 405 })
  }
}

