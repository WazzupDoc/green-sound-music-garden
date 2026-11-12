import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { business, navEvents, navServices } from "@/data/site";
import { LightDesk } from "./LightDesk";

export function SiteFooter(){
 const year=new Date().getFullYear();
 return <footer className="v60-footer">
  <div className="v60-footer__light" aria-hidden="true">
    <img src="/creative/v59/sonic-waves.webp" width={1120} height={630} alt="" loading="lazy" decoding="async"/>
  </div>
  <div className="v60-footer__main">
    <div className="v60-footer__kicker"><span>GREEN SOUND MUSIC</span><span>DIN 2008 · PITEȘTI, ARGEȘ</span></div>
    <div className="v60-footer__grand">
      <h2>ULTIMUL REFREN?<br/><em>SAU PRIMA PIESĂ?</em></h2>
      <Link to="/contact" className="v60-footer__cta">HAI SĂ VORBIM <ArrowUpRight size={29} aria-hidden/></Link>
    </div>
    <div className="v60-footer__columns">
      <div className="v60-footer__address">
        <p>NE GĂSEȘTI AICI</p>
        <address>
          {business.address.street}<br/>{business.address.city}, jud. {business.address.region}
        </address>
        <a href={business.phoneHref}>{business.phoneDisplay}</a>
        <a href={`mailto:${business.email}`}>{business.email}</a>
      </div>
      <nav aria-label="Evenimente Green Sound Music">
        <p>EVENIMENTE</p>
        {navEvents.map(item=><Link key={item.to} to={item.to}>{item.label}</Link>)}
      </nav>
      <nav aria-label="Servicii Green Sound Music">
        <p>SERVICII</p>
        {navServices.map(item=><Link key={item.to} to={item.to}>{item.label}</Link>)}
      </nav>
      <nav aria-label="Pagini și rețele sociale">
        <p>MAI MULT</p>
        <Link to="/portofoliu">Portofoliu</Link>
        <Link to="/despre-noi">Despre noi</Link>
        <Link to="/contact">Contact și ofertă</Link>
        <Link to="/confidentialitate">Confidențialitate</Link>
        {business.socials.map(item=><a href={item.href} key={item.href} target="_blank" rel="noopener noreferrer">
          {item.label} <MoveUpRight size={13} aria-hidden/></a>)}
      </nav>
    </div>
    <div className="v60-footer__lighting"><LightDesk/></div>
    <div className="v60-footer__bottom">
      <span>© {year} GREEN SOUND MUSIC. TOATE DREPTURILE REZERVATE.</span>
      <strong>{business.tagline}</strong>
      <a href="#continut" aria-label="Înapoi la începutul paginii">ÎNAPOI SUS ↑</a>
    </div>
  </div>
 </footer>;
}
