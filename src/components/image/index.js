import React, { useState, useRef, useLayoutEffect } from "react"

export const Image = ({ src }) => {
    const fallbackSrc = 'https://sisterhoodofstyle.com/wp-content/uploads/2018/02/no-image-1.jpg'
    const imageRef = useRef()
    const [visible, setVisible] = useState()

    // lazy load
    useLayoutEffect(() => {

        const onIntersection = img => {
            if (img[0].isIntersecting) {
                setVisible(true)
                observer.unobserve(imageRef.current)
            }
        }

        const observer = new IntersectionObserver(onIntersection)

        observer.observe(imageRef.current)

        return () => observer.disconnect()

    }, [imageRef])

    return (
        <img
            onLoad={e => e.target.style.minHeight = 'initial'}
            ref={imageRef}
            src={visible ? src : ''}
            onError={e => e.target.src = fallbackSrc}>
        </img>
    )
} 