// https://api.rarible.org/v0.1/doc#operation/getItemsByOwner
// https://api.rarible.org/v0.1/doc#operation/getItemsByCreator


import {
    Button,
    Drawer,
    Box,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerBody,
    Grid,
    Input,
    DrawerCloseButton,
    useDisclosure
  } from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMetaMask } from 'metamask-react'
import { getSpotifyAccessToken } from '../lib/getSpotifyAccessToken'

export default function TEST_PAGE ({ACCESS_TOKEN}) {
    const [artistId, setArtistId] = useState("0BAllLAmEMkTRZdFZoE8bW")
    const [notoriousData, setNotoriousData] = useState([])
    const [hasAnArtifact, setHasAnArtifact] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    
    const updateTracks = async() => {
        const spotifyNotoriousList = await getSpotifyTopTracks(ACCESS_TOKEN, artistId)
        setNotoriousData(spotifyNotoriousList)
    }

    useEffect(async() => {
        updateTracks()
    }, [])

    const search = () => {
        updateTracks()
    }
    const handleChange = (event) => setArtistId(event.target.value)

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [value, setValue] = useState()

    const TrackList = ({tracks}) => {
        return (
            <>
                <Input
                    value={artistId}
                    onChange={handleChange}
                    placeholder='Here is a sample placeholder'
                    size='sm'
                />
                <Input
                    value={value}
                    type="number"
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='Value'
                    size='sm'
                />
                <Button colorScheme="blue" margin="10px" onClick={() => search()}>Search</Button>
                <Box className="track-container">
                    {tracks && tracks.map(item => {
                        return <Box className="track">{item.name}</Box>
                    })}
                </Box>
            </>
        )
    }

    const { status, connect, account } = useMetaMask();

    const MetamaskStatus = () => {
        if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>

        if (status === "unavailable") return <div>MetaMask not available :(</div>
    
        if (status === "notConnected") return <Button onClick={connect}>Connect to MetaMask</Button>
    
        if (status === "connecting") return <div>Connecting...</div>
    
        if (status === "connected") return <div>Connected account: {account}</div>
    
    }

    // useEffect(() => {
    //     if(status === "connected") {
    //         // const itemsByOwner = getItemsByOwner()
    //         // const itemsByCreator = getItemsByCreator()
    //         const matchedIds = itemsByCreator.items.contains(itemsByOwner.items)
    //         if(matchedIds) {
    //             setHasAnArtifact(true)
    //             setArtifactIds([...matchedIds])
    //         }
    //     }
    // }, [status])
    

    const pay = async() => {

        setError(false)
        const transactionParameters = {
            to: '0x0000000000000000000000000000000000000000',
            from: ethereum.selectedAddress, // must match user's active address. // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
            value: '0x10'
        };
          
          // txHash is a hex string
          // As with any RPC call, it may throw an error

        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
            }).then((data) => {
                console.log('data', data)
            }).catch((error) => {
                console.error('custom error', error)
                setError(true)
                setErrorMessage(error.message)
            })
          
    }
    
    return (
        <Box w="100%" h="300vh">
            
            {status === "connected" && hasAnArtifact && <Box></Box>}
            {status === "connected" && !hasAnArtifact && <>
                <Button onClick={() => pay()}>Give Money</Button>
                <TrackList tracks={notoriousData.tracks} />
                <Grid pointerEvents="none" placeItems="center" column={1} position="fixed" top="0" left="0" w="100%" h="100vh">
                <Box w="50vw" h="100vh" >
                <Canvas> 
                    <pointLight position={[10, 10, 10]} />
                    <WebGL scrollPosition={scrollPosition} position={[-1.2, 0, 0]} />
                    </Canvas>
                </Box>
                </Grid>
            </>}
            {status !== 'connected' && <MetamaskStatus />}
            {error && <Box bg="red.100">{errorMessage}</Box>}
        </Box>
    )
}

export async function getStaticProps() {
    const ACCESS_TOKEN = await getSpotifyAccessToken()
    return {
        props: {
            ACCESS_TOKEN
        }
    }
}

const getSpotifyTopTracks = async(accessToken, artistId) => {
    const query = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    return query.json()

}

function WebGL({scrollPosition, ...props}) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x = (scrollPosition / 100)))
    useFrame((state, delta) => (ref.current.rotation.y += .01))
    // Return the view, these are regular Threejs elements expressed in JSX
    console.log('scroll', scrollPosition)
    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }



const AustinsModal = ({ title, songList, secondaryActionText, ...anything }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <>
    <Button 
    colorScheme="blue" onClick={onOpen} {...anything}>Click</Button>
        <Drawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>{title}</DrawerHeader>
      <DrawerCloseButton />
      <DrawerBody>
        {songList}
       
      </DrawerBody>

      <DrawerFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='ghost'>{secondaryActionText}</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  </>
}