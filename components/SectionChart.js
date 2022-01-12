import { Box, useBreakpointValue } from "@chakra-ui/react"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


// A “Music” section (not required to have working audio playback). Can display anything 
export const SectionChart = ({albumsItems}) => {
    const yearLabels = albumsItems.map(item => item.release_date.split('-')[0]).reverse()
    const totalTrackData = albumsItems.map(item => item.total_tracks).reverse()
    return(
        <Box>
            <Bar 
                options={{
                    color: 'white',
                    font: 'Futura',
                    responsive: true,
                    aspectRatio: useBreakpointValue({sm: 2, md: 5}),
                }}
                data={{
                    labels: yearLabels,
                    datasets: [{
                        label: 'Number of Tracks By Album',
                        data: totalTrackData,
                        backgroundColor: '#F84044',
                        borderWidth: 1,
                    }]
                }} />
        </Box>
    )
}