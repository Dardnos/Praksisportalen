"use client";
import React, { useCallback, useEffect, useState } from "react";
import { fetchOrders, saveOrderStatus } from "./actions";
import ErrorModal from "@/app/components/ErrorModal";
import InternshipDistributionModal from "./Modal";
import LogIcon from "@/../public/Icons/logIcon";
import ContainerBox from "@/app/components/ContainerBox";


/**
 * Returns the text for the status. Translates it to norwegian
 * @param status The status of the order
 * @returns string of status in norwegian
 */
function getStatusText(status: string) {
  switch (status) {
    case "Finalized":
      return "Ferdig";
    case "Pending":
      return "Venter";
    default:
      return status;
  }
}

/**
 * The page to display received orders.
 * @returns The page to display received orders.
 */
function Page() {
  //TODO: I see no reason to use a state here. The orders are fetched once and then displayed.
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [title, setTitle] = useState("Mottatte bestillinger");
  //Filter status is used to filter by status to either see all the Finalized orders, or see all the pending orders. In this page this is used when clicking the log button
  const [filterStatus, setFilterStatus] = useState<"Finalized" | "Pending">(
    "Pending"
  );

  /**
   * Fetches the orders from the database.
   */
  const fetch = useCallback(() => {
    fetchOrders(filterStatus)
      .then(setOrders)
      .catch((error) => setError(error.message));
  }, [filterStatus]);

  useEffect(() => {
    fetchOrders(filterStatus)
      .then(setOrders)
      .catch((error) => setError(error.message));
  }, [filterStatus]);

  /**
   * Save the status of the distribution.
   * @param orderID The ID of the order to save the status of.
   * @param status The status to save.
   */
  function saveStatus(orderID, status) {
    saveOrderStatus(orderID, status);
    fetch();
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    if (!isModalOpen) {
      fetch();
    }
    console.log("updating");
  }, [fetch, isModalOpen]);

  if (orders?.length === 0) {
    return <p>No orders</p>;
  }

  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.internshipOrderID]) {
      acc[order.internshipOrderID] = [];
    }
    acc[order.internshipOrderID].push(order);
    return acc;
  }, {});

  return (
    <>
      <div className="flex justify-between items-center mx-10">
        <div className="w-56"></div> {/* Placeholder div */}
        <h1 className="text-2xl font-bold">Bestillinger</h1>
        <div className="w-56 flex justify-end">
          <button
            className={` btn ${filterStatus === "Finalized" ? "btn-primary" : "btn-ghost"} mt-5`}
            aria-label="Logg"
            onClick={() => {
              if (filterStatus === "Finalized") {
                setTitle("Mottatte bestillinger");
                setFilterStatus("Pending");
              } else {
                setFilterStatus("Finalized");
                setTitle("Distribuerte bestillinger");
              }
            }}
          >
            <LogIcon />
          </button>
        </div>
      </div>

      <ContainerBox title={title}>
        <div className="flex flex-col gap-5 justify-center">
          {Object.keys(groupedOrders).map((internshipOrderID) => (
            <div
              key={internshipOrderID}
              className="card-body card bg-base-100 shadow-xl w-full"
            >
              {groupedOrders[internshipOrderID].map((order) => (
                <div key={order.id} className=" text-base-content ">
                  <div className="flex justify-between w-full gap-5 p-2 md:p-5">
                    <div className="flex w-full flex-row items-center">
                      <div className="flex items-center flex-wrap flex-grow ml-4 gap-5">
                        <div className="text-lg font-bold">
                          {order.studyProgram.educationInstitute.name} -{" "}
                          {order.studyProgram.name}
                        </div>
                        <div className="text-opacity-50">
                          {order.numStudents - order.numStudentsAccepted}{" "}
                          studenter
                        </div>
                        <div className="text-opacity-50">
                          {order.internshipField}, {order.studyYear} år
                          studenter
                        </div>
                        <div className="text-sm text-opacity-50">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <button
                        className="btn btn-primary ml-2 md:ml-5"
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        }}
                        disabled={order.status === "Finalized"}
                      >
                        Distribuer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="dropdown dropdown-middle w-full ">
                <button
                  tabIndex={0}
                  className="w-full font-semibold btn p-2 text-neutral-content bg-neutral text-center flex items-center"
                >
                  {getStatusText(groupedOrders[internshipOrderID][0].status)}
                </button>
                <ul className=" flex dropdown-content w-full z-[1] menu p-2 bg-base-100 rounded-box gap-2 shadow-xl border border-base-300">
                  <li>
                    <button
                      className="flex justify-center text-base-content p-3 bg-base hover:bg-accent hover:text-accent-content focus:bg-accent focus:text-accent-content"
                      onClick={() => {
                        // Directly call saveStatus passing the order ID and new status
                        saveStatus(internshipOrderID, "Pending");
                      }}
                    >
                      Venter
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex justify-center text-base-content p-3 bg-base hover:bg-accent hover:text-accent-content focus:bg-accent focus:text-accent-content"
                      onClick={() => {
                        // Directly call saveStatus passing the order ID and new status
                        saveStatus(internshipOrderID, "Finalized");
                      }}
                    >
                      Ferdig
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </ContainerBox>
      {isModalOpen && (
        <InternshipDistributionModal
          selectedOrder={selectedOrder}
          closeModal={closeModal}
          setError={setError}
          setIsErrorModalOpen={setIsErrorModalOpen}
        />
      )}

      {isErrorModalOpen && (
        <ErrorModal message={error} setIsModalOpen={setIsErrorModalOpen} />
      )}
    </>
  );
}


export default Page;
