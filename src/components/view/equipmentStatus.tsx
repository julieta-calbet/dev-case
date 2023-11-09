import { useEffect, useState } from "react";

export const EquipmentStatus = ({
  status,
  widingTime,
}: {
  status: any;
  widingTime: number;
}) => {
  const colors = ["green", "red", "yellow", "green"];
  const times = [0, status.productionTime, widingTime, 0];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (status?.productionTime && index < 3) {
      let timer1 = setTimeout(() => {
        setIndex(index + 1);
      }, times[index] * 1000);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [index, times]);

  useEffect(() => {
    setIndex(0);
  }, [status]);

  return (
    <div className="flex items-center mb-5">
      <div
        style={{ backgroundColor: colors[index] }}
        className="h-2.5 w-2.5 rounded-full  mr-2"
      ></div>
      {index != 3 && <span className="status">{status.order}</span>}
    </div>
  );
};
