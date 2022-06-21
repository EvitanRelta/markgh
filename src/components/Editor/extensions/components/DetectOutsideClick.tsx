import { useEffect, useRef } from 'react'

function useOutsideDetector(
    ref: React.MutableRefObject<null>,
    onOutsideClick: (event: MouseEvent) => void
) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // @ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                onOutsideClick(event)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref])
}

interface Props {
    onOutsideClick: (event: MouseEvent) => void
    children: React.ReactNode
}

// Detects clicks outside of child node
// Based on https://stackoverflow.com/a/42234988
export default ({ onOutsideClick, children }: Props) => {
    const wrapperRef = useRef(null)
    useOutsideDetector(wrapperRef, onOutsideClick)

    return (
        <div ref={wrapperRef} style={{ display: 'inline' }}>
            {children}
        </div>
    )
}
