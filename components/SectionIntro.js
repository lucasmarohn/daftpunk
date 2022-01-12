import { Section } from "./Section"
import { MovingGrid } from "./MovingGrid"
import { VStack, Heading } from "@chakra-ui/layout"

export const SectionIntro = () => {
    return (
        <Section bgComponent={<MovingGrid direction={-1} />}>
                <VStack spacing={8}>
                    <Heading variant="headline" textAlign="center">
                        Your Favorite Robots have returned
                    </Heading>
                    <Heading as="h2" fontSize={['24px', '28px', '32px', '36px']} lineHeight="1.5em" fontWeight="300" textAlign="center">
                        After a hiatus lasting five planetary revolutions, the legendary electronic duo is back together. Their new single <i>Revolution</i> is out now. You can join Daft Punk on their World Tour — beginning March 2026.
                    </Heading>
                </VStack>
        </Section>
    )
}