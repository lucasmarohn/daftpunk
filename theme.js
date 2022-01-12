export const theme = {
    components: {
        Button: {
            baseStyle: {
                fontWeight: 700,
                textTransform: "uppercase"
            },
            variants: {
                party: {
                    background: "linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), linear-gradient(180deg, #F2FDFF 0%, #BFC9CC 50%, #A3B5B9 50.01%, #99B0B0 100%)",
                    backgroundBlendMode: "overlay, normal",
                    _hover: {
                        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), linear-gradient(180deg, #F2FDFF 0%, #BFC9CC 50%, #73898D 50.01%, #99B0B0 100%)"
                    },
                    color: "black", 
                    textTransform: "uppercase" ,
                    className: "danceGlow",
                }
            }
        },
        Heading: {
            baseStyle: {
                fontFamily: "Futura",
                fontWeight: 300
            },
            variants: {
                headline: {
                    color: "red.400", 
                    textTransform: "uppercase", 
                    letterSpacing: ".2rem",
                    fontSize: "sm"
                }
            }
        }
    }
}