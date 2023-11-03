import Box from '@mui/material/Box';
import cube from '../../assets/cube.png'


const Snaps = () => {
    return (

        <div><Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '-610px', // Add left margin for spacing
                marginTop: '-27px', // Add top margin for spacing
            }}
        >
            <h4>Snaps</h4>
        </Box>

            <Box>
                <img
                    src={cube} // Replace with the actual image URL
                    alt="Image Description"
                    style={{
                        width: '55px',  // Set the width of the image
                        height: '55px', // Set the height of the image
                        marginLeft: '-150px', // Adjust the left margin
                        marginTop:'100px',
                    }}
                />

                <p style={{ marginLeft: '-125px' }}> You dont have snaps install</p>

            </Box>
        </div>



    )
}

export default Snaps;