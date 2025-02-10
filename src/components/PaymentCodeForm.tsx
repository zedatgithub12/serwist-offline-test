"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PaymentDetails from "./PaymentDetails";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Only alphanumeric characters are allowed")
    .required("Hajj payment code is required")
    .min(6, "Min 6 characters for Hajj payment code")
    .max(10, "Max 10 character for Hajj payment code"),
});

type validationType = Yup.InferType<typeof validationSchema>;

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

const PaymentCodeForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PaymentDetailProps | null>(null);
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [fabricToken, setFabricToken] = useState(null);

  const header = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  //  ------------- HANDLE CLEARING FETCHED DETAILS ---------------------------
  const handleClearDetails = () => {
    setData(null);
    setPaymentDetail(null);
  };

  const handleGettingReservation = (values: { code: string }) => {
    setLoading(true);
    const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}query/${values?.code}`;

    fetch(API_URL, {
      method: "GET",
      headers: header,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setData(response?.pilgrim);
          setPaymentDetail(response?.payload);
          setFabricToken(response?.fabricToken);
          setApiKey(response?.apiKey);
        } else {
          toast.error(response?.message);
          handleClearDetails();
        }
      })
      .catch((err) => {
        toast.error(err?.message);
        handleClearDetails();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //  ------------- SUPER APP WILL PROCESS THE FOLLOWING FUNCTION --------------

  // useEffect(() => {
  //   (window as any).handleinitDataCallback = handleCallBackPaymentConfirm;
  //   // eslint-disable-next-line
  // }, []);

  // const paymentConfirmation = async (response: any) => {
  //   const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}pay`;

  //   fetch(API_URL, {
  //     method: "POST",
  //     headers: header,
  //     body: JSON.stringify(response),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log("Response -->", response);
  //       handleClearDetails();
  //     })
  //     .catch((error) => {
  //       console.log("Catch Error -->", error);
  //     });
  // };

  // const handleCallBackPaymentConfirm = (data: any) => {
  //   paymentConfirmation(data);
  // };

  const handlePaymentProcessing = () => {

    console.log("Payment Details -->", paymentDetail);
    // (window as any).dashenbanksuperapp?.send(sa_request_payload);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className=" xs:w-full  md:w-1/2 lg:w-1/3 min-h-screen bg-white p-4 relative">
        <p className="text-2xl font-bold  text-black">Enter Payment Code</p>
        <p className="text-md font-medium mt-1 mb-4 text-gray-500">
          Please enter your hajj payment code and proceed the payment.
        </p>

        <Formik
          initialValues={{
            code: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values: validationType) => {
            handleGettingReservation(values);
          }}
        >
          {({ values, setFieldValue, isValid }) => {
            if (values.code === "") handleClearDetails();

            return (
              <Form className=" flex flex-col py-3 justify-between ">
                <div className="mb-5">
                  <label
                    htmlFor="code"
                    className="block text-md font-medium text-black"
                  >
                    Hajj Payment Code
                  </label>
                  <div className="relative">
                    <Field
                      minLength={6}
                      maxLength={10}
                      type="text"
                      id="code"
                      name="code"
                      placeholder="Enter Hajj Payment Code"
                      className="bg-[#F7F7F7] mt-1 p-4 w-full border-0 rounded-xl focus:border-[#44BC27] pr-12" // Add padding to the right for the button
                    />
                    {values.code && (
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue("code", "");
                          handleClearDetails();
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                      >
                        &#x2715;
                      </button>
                    )}
                  </div>

                  <ErrorMessage
                    name="code"
                    component="span"
                    className="text-red-500 mt-6 text-md"
                  />
                </div>
                {data ? <PaymentDetails details={data} /> : null}

                {data ? (
                  <button
                    type="button"
                    className="absolute bottom-6 left-3 w-[94%] bg-gradient-to-r from-[#14670F] to-[#44BC27] text-white font-[600] py-3 px-4 rounded-[40px]"
                    onClick={() => handlePaymentProcessing()}
                  >
                    Pay
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !values.code || !isValid}
                    className={
                      loading || !values.code || !isValid
                        ? "absolute bottom-6 left-3 text-center w-[94%] bg-gray-400 text-gray-600 font-[600] py-3 px-4 rounded-[40px]"
                        : "absolute bottom-6 left-3 text-center w-[94%] bg-gradient-to-r from-[#14670F] to-[#44BC27] text-white font-[600] py-3 px-4 rounded-[40px]"
                    }
                  >
                    {loading ? (
                      <div className="loader mx-auto py-3"></div>
                    ) : (
                      "Search"
                    )}
                  </button>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
};

export default PaymentCodeForm;
