import { useEffect, useState } from "react";
import ClassesCard from "../Classes/ClassesCard";
import TopClassCard from "./TopClassCard";

const TopClasses = () => {
  const [Classes, setClasses] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/allClasses")
      .then((res) => res.json())
      .then((result) => {
        setClasses(result);
      });
  }, []);

  Classes?.sort((a, b) => b.student - a.student);

  return (
    <div className="my-5">
      <div className="min-h-screen pt-24">
        <h1 className="font-akaya text-5xl text-center mb-5">
          Our Top Classes
        </h1>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {Classes?.slice(0, 6)?.map((classData) => (
            <TopClassCard
              classData={classData}
              key={classData._id}
            ></TopClassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopClasses;