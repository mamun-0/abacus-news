import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

export function FooterComponent() {
  return (
    <Footer container>
      <div className="w-full text-center" style={{borderTop:'1px solid #F2F3F5'}}>
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-slate-600">Abacus News</h2>
          <Footer.LinkGroup>
            <Footer.Link>
              <Link to="/login">Login</Link>
            </Footer.Link>
            <Footer.Link>
              <Link to="/register">Register</Link>
            </Footer.Link>
            <Footer.Link>
              <Link to="https://www.facebook.com">Facebook</Link>
            </Footer.Link>
            <Footer.Link>
              <Link to="https://www.twitter.com">Twitter</Link>
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright by="Abacus News" year={2024} />
      </div>
    </Footer>
  );
}
