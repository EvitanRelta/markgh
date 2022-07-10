import { useEffect, useRef } from 'react'

function useOutsideDetector(
    ref: React.MutableRefObject<HTMLDivElement | null>,
    onOutsideClick: (event: MouseEvent) => void
) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node | null))
                onOutsideClick(event)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [ref])
}

interface Props {
    onOutsideClick: (event: MouseEvent) => void
    children: React.ReactNode
}

// Detects clicks outside of child node
// Based on https://stackoverflow.com/a/42234988
export const DetectOutsideClick = ({ onOutsideClick, children }: Props) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    useOutsideDetector(wrapperRef, onOutsideClick)

    return (
        <div ref={wrapperRef} style={{ display: 'inline' }}>
            {children}
        </div>
    )
}
