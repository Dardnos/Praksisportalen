/** @format */

"use client";

import ContainerBox from "@/app/components/ContainerBox";
import { PieChart } from "@mui/x-charts/PieChart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchOrders } from "../../internshipOrders/@receivedOrders/actions";
import ErrorModal from "@/app/components/ErrorModal";

const pieParams = { margin: { right: 5 }, height: 400, width: 400 };

const AdminLayout = () => {
  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch((error) => setError(error.message));
  }, []);
  return (
    <div className=" flex flex-row items-center justify-center rounded-lg w-full h-full container mx-auto">
      <div className="flex flex-col h-full w-full">
        <ContainerBox title={"Statistics"}>
          <PieChart
            series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }] }]}
            {...pieParams}
          />
        </ContainerBox>
        <ContainerBox title="Received Orders">
          <div
            className="stack w-full h-fit"
            onClick={() => (window.location.href = "/internshipOrders")}
          >
            {orders.map((order, index) => (
              <div key={order.id} className="card bg-info shadow-xl">
                <div className="card-body flex gap-5">
                  <div className="flex flex-row items-center">
                    <div className="flex flex-col flex-grow ml-4">
                      <div className="text-lg font-bold text-white">
                        {order.studyProgram.educationInstitute.name} -{" "}
                        {order.studyProgram.name}
                      </div>
                      <div className="text-white text-opacity-80">
                        {order.numStudents} students
                      </div>
                      <div className="text-white text-opacity-80">
                        {order.internshipField}, {order.studyYear} år studenter
                      </div>
                      <div className="text-sm text-white text-opacity-80">
                        {order.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                {index === 0 && orders.length > 1 && (
                  <div className="badge badge-accent">
                    + {orders.length - 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ContainerBox>
      </div>
      <div className="flex flex-col w-full h-full">
        <ContainerBox title={"Import Data"}>
          <Link href="bulkImport" className="btn">
            Import Data from Excel
          </Link>
        </ContainerBox>
        <ContainerBox title={"Education Institution"}>
          <Link href="users/administerCoordinators" className="btn">
            Koordinatorer
          </Link>
          <Link href="studyprograms" className="btn">
            Studies
          </Link>
          <Link href="educationInstitutions" className="btn">
            Education Institutions
          </Link>
        </ContainerBox>
        <ContainerBox title={"Hospital"}>
          <Link href="users/administerEmployees" className="btn">
            Ansatte
          </Link>
          <Link href="departments" className="btn">
            Avdelinger
          </Link>
          <Link href="sections" className="btn">
            Seksjoner
          </Link>
        </ContainerBox>
        <ContainerBox title={"Internships"}>
          <Link href="internshipOrders" className="btn">
            Received Orders
          </Link>
          <Link href="internships" className="btn">
            Internships
          </Link>
          <Link href="internshipAgreements" className="btn">
            Internship Agreements
          </Link>
        </ContainerBox>
      </div>
      {isErrorModalOpen && (
        <ErrorModal
          message={error}
          setIsModalOpen={setIsErrorModalOpen}
        ></ErrorModal>
      )}
    </div>
  );
};
export default AdminLayout;
