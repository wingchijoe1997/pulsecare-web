"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, CandyCane } from "lucide-react";

import { callAiModel } from "@/actions/callAiModel";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MedRecordSchema } from "@/schemas/medRecord.schema";
import { OperationVariables } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface addMedicalDataFormProps {
  // addCourse: ({variables}:OperationVariables) => Promise<FetchResult<Course>>;
  addMedData?: ({ variables }: OperationVariables) => Promise<any>;
  // state: MutationResult<any>;
  state: any;
}
export function AddMedicalDataForm({
  addMedData,
  state,
}: addMedicalDataFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof MedRecordSchema>>({
    resolver: zodResolver(MedRecordSchema),
    defaultValues: {
      chestPain: 3,
      cholesterol: 150,
      fastingBloodSugar: false,
      maxHearhRate: 120,
      restingBloodPressure: 120,
      restingElectrocardio: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof MedRecordSchema>) {
    form.clearErrors();

    callAiModel(values).then((data) => {
      if (addMedData) addMedData({ variables: { ...values, ...data } });
      form.reset();
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Entry</Button>
      </DialogTrigger>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-screen lg:max-w-screen-md">
            <DialogHeader>
              <DialogTitle>Add Medical Record</DialogTitle>
              <DialogDescription>
                Enter the details of the medical record you want to add.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="chestPain"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Chest Pain</FormLabel>
                    <Select
                      onValueChange={(selectedValue) => {
                        field.value = parseInt(selectedValue);
                        return field.onChange;
                      }}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the type of chest pain you are experiencing." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Typical Angina</SelectItem>
                        <SelectItem value="2">Atypical Angina</SelectItem>
                        <SelectItem value="3">Non-Anginal Pain</SelectItem>
                        <SelectItem value="4">Asymptomatic</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="cholesterol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cholesterol</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="150"
                      disabled={state.loading}
                      {...field}
                    />
                  </FormControl>{" "}
                  mg/dL
                  <FormMessage />
                </FormItem>
              )}
            />
            <Label
              htmlFor="fastingBloodSugar"
              className=" flex items-center space-x-4 rounded-md border p-4"
            >
              <CandyCane />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Fasting Blood Sugar
                </p>
                <p className="text-sm text-muted-foreground">
                  Check this if your blood sugar is &gt; 120 mg/dL.
                </p>
              </div>
              <FormField
                control={form.control}
                name="fastingBloodSugar"
                render={({ field }) => {
                  return (
                    <FormControl>
                      <Switch
                        id="fastingBloodSugar"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  );
                }}
              />
            </Label>
            <FormField
              control={form.control}
              name="restingElectrocardio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Electrocardio at Rest</FormLabel>
                  <Select
                    onValueChange={(selectedValue) => {
                      field.value = parseInt(selectedValue);
                      return field.onChange;
                    }}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type of Electrocardio result." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Normal</SelectItem>
                      <SelectItem value="1">
                        T wave inversions and/or ST elevation or depression of
                        &gt; 0.05 mV
                      </SelectItem>
                      <SelectItem value="2">
                        Showing probable or definite left ventricular
                        hypertrophy by Estes&apos; criteria
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxHearhRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Heart Rate</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={state.loading}
                      placeholder="120"
                      {...field}
                      max={220}
                      min={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Collapsible
              open={false}
              // open={isOpen}
              // onOpenChange={setIsOpen}
              className=" space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">Open for more Option</h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-2">
                <FormField
                  control={form.control}
                  name="restingBloodPressure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>restingBloodPressure</FormLabel>
                      <FormControl>
                        <Input
                          type="string"
                          disabled={state.loading}
                          placeholder="1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Label
                  htmlFor="exerciseInduced"
                  className=" flex items-center space-x-4 rounded-md border p-4"
                >
                  <ShieldEllipsis />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      exerciseInduced
                    </p>
                    <p className="text-sm text-muted-foreground">
                      exerciseInduced
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="exerciseInduced"
                    render={({ field }) => {
                      return (
                        <FormControl>
                          <Switch
                            id="exerciseInduced"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Label>
                <FormField
                  control={form.control}
                  name="stDepressionInducedByExercise"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>stDepressionInducedByExercise</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={state.loading}
                          placeholder="1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slope"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>slope</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={state.loading}
                          placeholder="1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vesselsColoredByFluoroscopy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>vesselsColoredByFluoroscopy</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={state.loading}
                          placeholder="1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thalliumStressTest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>thalliumStressTest</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={state.loading}
                          placeholder="1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Label
                  htmlFor="hasHeartDisease"
                  className=" flex items-center space-x-4 rounded-md border p-4"
                >
                  <ShieldEllipsis />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      hasHeartDisease
                    </p>
                    <p className="text-sm text-muted-foreground">
                      hasHeartDisease
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="hasHeartDisease"
                    render={({ field }) => {
                      return (
                        <FormControl>
                          <Switch
                            id="hasHeartDisease"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Label>
              </CollapsibleContent>
            </Collapsible> */}
            {form.formState.errors.root && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  Error {form.formState.errors.root.serverError.type}
                </AlertTitle>
                <AlertDescription>
                  {form.formState.errors.root.serverError.message}
                </AlertDescription>
              </Alert>
            )}{" "}
            <DialogFooter className="gap-10 flex flex-row justify-between h-fit">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button
                type="submit"
                disabled={state.loading}
                onClick={form.handleSubmit(onSubmit)}
              >
                Add Record
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
