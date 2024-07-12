import sps from "../../assets/sps.png";

export const Footer = () => {
  return (
    <footer className="flex justify-center items-center h-24 bg-gray-800">
        <a href="http://www.spsolutions.com.mx" target="_blank">
        <img src={sps} alt={"sps logo"} className="h-16" />

        </a>
    </footer>
  );
};
