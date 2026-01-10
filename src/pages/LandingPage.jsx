import ProcessInfo from "../components/ProcessInfo";
import StargesInfo from "../components/StargesInfo";
import FooterInfo from "../components/FooterInfo";

export default function LandingPage() {
  return (
    <div>
      <div>
        <img
          src="https://admision.uleam.edu.ec/wp-content/uploads/2025/11/SLIDERS-WEB-ADMISION-2026-1-TEMP.png"
          className="w-full h-full object-cover"
        />
      </div>
      <ProcessInfo />
      <StargesInfo />
      <FooterInfo />
    </div>
  );
}
