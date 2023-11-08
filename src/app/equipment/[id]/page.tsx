import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEquipment } from "@/lib/equipment";
import { getAllStatus } from "@/lib/status";
import { StatusType } from "@/lib/types";
import { notFound } from "next/navigation";

const Home = async ({
  params: { id: equipmentId },
}: {
  params: { id: string };
}) => {
  const { data: equipment, error: equipmentError } =
    await getEquipment(equipmentId);
  const { data: allStatus, error: ordersErrors } =
    await getAllStatus(equipmentId);

  if (!allStatus || equipmentError || ordersErrors) return notFound();
  return (
    <div className="p-4">
      <Table className="dark:text-gray-400">
        <TableHeader className="uppercase dark:bg-gray-700">
          <TableRow>
            <TableHead className="p-4 w-[100px]">ID</TableHead>
            <TableHead className="p-4">Name</TableHead>
            <TableHead className="p-4">Status</TableHead>
            <TableHead className="p-4">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="dark:bg-gray-800">
          {allStatus?.map(
            ({ id, order, status = "green", startedAt }: StatusType) => (
              <TableRow
                key={`${id}`}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <TableCell className="p-4">{`${id}`}</TableCell>
                <TableCell className="p-4 dark:text-white font-semibold">
                  {order}
                </TableCell>
                <TableCell className="p-4">
                  <div className="flex items-center">
                    <div
                      style={{ backgroundColor: status }}
                      className="h-2.5 w-2.5 rounded-full mr-2"
                    ></div>
                    {status}
                  </div>
                </TableCell>
                <TableCell className="p-4">
                  {startedAt.toLocaleString("en-US", {
                    timeZoneName: "short",
                  })}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Home;
