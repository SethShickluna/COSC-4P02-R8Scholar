import React from "react";
import { Row, Container } from "reactstrap";

function Footer() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="https://github.com/SethShickluna/COSC-4P02-R8Scholar"
                  target="_blank"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, R8Scholar Team
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer; 