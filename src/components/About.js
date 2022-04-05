import logo from '../logo.svg';
import '../css/about.css';
import Footer from './Footer';

function About(props) { 
    var name="CV BUILDER"
    var text="cv builder"
  return (
      <>
        <div className="body pt-3">
            <h3>About Us</h3>
            <p className="container-fluid mt-4">
                {name} is a web application built by <a href="https://osegbuecharles.com">Osegbue Charles</a>.
                It is a CV (resume) designing tool to help youths create mind blowing CV's to compete in todays world as the world is going digital.
                <br/><br/>
                You essentially put in your desired information, select a template and a 
                color scheme and a custom cv is generated for you at a custom link of your choosing.
                <br/><br/>
                The best part is its all free! You dont need to pay to use this service so enjoy!            
            </p>
        </div>
        <Footer />
    </>
  );
}

export default About;
