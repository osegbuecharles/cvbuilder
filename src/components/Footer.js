
import '../css/footer.css'

function Footer(props) { 
  return (
    <div className="footer-body">
         <div >
            <h4>Useful Links</h4>
            <a href={props.base}>Home</a><br/>
            <a href={props.base+"/about-us"}>About Us</a><br/>
            <a href={props.base+"/login"}>Login</a><br/>
            <a href={props.base+"/register"}>Register</a><br/>
        </div>

           
        <div className="p-2" id="built">
            Built by <a href="https://osegbuecharles.com">Osegbue Charles</a>
        </div>        
    </div>
  );
}

export default Footer;
