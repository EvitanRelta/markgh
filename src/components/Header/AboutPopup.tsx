import { Box, Popover, styled } from '@mui/material'
import { useState } from 'react'

interface Props {
    theme: string
}

const StyledAboutContentContainer = styled(Box)({
    padding: 6,
})

const StyledCreditsText = styled(Box)({
    textAlign: 'center',
})

const StyledLink = styled('a')({
    ':visited': { color: '#0067ee' },
})

const StyledLogo = styled('img')({
    width: 32.5,
    top: 8.5,
    position: 'relative',
    cursor: 'pointer',
})

export const AboutPopup = ({ theme }: Props) => {
    const [anchor, setAnchor] = useState<(EventTarget & Element) | null>(null)

    //dynamic 'require' is not supported on react
    const logoSrc =
        theme === 'light'
            ? require('../../assets/logo.png')
            : require('../../assets/negative_logo.png')

    const aboutImgSrc =
        theme === 'light'
            ? require('../../assets/about.png')
            : require('../../assets/negative_about.png')

    const aboutContent = (
        <StyledAboutContentContainer>
            <img
                src={aboutImgSrc}
                style={{
                    width: 800,
                }}
            />
            <br />
            <StyledCreditsText>
                Made by{' '}
                <StyledLink href='https://github.com/EvitanRelta/' target='_blank'>
                    Shaun Tan
                </StyledLink>{' '}
                &amp;{' '}
                <StyledLink href='https://github.com/swxk19/' target='_blank'>
                    Kelvin Seow
                </StyledLink>
            </StyledCreditsText>
        </StyledAboutContentContainer>
    )

    return (
        <>
            <StyledLogo src={logoSrc} onClick={(e) => setAnchor(e.currentTarget)} />
            <Popover
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={() => setAnchor(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                {aboutContent}
            </Popover>
        </>
    )
}
