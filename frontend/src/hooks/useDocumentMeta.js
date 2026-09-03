import { useEffect } from 'react'

export default function useDocumentMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title
    if (title) document.title = `${title} | Cliff Perkins`

    let metaTag = document.querySelector('meta[name="description"]')
    const prevDescription = metaTag?.getAttribute('content')

    if (description) {
      if (!metaTag) {
        metaTag = document.createElement('meta')
        metaTag.setAttribute('name', 'description')
        document.head.appendChild(metaTag)
      }
      metaTag.setAttribute('content', description)
    }

    return () => {
      document.title = prevTitle
      if (metaTag && prevDescription !== undefined) {
        metaTag.setAttribute('content', prevDescription)
      }
    }
  }, [title, description])
}
