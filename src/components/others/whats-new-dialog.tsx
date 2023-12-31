"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  hasSeenWhatsNewModal,
  markWhatsNewModalAsSeen,
} from "@/utils/userPreferences";
import { Carousel } from "react-responsive-carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const WhatsNewModal: React.FC = () => {
  const [open, setOpen] = useState(!hasSeenWhatsNewModal());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const closeModal = (): void => {
    setOpen(false);
    markWhatsNewModalAsSeen();
  };

  const images = [
    // "/images/whats-new/July 17 - 1.png",
    // "/images/whats-new/July 17 - 2.png",
    // "/images/whats-new/July 17 - 3.png",
    // "/images/whats-new/July 17 - 4.png",
    "/images/whats-new/August 03 - 01.png",
    "/images/whats-new/August 03 - 02.png",
    "/images/whats-new/August 03 - 03.png",
    "/images/whats-new/August 03 - 04.png",
    "/images/whats-new/August 03 - 05.png",
    "/images/whats-new/August 03 - 06.png",
  ];

  const handlePrevious = (): void => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = (): void => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <Dialog
        open={open}
        modal={true}
        onOpenChange={(newValue) => setOpen(newValue)}
      >
        <DialogContent className='bg-base sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>What&apos;s New / August 03, 2023</DialogTitle>
            <DialogDescription>
              Find new Features and Improvements in{" "}
              <span className='font-medium'>Mixim Notes</span>.
            </DialogDescription>
          </DialogHeader>

          <Carousel
            selectedItem={currentImageIndex}
            showArrows={false}
            showStatus={false}
          >
            {images.map((imageUrl, index) => (
              <div key={index}>
                <Image
                  width={400}
                  height={400}
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>

          <DialogFooter className='flex justify-between'>
            <div className='flex-1'>
              <Button variant='ghost' onClick={closeModal}>
                Skip
              </Button>
            </div>

            <div className='flex gap-2'>
              <Button variant='outline' onClick={handlePrevious}>
                Previous
              </Button>

              {currentImageIndex === images.length - 1 ? (
                <Button onClick={closeModal}>Continue to App</Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WhatsNewModal;
