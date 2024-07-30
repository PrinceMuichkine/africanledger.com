import icon from "/icon.png";

const IconComponent = () => {
  return (
    <img
      src={icon.src}
      alt="The African Ledger"
      className="lucide lucide-panels-top-left mr-2"
      style={{ width: '38px', height: '37px' }}
    />
  );
};

export default IconComponent;

export function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}