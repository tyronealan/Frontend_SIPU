import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import { BsFacebook, BsTwitterX, BsYoutube } from "react-icons/bs";

export default function FooterInfo() {
  return (
    <Footer>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterBrand href="#" name="Uleam" />
          <div>
            <p>
              <span>Dirección:</span> Av. Circunvalación - Vía San Mateo - Manta
              - Manabí - Ecuador
            </p>
          </div>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center mr-6">
            <FooterIcon
              href="https://twitter.com/UleamEcuador"
              target="_blank"
              icon={BsTwitterX}
            />
            <FooterIcon
              href="https://www.facebook.com/UleamEc/?locale=es_LA"
              target="_blank"
              icon={BsFacebook}
            />
            <FooterIcon
              href="https://www.youtube.com/@uleamecuador4175"
              target="_blank"
              icon={BsYoutube}
            />
          </div>
        </div>
        <FooterDivider />
        <FooterCopyright
          href="#"
          by="Programación Orientada a Objetos"
          year={2026}
        />
      </div>
    </Footer>
  );
}
