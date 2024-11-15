const InfoBox = ({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo, //= { text: "", link: "#", backgroundColor: "bg-blue-500" },
  children,
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      {buttonInfo && buttonInfo.link && (
        <a
          href={buttonInfo.link}
          className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
        >
          {buttonInfo.text}
        </a>
      )}
    </div>
  );
};
export default InfoBox;
