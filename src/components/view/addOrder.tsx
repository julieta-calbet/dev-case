"use client";

import { addStatus } from "@/actions/addStatus";
import { EquipmentType, OrderType, orderSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { EquipmentStatus } from "./equipmentStatus";

export const AddOrder = (equipment: EquipmentType) => {
  const [allStatus, setAllStatus] = useState({});
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<OrderType>({
    resolver: zodResolver(orderSchema),
  });
  const close = useRef<HTMLButtonElement>(null);

  const onSubmit: SubmitHandler<OrderType> = async (data) => {
    const { data: newStatus } = await addStatus(equipment, data);
    if (newStatus) setAllStatus(newStatus);
    close?.current?.click();
  };

  return (
    <>
      <Suspense fallback={"Loading ..."}>
        <EquipmentStatus
          status={allStatus}
          widingTime={equipment.startingAndWindingTime}
        />
      </Suspense>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="dark:text-blue-500">
            Add new order
          </Button>
        </DialogTrigger>
        <DialogContent className="dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle>Add new order:</DialogTitle>
          </DialogHeader>
          <form action={handleSubmit(onSubmit)} className="grid gap-4">
            <div>
              <Label htmlFor="name">Name*</Label>
              <Input id="name" type="text" {...register("name")} />
              {!!errors?.name && (
                <span className="text-xs text-red-600">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="productionTime">Production time*</Label>
              <Input
                id="productionTime"
                type="number"
                {...register("productionTime")}
              />
              {!!errors?.productionTime && (
                <span className="text-xs text-red-600">
                  {errors.productionTime.message}
                </span>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild ref={close}>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="outline"
                aria-disabled={isSubmitting}
              >
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
