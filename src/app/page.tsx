import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEquipments } from "@/lib/equipment";
import Link from "next/link";

const Home = async () => {
  const { data: all } = await getEquipments();

  return (
    <div className="p-4">
      {/* <AddEquipment /> */}
      <Table className="dark:text-gray-400">
        <TableCaption>
          {all?.length === 0
            ? "No Equipment Found"
            : "A list of your equipment status."}
        </TableCaption>
        <TableHeader className="uppercase dark:bg-gray-700">
          <TableRow>
            <TableHead className="p-4 w-[100px]">ID</TableHead>
            <TableHead className="p-4">Name</TableHead>
            <TableHead className="p-4 w-[400px]">
              Starting/widing up time (secs)
            </TableHead>
            <TableHead className="p-4">History</TableHead>
            <TableHead className="p-4">Order</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="dark:bg-gray-800">
          {all?.map((equipment) => (
            <TableRow
              key={equipment.id}
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <TableCell className="id p-4">{equipment.id}</TableCell>
              <TableCell className="name p-4 dark:text-white font-semibold">
                {equipment.name}
              </TableCell>
              <TableCell className="name p-4 dark:text-white font-semibold">
                {equipment.startingAndWindingTime}
              </TableCell>
              <TableCell className="p-4">
                <Button variant="link" className="p-0 dark:text-blue-500">
                  <Link href={`/equipment/${equipment.id}`}>
                    {"See equipment's history"}
                  </Link>
                </Button>
              </TableCell>
              <TableCell className="p-4">
                {/* <AddOrder {...equipment} /> */}
                Add Order
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Home;
