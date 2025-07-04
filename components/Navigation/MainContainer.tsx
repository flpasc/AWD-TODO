import React from 'react'
import { Container, Heading, Box, Badge } from '@chakra-ui/react'
import { MainProps } from '@/types/MainProps'

export default function MainContainer({ mainTitle, children }: MainProps) {
	return (
		<Box
			p='6'
			width={['100%', 500]}
			height={['88%', '500px']}
			border='2px'
			borderColor='gray.300'
			borderRadius={['0', '50px']}
			overflowY='auto'
			pt={['10', 'auto']}
		>
			<Container>
				<Heading
					pb={8}
					as='h3'
					size='3xl'
				>
					{mainTitle}
				</Heading>
				{children}
			</Container>
		</Box>
	)
}
