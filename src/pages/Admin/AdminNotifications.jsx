import React, { useState } from "react";
import Toggle from "../../components/Toggle";
import InputLabel from "../../components/InputLabel";
import Footer from "../../components/Footer";

const AdminNotifications = () => {
  const [emailAll, setEmailAll] = useState(true);
  const [telegramAll, setTelegramAll] = useState(true);

  const [emailCategories, setEmailCategories] = useState([
    {
      id: "purchaseE",
      label: "Receive notifications about purchases",
      checked: true,
    },
    {
      id: "bidsE",
      label: "Receive notifications about new auction bids",
      checked: true,
    },
    {
      id: "endE",
      label: "Receive notifications when an auction ends",
      checked: true,
    },
  ]);

  const [telegramCategories, setTelegramCategories] = useState([
    {
      id: "purchaseT",
      label: "Receive notifications about purchases",
      checked: true,
    },
    {
      id: "bidsT",
      label: "Receive notifications about new auction bids",
      checked: true,
    },
    {
      id: "endT",
      label: "Receive notifications when an auction ends",
      checked: true,
    },
  ]);

  // Handle parent toggles
  const handleEmailToggle = (checked) => {
    setEmailAll(checked);
    setEmailCategories(emailCategories.map((cat) => ({ ...cat, checked })));
  };

  const handleTelegramToggle = (checked) => {
    setTelegramAll(checked);
    setTelegramCategories(
      telegramCategories.map((cat) => ({ ...cat, checked }))
    );
  };

  // Handle individual child toggles
  const handleEmailCategoryToggle = (id, checked) => {
    const updatedCategories = emailCategories.map((cat) =>
      cat.id === id ? { ...cat, checked } : cat
    );

    setEmailCategories(updatedCategories);

    // If all categories are turned on, set emailAll to true
    setEmailAll(updatedCategories.every((cat) => cat.checked));
  };

  const handleTelegramCategoryToggle = (id, checked) => {
    const updatedCategories = telegramCategories.map((cat) =>
      cat.id === id ? { ...cat, checked } : cat
    );

    setTelegramCategories(updatedCategories);

    // If all categories are turned on, set telegramAll to true
    setTelegramAll(updatedCategories.every((cat) => cat.checked));
  };

  return (
    <div className="w-[100vw] h-full">
      <div className="w-full h-full relative mt-[calc(52px+40px)] xl:mt-[calc(65px+40px)] px-[16px] xl:px-[6.25rem] pb-28">
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-full sm:max-w-[547px] h-auto relative flex flex-col gap-8">
            <h2 className="font-main text-4xl font-[600] leading-[100%] tracking-wide">
              Notifications
            </h2>

            <div className="flex w-full h-auto flex-col gap-10">
              {/* Email Notifications */}
              <div className="flex flex-col w-full h-auto gap-6">
                <Toggle
                  id="emailAll"
                  bolder
                  label="All Email Notifications:"
                  checked={emailAll}
                  onChange={(e) => handleEmailToggle(e.target.checked)}
                />
                <div className="w-full h-auto flex flex-col gap-4 ml-3">
                  {emailCategories.map((cat) => (
                    <Toggle
                      key={cat.id}
                      id={cat.id}
                      label={cat.label}
                      checked={cat.checked}
                      secondary
                      onChange={(e) =>
                        handleEmailCategoryToggle(cat.id, e.target.checked)
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Telegram Notifications */}
              <div className="flex flex-col w-full h-auto gap-6">
                <Toggle
                  id="telegramAll"
                  label="All Telegram Notifications:"
                  bolder
                  checked={telegramAll}
                  onChange={(e) => handleTelegramToggle(e.target.checked)}
                />
                <div className="w-full h-auto flex flex-col gap-4 ml-3">
                  {telegramCategories.map((cat) => (
                    <Toggle
                      key={cat.id}
                      id={cat.id}
                      label={cat.label}
                      checked={cat.checked}
                      secondary
                      onChange={(e) =>
                        handleTelegramCategoryToggle(cat.id, e.target.checked)
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Email and Telegram Settings */}
              <div className="flex flex-col w-full h-auto gap-6 mt-2">
                <InputLabel
                  label="Current email"
                  id="currMail"
                  type="email"
                  placeholder="Current Email"
                />
                <InputLabel
                  label="Current Telegram channel"
                  id="currTelegram"
                  type="text"
                  placeholder="Current Telegram Channel @"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="flex font-main rounded-[1.25rem] w-full h-[44px] bg-[#FCCB00] text-[#522700] font-[600] items-center justify-center hover:bg-[#D4A900] hover:text-[#1C1600] transition-colors duration-[250ms]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminNotifications;
