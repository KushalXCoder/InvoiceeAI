"use client";

import React, { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { AnimatePresence, motion } from "motion/react";
import NewButton from "./NewButton";
import InvoiceDownload from "./InvoiceDownload";
import InvoiceInput from "./InvoiceInput";

const NavbarBurger = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="hidden max-lg:block">
      <RxHamburgerMenu size={22} onClick={() => setOpen(true)} />
      <AnimatePresence>
        {open && (
          <div className="screen-container w-screen backdrop-blur-lg flex justify-end fixed top-0 right-0 z-10">
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{
                x: "0%",
                opacity: 1,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              exit={{
                x: "100%",
                opacity: 0,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              className="dashboard-sidebar h-screen w-5/6 bg-black px-3 pt-15 pb-5 overflow-y-scroll"
            >
              <div className="cross absolute top-3 right-3 flex flex-col">
                <RxCross2
                  size={22}
                  color="white"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="navbar-buttons w-full flex justify-between items-center gap-2">
                <NewButton />
                <InvoiceDownload />
              </div>
              <InvoiceInput screen="mobile" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavbarBurger;
