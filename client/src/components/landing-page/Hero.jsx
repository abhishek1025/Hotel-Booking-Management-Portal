import LandingBG from '../../assets/images/landingbg.jpg';
import { HeroButton } from '../../ui/buttons/Buttons';
import './landingpage.css';
const Hero = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center flex-col -mt-10">
      <div className="absolute inset-0 -z-20">
        <img src={LandingBG} alt="" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-white text-center leading-normal tracking-wider text-4xl font-semibold">
          Welcome to <br /> Hotel Management System
        </h1>

        <HeroButton className="mt-4">Explore now</HeroButton>
      </div>
      {/* <SearchFilter /> */}
    </div>
  );
};

export default Hero;
