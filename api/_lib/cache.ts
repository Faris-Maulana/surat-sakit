import { config } from './config.js'

type CacheValue = string | Record<string, unknown>

let redisClient: { get: (k: string) => Promise<string | null>; set: (k: string, v: string, opts?: { ex: number }) => Promise<unknown> } | null = null

async function getRedis() {
  if (redisClient) return redisClient
  if (!config.upstash.url || !config.upstash.token) return null
  try {
    const url = `${config.upstash.url}/pipeline`
    redisClient = {
      async get(key: string) {
        const res = await fetch(`${config.upstash.url}/get/${key}`, {
          headers: { Authorization: `Bearer ${config.upstash.token}` },
        })
        if (!res.ok) return null
        const body = await res.json() as { result: string | null }
        return body.result
      },
      async set(key: string, value: string, opts?: { ex: number }) {
        const ttl = opts?.ex ? `EX ${opts.ex}` : ''
        const res = await fetch(`${config.upstash.url}/set/${key}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${config.upstash.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...(opts?.ex ? { ex: opts.ex } : {}), key, value }),
        })
        return res.json()
      },
    }
    return redisClient
  } catch {
    return null
  }
}

const memCache = new Map<string, { data: string; ttl: number }>()
const TTL_DEFAULT = 3600

export async function cacheGet<T>(key: string): Promise<T | null> {
  const redis = await getRedis()
  if (redis) {
    try {
      const raw = await redis.get(key)
      if (raw) return JSON.parse(raw) as T
    } catch { /* fall through */ }
  }

  const mem = memCache.get(key)
  if (mem && Date.now() < mem.ttl) {
    return JSON.parse(mem.data) as T
  }

  const fileData = await readFileCache(key)
  if (fileData) {
    memCache.set(key, { data: fileData, ttl: Date.now() + TTL_DEFAULT * 1000 })
    return JSON.parse(fileData) as T
  }

  return null
}

export async function cacheSet<T>(key: string, data: T, ttl = TTL_DEFAULT): Promise<void> {
  const raw = JSON.stringify(data)
  memCache.set(key, { data: raw, ttl: Date.now() + ttl * 1000 })

  const redis = await getRedis()
  if (redis) {
    try { await redis.set(key, raw, { ex: ttl }) } catch { /* skip */ }
  }

  await writeFileCache(key, raw)
}

async function readFileCache(key: string): Promise<string | null> {
  try {
    const fs = await import('node:fs')
    const path = await import('node:path')
    const filePath = path.join('/tmp', `cache-${key.replace(/[^a-zA-Z0-9]/g, '_')}.json`)
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8')
    }
  } catch { /* skip */ }
  return null
}

async function writeFileCache(key: string, data: string): Promise<void> {
  try {
    const fs = await import('node:fs')
    const path = await import('node:path')
    const filePath = path.join('/tmp', `cache-${key.replace(/[^a-zA-Z0-9]/g, '_')}.json`)
    fs.writeFileSync(filePath, data, 'utf-8')
  } catch { /* skip */ }
}
