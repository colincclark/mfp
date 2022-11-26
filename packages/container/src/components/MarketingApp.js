import React, { useRef, useEffect } from "react"

import { mount as marketingAppMount } from "marketing/MarketingApp"

export default () => {
  const ref = useRef(null)

  useEffect(() => {
    marketingAppMount(ref.current)
  })

  return <div ref={ref} />
}

