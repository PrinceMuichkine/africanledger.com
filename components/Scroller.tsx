'use client'

import { useEffect } from 'react'
import '../app/scroller.css'

export default function Scroller() {
  useEffect(() => {
    const links = document.querySelectorAll('aside a')
    for (const link of links) {
      link.addEventListener('click', (event) => {
        event.preventDefault()
        link.parentElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      })
    }
  }, [])

  return (
    <div className="scroller-container">
      <aside>
        <nav>
          <ul>
            {[...Array(50)].map((_, index) => (
              <li key={index} id={`img-${index + 1}`}>
                <a href={`#img-${index + 1}`}>
                  <img src={`https://picsum.photos/600/600?random=${index + 1}`} alt="" />
                  <span>See image {index + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main>
        {[...Array(50)].map((_, index) => (
          <img key={index} src={`https://picsum.photos/600/600?random=${index + 1}`} alt="" />
        ))}
      </main>
    </div>
  )
}