import Footer from "./Utils/Footer";
import NavbarTop from "./Utils/NavbarTop";

import {
    Container
} from '@chakra-ui/react';

const Layout = ({ children }) => {
    return (
        <>
            <NavbarTop />
            <Container maxW={'7xl'} minHeight={'100vh'}>
                {children}
            </Container>
            <Footer />
        </>
    )
}

export default Layout