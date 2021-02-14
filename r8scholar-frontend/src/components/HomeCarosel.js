import React, { Component } from 'react'
import {Carousel} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'; 
import imageOne from '../assets/images/brock-from-drone.jpeg';
import imageTwo from '../assets/images/brock-sunset-from-drone.jpeg';


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
                        src={imageOne}
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
                        src={imageTwo}
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
