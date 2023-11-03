import Typography from '@mui/material/Typography';
import ReactLogo from '../../assets/logo.svg'

const Header = (props) => {
    return (

        <header className="App-header">
            <div class="container" style={{marginLeft: "-30px"}}>
                <div class="image" >
                    <img alt="facebook" width="200%" src={ReactLogo} />
                </div>
                <div class="text">
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Metamask
                    </Typography>
                </div>
            </div>
        </header>
    );
};

export default Header;