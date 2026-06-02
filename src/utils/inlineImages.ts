// Inline external images in SVG elements to base64 data URIs
// This ensures html2canvas / jsPDF can capture them during export

const cache = new Map<string, string>()

async function fetchAsBase64(url: string): Promise<string> {
  if (cache.has(url)) return cache.get(url)!

  try {
    const resp = await fetch(url, { mode: 'cors', signal: AbortSignal.timeout(5000) })
    const blob = await resp.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const data = reader.result as string
        cache.set(url, data)
        resolve(data)
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch {
    // Return empty transparent pixel to avoid broken image
    return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }
}

export async function inlineSvgImages(container: HTMLElement): Promise<void> {
  const images = container.querySelectorAll('svg image[href], svg image[xlink\\:href]')
  const promises: Promise<void>[] = []

  images.forEach((img) => {
    const el = img as SVGImageElement
    const href = el.getAttribute('href') || el.getAttributeNS('http://www.w3.org/1999/xlink', 'href')
    if (!href || href.startsWith('data:')) return

    promises.push(
      fetchAsBase64(href).then((b64) => {
        el.setAttribute('href', b64)
        el.removeAttributeNS('http://www.w3.org/1999/xlink', 'href')
      }),
    )
  })

  await Promise.allSettled(promises)
}

export async function svgToPngDataUrl(svgHtml: string, width = 190, height = 190): Promise<string | null> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return resolve(null)

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = () => resolve(null)

    // Inline any external images first
    const wrapper = document.createElement('div')
    wrapper.innerHTML = svgHtml
    const svgEl = wrapper.querySelector('svg')
    if (!svgEl) return resolve(null)

    // Inline external images
    const svgImages = svgEl.querySelectorAll('image[href], image[xlink\\:href]')
    const fetchPromises: Promise<void>[] = []
    svgImages.forEach((el) => {
      const href = el.getAttribute('href') || el.getAttributeNS('http://www.w3.org/1999/xlink', 'href')
      if (href && !href.startsWith('data:')) {
        fetchPromises.push(
          fetchAsBase64(href).then((b64) => {
            el.setAttribute('href', b64)
            el.removeAttributeNS('http://www.w3.org/1999/xlink', 'href')
          }),
        )
      }
    })

    Promise.allSettled(fetchPromises).then(() => {
      const serialized = new XMLSerializer().serializeToString(svgEl)
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(serialized)))
    })
  })
}
