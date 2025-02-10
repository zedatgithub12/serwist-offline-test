"use client";

import Image from "next/image";
import React, { useState } from "react";

interface PaymentDetailProps {
  amount: number;
  photo_url: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  passport_number: string;
  birth_date: string;
  service_package: string;
}

interface PaymentDetailsCardProps {
  details: PaymentDetailProps;
}
const PaymentDetails = ({ details }: PaymentDetailsCardProps) => {
  const {
    amount,
    photo_url,
    first_name,
    middle_name,
    last_name,
    phone,
    passport_number,
    birth_date,
    service_package,
  } = details;

  const [correctPhotoUrl, setCorrectPhotoUrl] = useState(true);

  const dateFormatter = (dateStr: string) => {
    try {
      const dateParts = dateStr.split("/");
      const month = parseInt(dateParts[0], 10);
      const day = parseInt(dateParts[1], 10);
      const year = parseInt(dateParts[2], 10);

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      return `${months[month - 1]} ${day}, ${year}`;
    } catch (error) {
      return "Invalid date format" + error;
    }
  };

  function numberFormatter(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="mb-20">
      <p className="font-bold text-[16px] text-[#00000066]  ">
        Payment Details
      </p>

      <div
        id="paymentCardInfoCard"
        className="mt-3  max-w-md mx-auto  rounded-[20px]  shadow-[0_2px_16px_rgba(9,9,9,0.08)]  border-gray-100 overflow-hidden"
      >
        <div className="w-full h-1/3 flex flex-col justify-center items-center bg-[#33d52116] mb-4">
          {photo_url && correctPhotoUrl && (
            <Image
              src={photo_url}
              alt="traveler photo"
              width={144}
              height={144}
              onError={() => setCorrectPhotoUrl(false)}
              className="w-36 h-36 mt-4 object-contain mb-1 rounded-[18px] border-[6px] border-white shadow-[0_2px_12px_rgba(1,1,1,0.06)]"
              priority
            />
          )}
          <p className="text-black text-[18px] font-bold mb-2">
            {first_name} {middle_name} {last_name}
          </p>
        </div>
        {/* Payment Amount */}
        <h2 className="text-4xl font-bold text-center text-black ">
          {numberFormatter(amount)} Birr
        </h2>

        <div className="px-6 pt-3 pb-6">
          {/* Payment Details */}
          <div className="mt-6 space-y-4 ">
            <div className="flex justify-between border-b border-dashed border-gray-100 pb-2">
              <span className="text-[15px] text-[#7B7B7B]">Phone Number:</span>
              <span className="text-black text-[15px] font-medium">
                {phone}
              </span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-100 pb-2">
              <span className="text-[15px] text-[#7B7B7B]">
                Passport Number:
              </span>
              <span className="text-black text-[15px] font-medium">
                {passport_number}
              </span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-100 pb-2">
              <span className="text-[15px] text-[#7B7B7B]">Date Of Birth:</span>
              <span className="text-black text-[15px] font-medium">
                {dateFormatter(birth_date)}
              </span>
            </div>

            <div className="flex justify-between border-b border-dashed border-gray-100 pb-2">
              <span className="text-[15px] text-[#7B7B7B]">
                Service Package:
              </span>
              <span className="text-black text-[15px] font-medium">
                {service_package}
              </span>
            </div>
          </div>

          {/* Total Amount */}
          <div className="mt-6 flex justify-between items-center">
            <span className="text-[16px] font-[700] text-[#14670F]">
              Total Amount:
            </span>
            <span className="text-[16px] font-[700] text-[#14670F]">
              {numberFormatter(amount)} Birr
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
