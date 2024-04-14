"use server";

import { MedRecordSchema } from "@/schemas/medRecord.schema";
import { z } from "zod";

export const callAiModel = async (values: z.infer<typeof MedRecordSchema>) => {
  const validateFields = MedRecordSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: { type: "403", message: "Invalid fields" } };
  }
  // const {
  //   chestPain,
  //   restingBloodPressure,
  //   cholesterol,
  //   fastingBloodSugar,
  //   restingElectrocardio,
  //   maxHearhRate,
  // } = validateFields.data;
  // const response = await fetch('http://localhost:5000/predict', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     chestPain: chestPain,
  //     restingBloodPressure: restingBloodPressure,
  //     cholesterol: cholesterol,
  //     fastingBloodSugar: fastingBloodSugar,
  //     restingElectrocardio: restingElectrocardio,
  //     maxHearhRate: maxHearhRate
  //   }),
  // });
  // const data = await response.json();
  const data = {
    result: "Heart Disease",
    probability: 0.9,
  };
  return data;
};
