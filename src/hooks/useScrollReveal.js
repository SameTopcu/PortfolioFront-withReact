import { useEffect, useRef } from 'react'

/**
 * useScrollReveal — Intersection Observer ile scroll animasyonları için hook.
 *
 * @param {Object}  options
 * @param {string}  options.rootMargin  — Observer root margin (default: '0px 0px -60px 0px')
 * @param {number}  options.threshold   — Görünürlük eşiği 0-1 arası (default: 0.15)
 * @param {boolean} options.staggerChildren — Alt elemanları sıralı animasyon yapıyor mu (default: false)
 * @param {string}  options.childSelector — Sıralı animasyon yapılacak alt eleman seçicisi
 * @param {number}  options.staggerDelay — Sıralı animasyon gecikme (ms) (default: 120)
 * @returns {React.RefObject} — section elemanına verilecek ref
 */
export default function useScrollReveal({
  rootMargin = '0px 0px -60px 0px',
  threshold = 0.15,
  staggerChildren = false,
  childSelector = '',
  staggerDelay = 120,
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        // Ana section elemanına "in-view" class'ı ekle
        node.classList.add('in-view')

        // Stagger çocuklar
        if (staggerChildren && childSelector) {
          const children = node.querySelectorAll(childSelector)
          children.forEach((child, index) => {
            child.style.transitionDelay = `${index * staggerDelay}ms`
            child.classList.add('in-view')
          })
        }

        // Bir kez tetiklensin
        observer.unobserve(node)
      },
      { rootMargin, threshold },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [rootMargin, threshold, staggerChildren, childSelector, staggerDelay])

  return ref
}
