import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { business, navEvents, navServices } from "@/data/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="gs12-footer">
      <div className="container-site">
        <div className="gs12-footer__top">
          <div className="gs12-footer__intro">
            <span className="gs12-footer__label">GREEN SOUND MUSIC / LET'S CREATE</span>
            <h2>AI UN EVENIMENT?<br /><em>HAI SĂ-I DĂM VIAȚĂ.</em></h2>
          </div>
          <Link to="/contact" className="gs12-footer__cta">
            ÎNCEPE O CONVERSAȚIE <ArrowUpRight size={27} aria-hidden="true" />
          </Link>
        </div>
        <div className="gs12-footer__grid">
          <div>
            <Logo />
            <p>DJ & MC, muzică live, sunet, lumini și experiențe de eveniment. Din Pitești, din {business.founded}.</p>
            <p>{business.address.street}<br />{business.address.city}, jud. {business.address.region}, România</p>
            <a href={business.phoneHref}>{business.phoneDisplay}</a>
            <a href={"mailto:" + business.email}>{business.email}</a>
          </div>
          <div>
            <h3>EXPERIENȚE</h3>
            {navEvents.map(item => <Link to={item.to} key={item.to}>{item.label}</Link>)}
          </div>
          <div>
            <h3>EXPERTIZĂ</h3>
            {navServices.map(item => <Link to={item.to} key={item.to}>{item.label}</Link>)}
          </div>
          <div>
            <h3>GREEN SOUND</h3>
            <Link to="/despre-noi">Despre noi</Link>
            <Link to="/portofoliu">Portofoliu</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/confidentialitate">Confidențialitate</Link>
            <h3 className="mt-8">SOCIAL</h3>
            {business.socials.map(item => <a href={item.href} target="_blank" rel="noopener noreferrer" key={item.href}>{item.label}</a>)}
          </div>
        </div>
        <div className="gs12-footer__bottom">
          <p>© {new Date().getFullYear()} GREEN SOUND MUSIC. TOATE DREPTURILE REZERVATE.</p>
          <p>BUILT FOR THE MOMENTS THAT MATTER.</p>
        </div>
      </div>
    </footer>
  );
}
