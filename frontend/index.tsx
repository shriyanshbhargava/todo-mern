import { ROUTES } from "@utils/routes";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  HiOutlineDocumentDownload,
  HiOutlineDotsHorizontal,
} from "react-icons/hi";
import OrderProduct from "../order-products";
import OrderMenu from "@components/order/orderMenu";
import { MdDone } from "react-icons/md";
import { postInvoice } from "src/api/backend/public/gst";
import { useRouter } from "next/router";
interface props {
  order: any;
  index: number;
  status?: any;
  desclaimer?: string;
  message?: string;
}

const OrderCard = ({ order, index, status, desclaimer, message }: props) => {
  const [orderExpand, setOrderExpand] = useState("");
  const [activeOrder, setActiveOrder] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [invoice, setInvoice] = useState(null)

  const router = useRouter();

  console.log(order, "orderData")
  console.log(customer, "customerDetails")

  const getInvoice = async() => {
    console.log("GETTING INVOICE.....")
      try {
        const {data} : any = await postInvoice()
        // browserHistory.push("/path");
        setInvoice(data?.results?.message?.EinvoicePdf)
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(()=> {
    if (invoice) {
      router.push(invoice)
      
    }
  },[invoice])


  console.log(invoice)


  const setCustomerInfo = (data: any) => {
      setCustomer(data)
  }

  return (
    <div className={flex  flex-col items-center w-full border ${activeOrder ? "border-black":"border-gray-500" }  py-2 pl-2 pr-3 gap-2 shadow-product rounded-md justify-between}>
      <div
        className={`flex flex-row items-center justify-between w-full gap-4   ${
          orderExpand === order?.publicId && "border-b border-gray-400 py-2"
        }`}
      >
        <div className={`flex flex-row items-center gap-4 `}>
          <div className="flex flex-row items-center">
            <img
              src="/assets/placeholder/products/product-gallery.svg"
              alt=""
              className="h-10 w-10"
            />
            <img
              src="/assets/placeholder/products/product-gallery.svg"
              alt=""
              className="h-10 w-10"
            />
            <div className="h-10 w-7 bg-gray-300 flex items-center justify-center text-[10px] font-semibold font-segoe text-heading">
              +2
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-heading">Order ID</span>
            <Link
              href={ROUTES.ORDERS + "/" + order?.publicId}
              className="underline hover:no-underline text-body"
            >
              <span className="text-[10px] font-normal text-xs">
                {"#" + order?.publicId} - 56789
              </span>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-heading">
              Order Date
            </span>
            <span className="font-normal text-xs">
              {moment(order?.placedAt).format("MMM Do YY")}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-heading">Total</span>
            <span className="font-normal text-xs">
              {"$" + order?.totalPrice}
            </span>
          </div>
        </div>

        {/* UI 1 */}
        <div className="flex flex-col items-center">
          <div
            className={`h-full  rounded-2xl px-3 ${
              index % 2 === 0
                ? "border-green-400 bg-green-100"
                : index === 19 ? "border-red-400 bg-red-100": "border-gray-400 bg-gray-100"
            }  cursor-pointer`}
          >
            {index % 2 === 0 ? (
              <p className="m-0 text-xs font-semibold flex items-center justify-between gap-2 w-[137px] text-green-800 ">
                <MdDone /> <span>Payment completed</span>{" "}
              </p>
            ) : (
              <div className="flex flex-col items-center">
                {index === 19 ? (
                  <p className="m-0 text-xs font-semibold flex items-center justify-center gap-2 w-[137px] text-red-800 ">
                    {/* <IoIosInformationCircle />  */}
                     <span>Order Cancelled</span>{" "}
                  </p>
                ) : (
                  <OrderMenu payment={true} order={order} setActiveOrder={setActiveOrder} activeOrder={activeOrder}/>
                )}
              </div>
            )}
          </div>
          {index % 2 !== 0 && (
            <span className="text-red-500 text-[10px] font-semibold">
              {desclaimer}
            </span>
          )}
        </div>
        {/* UI 2 */}
        {/* <div className=" w-52">
  <div className="w-full flex flex-col justify-center items-center">
          <div className="h-1 w-40 bg-gray-500 rounded-3xl relative flex justify-between">
            <p className="absolute right-0 bg-gray-500 h-4 w-1 rounded-full top-[-5px] m-0"></p>
            <p className="absolute left-0 bg-gray-500 h-4 w-1 rounded-full top-[-5px] m-0"></p>
          </div>
          <div className="w-full justify-between flex">
            <p className="text-[10px] m-0">
                Payment pending
            </p>
            <p className="text-[10px] m-0">
                Payment completed
            </p>
          </div>
        </div>
        </div> */}

        <div className=" h-full flex items-center gap-4">
          {/* <OrderMenu order={order} trackOrder={true}/> */}
          <button 
          onClick={getInvoice}
          className="text-[10px] text-white active:bg-gray-600 px-2 h-6 bg-heading rounded-md flex items-center gap-1"  >
            <HiOutlineDocumentDownload size={18} /> Invoice
          </button>

          {orderExpand === order?.publicId ? (
            <p
              className="text-[10px] flex gap-1 cursor-pointer text-blue-500 tracking-wide font-semibold"
              onClick={() => setOrderExpand("")}
            >
              <HiOutlineDotsHorizontal size={25} className="text-gray-400" />{" "}
              <FaChevronUp />
            </p>
          ) : (
            <p
              className="text-[10px] flex gap-1 cursor-pointer text-blue-500 tracking-wide font-semibold"
              onClick={() => setOrderExpand(order?.publicId)}
            >
              <HiOutlineDotsHorizontal size={25} className="text-gray-400" />{" "}
              <FaChevronDown />
            </p>
          )}
        </div>
      </div>
      {orderExpand === order?.publicId && (
        <div className="flex flex-col w-full h-80 gap-2">
          {/* Product 1 Normal */}
          <OrderProduct
            order={order}
            isCancelled={true}
            id={1}
            status={status}
          />

          {/* Product 2 Sample */}
          <OrderProduct
            order={order}
            isSample={true}
            isShipped={true}
            id={2}
            status={status}
          />

          {/* Product 3 Demo */}
          <OrderProduct
            order={order}
            isDemo={true}
            isDelivered={true}
            id={3}
            status={status}
          />
        </div>
      )}
    </div>
  );
};

export default OrderCard;