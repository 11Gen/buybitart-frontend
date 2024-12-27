import React from "react";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <div className="w-[100vw] h-full">
        <div className="w-full h-full relative mt-[calc(52px+50px)] xl:mt-[calc(65px+50px)] px-[16px] xl:px-[6.25rem] sm:mb-10 mb-20">
          <div className="w-full h-auto flex flex-col lg:gap-8 sm:gap-6 gap-4 relative">
            <h2 className="font-main uppercase sm:text-4xl text-3xl font-[600] tracking-wide">
              About Me
            </h2>

            <div className="relative w-full h-auto flex justify-between gap-2">
              <div className="w-full h-auto">
                <img
                  src="/me3.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                  draggable="false"
                />
              </div>
              <div className="w-full h-auto">
                <img
                  src="/me.png"
                  alt=""
                  className="w-full h-full object-cover"
                  draggable="false"
                />
              </div>
              <div className="w-full h-auto">
                <img
                  src="/me2.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                  draggable="false"
                />
              </div>
            </div>

            {/* bio */}
            <div className="w-full h-auto relative mt-[50px] flex flex-col lg:gap-[150px] gap-[100px] overflow-hidden">
              <div className="w-full h-auto flex lg:flex-row flex-col justify-between relative">
                <div className="flex flex-col lg:gap-8 sm:gap-6 gap-4 font-main w-full lg:max-w-[40%]">
                  <h3 className="lg:text-6xl sm:text-4xl text-3xl font-[600] uppercase">
                    Biography
                  </h3>
                  <p className="text-[#CFCFCF] lg:font-[400] font-[300] lg:text-xl text-base">
                    I’m Aksana, also known as 5Ksana. I’m a Bitcoin artist and
                    Fashion designer from Poland! <br /> <br />
                    I’ve been creating Bitcoin Physical Art since 2017! <br />{" "}
                    <br />
                    Also,I am a professional tailor (a person that cuts and
                    sews) with over 22 years of experience!
                  </p>
                </div>
                <div className="lg:w-full w-auto lg:h-[360px] h-auto flex items-center justify-center lg:relative absolute lg:bottom-0 -bottom-44 lg:right-0 -right-10">
                  <img
                    src="/cube@4x.svg"
                    alt=""
                    className="w-auto lg:h-[470px] h-[150px] lg:absolute lg:top-1/2 lg:-translate-x-[30%] lg:-translate-y-1/2 lg:left-1/2"
                    draggable="false"
                  />
                </div>
              </div>

              <div className="w-full h-auto flex lg:flex-row-reverse flex-col justify-between lg:gap-0 gap-12">
                <div className="flex flex-col gap-8 font-main w-full lg:max-w-[50%]">
                  <h3 className="lg:text-6xl sm:text-4xl text-3xl font-[600] uppercase">
                    Education:
                  </h3>
                  <p className="text-[#CFCFCF] lg:font-[400] font-[300] lg:text-xl text-base">
                    Vocational-Technical Education (Professional Technical
                    Program based on General Education with a specialization in
                    Women’s Outerwear Cutting), 2001. <br />
                    <br />
                    Bachelor’s Degree in Consumer Services Technology
                    (Instructor of Cutting and Sewing Technology), 2008. <br />
                    <br />
                    Main Technique: hand embroidery and sewing.
                  </p>
                </div>
                <div className="lg:w-full w-auto lg:h-[300px] h-[150px] flex lg:items-center lg:justify-center relative lg:ml-0 ml-10">
                  <img
                    src="/cylinder@4x.svg"
                    alt=""
                    className="w-auto lg:h-[360px] sm:h-[150px] h-[130px] object-contain relative lg:absolute lg:top-1/2 lg:-translate-x-[90%] lg:-translate-y-1/2 lg:left-1/2"
                    draggable="false"
                  />
                </div>
              </div>

              <div className="flex lg:flex-row flex-col w-full h-auto justify-between lg:gap-6 gap-12 relative">
                {/* <img src="/cone@4x.svg" alt="" className="absolute w-auto h-auto right-0 -top-[200px]" /> */}
                <div className="w-full h-auto flex flex-col gap-7 font-main">
                  <h2 className="lg:text-6xl sm:text-4xl text-3xl uppercase font-[600] text-white">
                    Group Exhibitions / <br /> Associations:
                  </h2>
                  <div className="flex flex-col gap-3 w-auto h-auto text-[#CFCFCF] font-[300] lg:text-xl text-base">
                    <p>🏆 CoinFest, Manchester, UK, 2021</p>
                    <p>🏆 Lugano Plan ₿, Lugano, Switzerland, 2023</p>
                    <p>🏆 Bitcoin Atlantis, Funchal, Portugal 2024</p>
                    <p>🏆 Bitcoin Atlantis, Funchal, Portugal 2024</p>
                    <p>🏆 Bitcoin FilmFest, Warsaw, Poland, 2024</p>
                    <p>🏆 Lugano Plan ₿, Lugano, Switzerland, 2024</p>
                  </div>
                </div>
                <div className="w-full h-auto flex flex-col justify-end">
                  <p className="text-[#cfcfcf] lg:max-w-[85%] lg:text-xl text-base">
                    To me, Bitcoin embodies the idea of absolute freedom, and I
                    want to share that message with the world through my art.{" "}
                    <br /> <br />
                    One of my favorite ways to be creative is through
                    embroidery. I love making pretty paintings about Bitcoin
                    using colorful threads. Embroidery lets me add a special
                    touch to each piece, making them unique and interesting.{" "}
                    <br /> <br />
                    Publication: Weaving Bitcoin into Art: The Unique Creations
                    of 5Ksana <br />
                    <a
                      href="https://loveisbitcoin.com/weaving-bitcoin-into-art-the-unique-creations-of-5ksana/"
                      target="_blank"
                      className="text-[#FCCB00]"
                    >
                      https://loveisbitcoin.com/weaving-bitcoin-into-art-the-unique-creations-of-5ksana/
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
        <Footer />
      </div>
    </>
  );
};

export default About;
