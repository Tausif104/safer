export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.saferx.syndev.us";
export const DEFAULT_PASSWORD = "123456";
export const USER_ROLE = {
  PHARMACIST: "pharmacist",
  DISPENSER: "dispenser",
  STAFF: "staff",
  PHARMACY: "pharmacy",
  ADMIN: "admin",
};

export const PHARMACIST_STATUS = {
  APPROVED: "approved",
  PENDING: "pending",
  REJECTED: "rejected",
};

export const PHARMACY_STATUS = {
  APPROVED: "APPROVED",
  PENDING: "PENDING",
  REJECTED: "REJECTED",
};
