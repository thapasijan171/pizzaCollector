import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className="footer_container">
      <div className="footer_wrapper">
        <h1 className="footer_title">
        Community Service 2022 - Night of Stars
        </h1>
        <div className="footer_links">
          <p className="footer_author_name">App author </p>
          <Link
            href="https://www.github.com/thapasijan171/"
            className="footer_author_link"
          >
            🌸 Sijan Thapa
          </Link>
        </div>
      </div>
    </div>
  )
}
