import React from "react";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
                src="iced-tea.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
           />
            ilovetehping
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
  
  export default BasicExample;

// const Header = () => {
//     console.log("Header")
//     return (
//         <Navbar className="bg-body-tertiary">
//             <Container>
//                 <Navbar.Brand href="#home">
//                     <img
//                     src="iced-tea.png"
//                     width="30"
//                     height="30"
//                     className="d-inline-block align-top"
//                     alt="React Bootstrap logo"
//                     />
//                 </Navbar.Brand>
//             </Container>
//         </Navbar>
//     )
// }

// export default Header;