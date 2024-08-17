'use client'

import { ChakraProvider as ChakraProviderComponent, ColorModeScript } from "@chakra-ui/react"
import theme from "../../app/theme"

export default function ChakraProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <ChakraProviderComponent theme={theme}>
                {children}
            </ChakraProviderComponent>
        </>
    )
}