import logo from '../logo.svg';
import a404 from '../assets/a404.jpg';
import '../css/404.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

//style={{display:"block",backgroundColor:"red"}}

function A404(props) {
  
  return (
    <div>                    
      <div className="a404-page mt-0 pt-0">
        <img src={a404} alt="error-gif" /> 
      </div>
      <span className="go-home" >
        <Link to="/">
          <button className="btn btn-primary">
            Go Home
          </button>
        </Link>        
      </span>
            
                                                              
    </div>
  );
}

export default A404;
