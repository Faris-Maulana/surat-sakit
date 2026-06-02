export function ok<T>(res: { status: (code: number) => { json: (data: unknown) => void }; json: (data: unknown) => void }, data: T, status = 200) {
  return res.status(status).json({ success: true, data })
}

export function created<T>(res: { status: (code: number) => { json: (data: unknown) => void }; json: (data: unknown) => void }, data: T) {
  return ok(res, data, 201)
}

export function badRequest(res: { status: (code: number) => { json: (data: unknown) => void } }, message: string) {
  return res.status(400).json({ success: false, error: message })
}

export function notFound(res: { status: (code: number) => { json: (data: unknown) => void } }, message = 'Not found') {
  return res.status(404).json({ success: false, error: message })
}

export function serverError(res: { status: (code: number) => { json: (data: unknown) => void } }, err: unknown) {
  const message = err instanceof Error ? err.message : 'Internal server error'
  console.error('[api]', err)
  return res.status(500).json({ success: false, error: message })
}
