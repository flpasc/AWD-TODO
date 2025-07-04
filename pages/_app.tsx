import '@/styles/globals.css'
import { ChakraProvider, theme, ColorModeScript } from '@chakra-ui/react'
import { fonts } from '../lib/fonts'
import { SWRConfig } from 'swr'
import { AppProps } from 'next/app'
import { FC } from 'react'

const fetcher = (url: string): Promise<> =>
	fetch(url).then((response) => response.json())

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<style
				jsx
				global
			>
				{`
					:root {
						--font-rubik: ${fonts.rubik.style.fontFamily};
					}
					body,
					html {
						height: 100%;
					}
				`}
			</style>
			<ChakraProvider theme={theme}>
				<SWRConfig value={{ fetcher }}>
					<Component {...pageProps} />
				</SWRConfig>
			</ChakraProvider>
		</>
	)
}
