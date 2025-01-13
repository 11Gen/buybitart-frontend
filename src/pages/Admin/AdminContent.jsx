import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { pages } from "../../utils/data";
import InputLabel from "../../components/InputLabel";
import { createMarkup, removeHtmlTags } from "../../utils";
import Input from "../../components/Input";
import DropboxReplace from "../../components/DropboxReplace";
import Footer from "../../components/Footer";
import SlidingBullets from "../../components/SlidingBullets";
import useResponsive from "../../hooks/useResponsive";
import TextEditor from "../../components/TextEditor";
import { useSearchParams } from "react-router-dom";

const getCategoryKey = (category) => category.toLowerCase().replace(/ /g, "");

const ImageGrid = ({ images, setImages }) => (
  <div className="w-full flex gap-3 h-auto items-center">
    {images.map((image, index) => (
      <div key={index} className="w-[83px] sm:w-[110px] h-auto">
        <DropboxReplace setData={setImages} data={images} index={index} />
      </div>
    ))}
  </div>
);

const ListEditor = ({ list, onListChange }) => (
  <div className="flex flex-col gap-3 w-full h-auto">
    <span className="text-white text-sm font-main tracking-wide">List</span>
    <div className="flex flex-col gap-3">
      {list.map((item, index) => (
        <div key={index} className="flex gap-2.5">
          <div className="py-[10px] flex justify-center items-center font-main bg-[#212121] opacity-80 aspect-[1,1] w-[45px] rounded-xl border-[1px] border-[#ffffff05] tracking-wide">
            {index + 1}
          </div>
          <Input
            defaultValue={item}
            type="text"
            onChange={(e) => onListChange(index, e.target.value)}
            className="bg-[#212121] py-[10px] w-full px-3 rounded-xl outline-none border-[1px] border-[#ffffff05] font-main placeholder-[#707070] focus:placeholder-[#ffffff00] transition-colors duration-[250ms]"
          />
        </div>
      ))}
    </div>
    <button className="bg-[#FCCB00] text-[#241D00] hover:bg-[#D4A900] hover:text-[#1C1600] py-[8px] w-[185px]  px-2 rounded-3xl outline-none leading-[23px] border-[1px] border-[#ffffff05] tracking-wide transition-colors duration-[250ms] font-main font-[500] flex items-center justify-center gap-2">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_287_2685"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_287_2685)">
          <path
            d="M12 21C11.7167 21 11.4792 20.9042 11.2875 20.7125C11.0958 20.5208 11 20.2833 11 20V13H4C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11H11V4C11 3.71667 11.0958 3.47917 11.2875 3.2875C11.4792 3.09583 11.7167 3 12 3C12.2833 3 12.5208 3.09583 12.7125 3.2875C12.9042 3.47917 13 3.71667 13 4V11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5208 12.9042 20.2833 13 20 13H13V20C13 20.2833 12.9042 20.5208 12.7125 20.7125C12.5208 20.9042 12.2833 21 12 21Z"
            fill="#241D00"
          />
        </g>
      </svg>
      Add new
    </button>
  </div>
);

const renderSectionContent = (
  key,
  value,
  setImages,
  images,
  onInputChange,
  sectionIndex
) => {
  const contentMap = {
    description: () => (
      <TextEditor
        description={value}
        onChange={(newValue) =>
          onInputChange(
            { target: { name: key, value: newValue } },
            sectionIndex
          )
        }
        placeholder={`Enter ${capitalizeFirstLetter(key)}`}
      />
    ),
    images: () => <ImageGrid images={images} setImages={setImages} />,
    list: () => (
      <ListEditor
        list={value}
        onListChange={(listIndex, value) =>
          onInputChange(
            { target: { name: "list", value } },
            sectionIndex,
            listIndex
          )
        }
      />
    ),
    default: () => (
      <InputLabel
        label={capitalizeFirstLetter(key)}
        defaultValue={removeHtmlTags(value)}
        name={key}
        onChange={(e) => onInputChange(e, index)}
      />
    ),
  };

  return contentMap[key]?.() || contentMap.default();
};

const SectionSetting = ({
  section,
  index,
  setImages,
  images,
  onInputChange,
}) => (
  <div className="w-full flex flex-col gap-6">
    <h3 className="font-main text-2xl text-white">{index + 1} section</h3>
    <div className="flex flex-col gap-6">
      {Object.entries(section).map(([key, value]) => (
        <React.Fragment key={key}>
          {renderSectionContent(
            key,
            value,
            setImages,
            images,
            onInputChange,
            index
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const ContentDisplay = ({ section, category, index }) => {
  const { isSmallMobile, isMobile } = useResponsive();

  const contentMapping = {
    "main page": {
      0: () => (
        <div className="w-full h-full px-5 sm:px-10 relative flex flex-row justify-between items-center">
          <div className="w-full h-auto flex flex-col max-w-[50%]">
            <h1
              className={`font-main font-[700] 2xl:text-6xl xl:text-5xl sm:text-7xl ${
                isSmallMobile ? "text-3xl" : "text-4xl"
              } uppercase sm:tracking-wider text-left w-auto break-words`}
            >
              {section.title}
            </h1>
            <span
              dangerouslySetInnerHTML={createMarkup(section.description)}
              className={`sm:mt-3 mt-2 font-main font-[400] 2xl:text-lg xl:text-base sm:text-xl sm:max-w-max max-w-[90%] ${
                isSmallMobile ? "text-[10px]" : "text-xs"
              } uppercase break-words 2xl:leading-[115%] xl:leading-[110%] leading-[115%] tracking-wider text-left opacity-90`}
            />
            <button
              className={`font-main w-max max-w-max mx-0 text-center sm:text-[10px] uppercase ${
                isSmallMobile
                  ? "text-[5px] px-1.5 mt-3"
                  : "text-[7px] px-3 mt-4"
              } sm:mt-[22px] border-[1px] border-[#2c2c2e] py-1 sm:py-1.5 rounded-[1.8rem] font-[500] transition duration-[250ms] hover:text-[#522700] hover:bg-[#FCCB00] hover:border-[#FCCB00]`}
            >
              Browse Gallery
            </button>
            <button
              className={`2xl:w-[70px] xl:w-[60px] sm:w-[75px] ${
                isSmallMobile
                  ? "w-[30px] h-[30px] mt-3"
                  : "w-[50px] h-[50px] mt-5"
              } opacity-50 hover:opacity-70 transition-[opacity,left] duration-700 2xl:h-[70px] xl:h-[60px] sm:h-[75px] flex items-center justify-center relative rounded-full sm:mt-9 mx-0 group`}
            >
              <img
                src="/roundedScroll.svg"
                alt=""
                className="w-full h-auto absolute inset-0 object-contain pointer-events-none group-hover:rotate-[360deg] transition-transform duration-1000"
                draggable={false}
              />
              <img
                src="/down-arrow.svg"
                alt=""
                className={`sm:w-[20px] sm:h-[20px] ${
                  isSmallMobile ? "h-[10px] w-[10px]" : "h-[16px] w-[16px]"
                } object-contain group-hover:scale-110 transition-transform duration-700`}
                draggable={false}
              />
            </button>
          </div>
          <div className="w-full h-full relative flex justify-center items-center max-w-[50%]">
            <div
              className={`absolute sm:w-[15rem] sm:h-[15rem] w-[10rem] h-[10rem] bg-[#FFB82BB2] left-[50%] xl:left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                !isMobile ? "webkitBlurIos130" : "webkitBlurIos80"
              } pointer-events-none`}
            />
            <img
              src="/btcMain.png"
              className={`2xl:w-[11.5rem] 2xl:h-[11.5rem] xl:w-[10rem] xl:h-[10rem] sm:w-[11.5rem] sm:h-[11.5rem] ${
                isSmallMobile ? "w-[6rem] h-[6rem]" : "w-[8rem] h-[8rem]"
              }`}
              alt="btc"
              draggable={false}
            />
          </div>
        </div>
      ),
      1: () => (
        <div className="w-full h-full px-10 relative flex flex-row justify-center items-center">
          <h2
            dangerouslySetInnerHTML={createMarkup(
              pages.mainpage.sections[1].title
            )}
            className={`font-extra w-auto text-center uppercase text-4xl sm:text-6xl leading-[100%] relative max-w-[100%] break-words`}
          />
        </div>
      ),
    },
  };

  const renderContent =
    contentMapping[category.toLowerCase()]?.[index] || (() => null);

  return renderContent();
};

const AdminContent = () => {
  const [websiteData, setWebsiteData] = useState({ ...pages });
  const [images, setImages] = useState([]);
  const [searchParams] = useSearchParams();

  const currentCategory = searchParams.get("currentCategory") || "Main page"

  const onInputChange = (event, sectionIndex, listIndex = null) => {
    const { name, value } = event.target;
    const categoryKey = getCategoryKey(currentCategory);

    setWebsiteData((prev) => {
      const updated = { ...prev };
      const sections = updated[categoryKey]?.sections;
      if (sections?.[sectionIndex]) {
        if (listIndex !== null) {
          sections[sectionIndex].list[listIndex] = value;
        } else sections[sectionIndex][name] = value;
      }
      return updated;
    });
  };

  useEffect(() => {
    const initialImages = pages.about.sections[0].images || [];
    setImages(initialImages);
    return () => setImages([]);
  }, []);

  useEffect(() => {
    setWebsiteData((prev) => {
      const updated = { ...prev };
      const sections = updated["about"]?.sections;
      if (sections?.[0]) {
        sections[0]["images"] = sections[0]["images"].map((image, index) => ({
          ...image,
          ...images[index],
        }));
      }
      return updated;
    });
  }, [images]);

  const renderSections = () => {
    const categoryKey = getCategoryKey(currentCategory);
    const sections = websiteData[categoryKey]?.sections || [];

    return (
      <div className="w-full h-auto flex flex-col gap-11 xl:max-w-[calc(50%-75px)]">
        {sections.map((section, index) => (
          <SectionSetting
            key={index}
            section={section}
            index={index}
            setImages={setImages}
            images={images}
            onInputChange={onInputChange}
          />
        ))}
        <button className="flex font-main rounded-[1.25rem] w-full h-[44px] bg-[#FCCB00] text-[#522700] font-[600] items-center justify-center hover:bg-[#D4A900] hover:text-[#1C1600] transition-colors duration-[250ms]">
          Save all changes
        </button>
      </div>
    );
  };

  const renderScreens = () => {
    const categoryKey = getCategoryKey(currentCategory);
    const sections = websiteData[categoryKey]?.sections || [];

    return (
      <div className="w-full h-auto flex flex-col gap-8 xl:max-w-[calc(50%-75px)]">
        {sections.map((section, index) => (
          <div
            key={index}
            className="aspect-[16/9] rounded-3xl border-[1px] border-[#ffffff1A] overflow-hidden"
          >
            <ContentDisplay
              section={section}
              category={currentCategory}
              index={index}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      <header className="mt-[calc(52px+40px)] xl:mt-[calc(65px+40px)] px-4 xl:px-24 pb-14">
        <h2 className="font-main text-4xl font-semibold mb-3">
          Page content edit
        </h2>
        <nav className="sticky top-[52px] xl:top-[65px] bg-black z-[15] flex gap-3 py-3 border-b border-[#FFFFFF1A]">
          <SlidingBullets
            data={[
              "Main page",
              "About",
              "Shop",
              "Bitcoin art gallery",
              "Elements",
            ]}
            state={currentCategory}
            className="w-full h-auto flex items-center !mx-0"
          />
        </nav>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex xl:flex-row flex-col 2xl:gap-[150px] lg:gap-[100px] gap-[45px] mt-5 min-h-[580px]"
          >
            {renderSections()}
            {renderScreens()}
          </motion.div>
        </AnimatePresence>
      </header>

      <Footer />
    </div>
  );
};

const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export default AdminContent;``