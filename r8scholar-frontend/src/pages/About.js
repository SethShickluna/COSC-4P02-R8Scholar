import React, { Component } from "react";
import Footer from '../components/Footer'; 

export default class About extends Component {
    constructor() {
        super();
        this.list = ["professors", "courses", "departments"];
    }

    render() {
        return( <div className="about-container">

            <h1>Our Goal </h1>
            <p>The goal of this website is to centralize the thoughts and opinions of the Brock University community. We aim to provide a comprehensive
            an complete experience for the users on the site, as well as providing visitors an overview of the Universities academic structure.

            The importance of this project also is derived from the fact that web development technologies are always growing and expanding so having
 hands-on experience with these technologies allows us to become increasingly familiar with developer technologies that are used in the industry </p>


            <h1>Privacy Concerns </h1>
            <p>The users of the website should be aware of the terms and conditions as well as any community guidlines in order to properly use the site as designed
</p>


            <h1>Project Information</h1>
            <p>This website is similar to known websites such as
                RateMyProfessor.com but with a few modifications. This website would allow students from Brock University to sign up and contribute, or to view content anonymously. The differences when compared to RateMyProfessor is our site allows not only professors to be rated but also courses and departments. Furthermore, each opportunity for rating will also come with a place to leave comments as well as forum discussion from verified users. We have considered the name ‘R8Scholar’ for this project.
            The objective of this project is to deliver a comprehensive experience for Brock students to be able to communicate about their experiences and to give advice/information on potential interactions they might have at the school.
            This project is important in the sense that Brock University does not have a form of social networking which can bring together and educate the student community on what experiences are common at the University. This will allow Brock students to have a personalized experience in which they can better understand which programs, resources, or people are best fit to them as well as give feedback after having that experience in order for other Brock students to benefit as well.
</p>

<div className="footer"> <Footer></Footer> </div>

        </div>
        )
    }
}
