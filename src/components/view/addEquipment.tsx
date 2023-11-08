"use client";

import { addEquipment } from "@/actions/addEquipment";
import { EquipmentType, equipmentSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
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

export const AddEquipment = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<EquipmentType>({
    resolver: zodResolver(equipmentSchema),
  });
  const close = useRef<HTMLButtonElement>(null);

  const onSubmit: SubmitHandler<EquipmentType> = async (data) => {
    await addEquipment(data);
    close?.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-4 dark:bg-gray-800">
          <Button variant="outline">Add new equipment</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle>Add new equipment:</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <Label htmlFor="name">Name*</Label>
            <Input id="name" type="text" {...register("name")} />
            {!!errors?.name && (
              <span className="error text-xs text-red-600">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="startingAndWindingTime">Winding up time*</Label>
            <Input
              id="startingAndWindingTime"
              type="number"
              {...register("startingAndWindingTime")}
            />
            {!!errors?.startingAndWindingTime && (
              <span className="error text-xs text-red-600">
                {errors.startingAndWindingTime.message}
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
  );
};
