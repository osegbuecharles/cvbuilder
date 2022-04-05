
import '../css/footer.css'

function Footer(props) { 
  return (
    <div className="footer-body">
         <div >
            <h4>Useful Links</h4>
            <a href="/">Home</a><br/>
            <a href="./about-us">About Us</a><br/>
            <a href="./login">Login</a><br/>
            <a href="./register">Register</a><br/>
        </div>

           
        <div className="p-2" id="built">
            Built by <a href="https://osegbuecharles.com">Osegbue Charles</a>
        </div>        
    </div>
  );
}

export default Footer;
