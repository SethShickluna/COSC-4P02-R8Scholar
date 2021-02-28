import React, { Component } from 'react'
import {Carousel} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'; 

const imageStyle={
    width:'100%', 
    height:'600px', 
}

export default class Example extends Component {
	render() {
		return (
			<Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={"https://brocku.ca/coronavirus/wp-content/uploads/sites/216/Aerial-Drone-2017-002-1.jpg"}
                        alt="First slide"
                        style={imageStyle}
                    />
                    <Carousel.Caption>
                        <h3 style={{color:'black'}}>Want your voice to be heard? </h3>
                        <p style={{color:'white'}}>Leave a review, let other students know what your experience was like at Brock University!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={"https://brocku.ca/education/wp-content/uploads/sites/12/Carousel-Aerial-Drone-2018-001-e1601336025816.jpg?x76044"}
                        alt="Second slide"
                        style={imageStyle}
                    />
                    <Carousel.Caption >
                        <h3 style={{color:'black'}}>Have something to say?</h3>
                        <Link style={{color:'white'}} to='/Signup'><p>Click here to sign up today! </p></Link>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
		)
	}
}
