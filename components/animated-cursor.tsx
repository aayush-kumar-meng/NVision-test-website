"use client"

import { useEffect, useState } from "react"

export function AnimatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, [role=button], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseover", () => setLinkHovered(true))
        el.addEventListener("mouseout", () => setLinkHovered(false))
      })
    }

    addEventListeners()
    handleLinkHoverEvents()

    return () => {
      removeEventListeners()
    }
  }, [])

  return (
    <>
      {/* Outer circle */}
      <div
        className={`fixed pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 border-2 border-[#00FF66] rounded-full transition-all duration-200 ${
          hidden ? "opacity-0" : "opacity-100"
        } ${clicked ? "scale-90" : "scale-100"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: linkHovered ? "60px" : "40px",
          height: linkHovered ? "60px" : "40px",
        }}
      ></div>

      {/* Inner dot */}
      <div
        className={`fixed pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 bg-[#00FF66] rounded-full transition-all duration-200 ${
          hidden ? "opacity-0" : "opacity-100"
        } ${clicked ? "scale-90" : "scale-100"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "8px",
          height: "8px",
        }}
      ></div>
    </>
  )
}
