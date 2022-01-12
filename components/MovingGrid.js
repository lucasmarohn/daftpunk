import { Box } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'

export const MovingGrid = ({translateXOffset = 0, direction = 1, color = "#E53E3E"}) => {
    const [scrollPosition, setScrollPosition] = useState(0)
    const scrollTopRef = useRef()
    
    const handleScroll = () => {
        const position = document.body.scrollTop || document.documentElement.scrollTop
        setScrollPosition(position)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true})
        return ()=> window.removeEventListener('scroll', handleScroll)
    })

    const translateX = translateXOffset + (scrollTopRef?.current?.scrollTop || 0) - scrollPosition / 30 * direction

    return <Box 
            ref={scrollTopRef}
            className="bg"
            style={{
                "--translateX": translateX + 'px',
                "-webkit-mask-image": "-webkit-gradient(linear, left 90%, left top, color-stop(0%, rgba(0,0,0,0)), color-stop(10%, rgba(0,0,0,1)), color-stop(100%, rgba(0,0,0,0)) )",
                "-webkit-background-clip": "content-box", 
                "-webkit-backface-visibility": "hidden",
                "maskImage": "gradient(linear, left 90%, left top, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))"
            }}
            transform={`perspective(200px) rotateX(20deg) scale(3,1) translateZ(0) translateX(var(--translateX))`}
            content="''" display="block" position="absolute" bottom={0} left={0} right={0} width="100%" height="100%"
            padding={1}
            outline="1px solid transparent"
            transformOrigin="bottom center"
            willChange="transform"
            backgroundPosition="center center"
            backgroundSize="40px 40px"
            backgroundImage={`linear-gradient(to right, ${color} 1px, transparent 2px), linear-gradient(to bottom, ${color} 1px, transparent 2px)`}
        ></Box>
}