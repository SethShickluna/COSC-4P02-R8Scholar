import React, { Component } from 'react'; 
import ReviewItem from './assets/ReviewItem';
import {Tab, Tabs} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';



//testing templates to simulate json from backend 
const commentTemplate = [
    {
        user: "commenter", 
        content: "nice review!",
    },
    {
        user: "Second Commenter", 
        content: "I agree!",
    },
]

const reviewTemplate = [ 
    { 
        title: "Test Title", 
        user: "Reviewer",
        rating: "4", 
        content: "This is some content I wrote to test and display how this looks. This text is purely to fill space and does" 
        + " not actually have anything to do with reviewing anything. I think this is long enough now, I guess I will see soon enough.",
        comments: commentTemplate, 
    },

    {
        title: "A Second Title to Test", 
        user: "Mad Student",
        rating: "1", 
        content: "This is some content I wrote to test and display how this looks but this time the student is mad. This text is purely to fill space and does" 
        + " not actually have anything to do with reviewing anything. I think this is long enough now, I guess I will see soon enough. And remember, this reviewer is mad!",
        comments: null,  
    },
];

//custom styles
const ratingBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const ratingContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const titleStyles = { 
    fontSize: 54,
    marginTop: "2%", 
}

export default class Courses extends Component {
    
    //props will be what course this is displaying 
    //props passed in as "course"
    constructor(props){
        super(props);
        console.log(props);  
        this.state = {
            reviews: null
        }
    } 

    //get info and put it into state.reviews 
    getInfoFromBackend(){

    }

    render() {
        return (
            <div className="App">
                <h1 style={titleStyles}>{this.props.course.name}</h1>
                <h3>{"Average rating: " +this.props.course.avgRating + "/5"}</h3>
                
                {reviewTemplate.map((item, index) => (<div style={ratingBoxStyle} key={index}><ReviewItem review={item}/></div>))}
            </div>            
        ); 
    } 
}
